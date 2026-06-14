import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Database from "better-sqlite3";
import { GoogleGenAI, Type } from "@google/genai";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

// Initialize Database
const db = new Database("government_data.db");

// ---- EXISTING SCHEMA ----
db.exec(`
  CREATE TABLE IF NOT EXISTS departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    contact_email TEXT
  )
`);

// ---- CONNECTX FULL SCHEMA ----
db.exec(`
  CREATE TABLE IF NOT EXISTS citizens (
    id TEXT PRIMARY KEY,
    curp TEXT UNIQUE,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT UNIQUE,
    municipality TEXT DEFAULT 'Tepic',
    verified INTEGER DEFAULT 0,
    registered_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS agencies (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    cluster TEXT NOT NULL CHECK(cluster IN ('SALUD','OBRA','FINANZAS','AGRO','SEGURIDAD')),
    contact_email TEXT,
    head_name TEXT,
    active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS reports (
    id TEXT PRIMARY KEY,
    citizen_phone TEXT,
    raw_message TEXT NOT NULL,
    category TEXT CHECK(category IN ('BACHE','LUMINARIA','AGUA','SEGURIDAD','SALUD','BASURA','PARQUE','OTRO')),
    urgency TEXT DEFAULT 'MEDIUM' CHECK(urgency IN ('LOW','MEDIUM','HIGH','CRITICAL')),
    sentiment TEXT CHECK(sentiment IN ('POSITIVE','NEUTRAL','NEGATIVE','FRUSTRATED')),
    agency_id TEXT REFERENCES agencies(id),
    status TEXT DEFAULT 'PENDING' CHECK(status IN ('PENDING','IN_PROGRESS','RESOLVED','CLOSED')),
    ai_summary TEXT,
    location_text TEXT,
    municipality TEXT DEFAULT 'Tepic',
    created_at TEXT DEFAULT (datetime('now')),
    resolved_at TEXT
  );

  CREATE TABLE IF NOT EXISTS public_works (
    id TEXT PRIMARY KEY,
    iun TEXT UNIQUE,
    name TEXT NOT NULL,
    type TEXT CHECK(type IN ('ROAD','BRIDGE','SCHOOL','HEALTH_CENTER','WATER_INFRA','ENERGY','SECURITY','PARK')),
    status TEXT DEFAULT 'PLANNED' CHECK(status IN ('PLANNED','IN_PROGRESS','COMPLETED','SUSPENDED')),
    agency_id TEXT REFERENCES agencies(id),
    municipality TEXT,
    budget REAL DEFAULT 0,
    spent REAL DEFAULT 0,
    progress INTEGER DEFAULT 0,
    start_date TEXT,
    end_date TEXT,
    beneficiaries INTEGER DEFAULT 0,
    lat REAL,
    lng REAL,
    contractor TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS ai_classifications (
    id TEXT PRIMARY KEY,
    report_id TEXT REFERENCES reports(id),
    category TEXT,
    urgency TEXT,
    sentiment TEXT,
    routing_agency_id TEXT,
    suggested_reply TEXT,
    confidence REAL,
    processing_ms INTEGER,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS health_triage (
    id TEXT PRIMARY KEY,
    citizen_phone TEXT,
    symptoms TEXT NOT NULL,
    ai_assessment TEXT,
    urgency_level TEXT CHECK(urgency_level IN ('GREEN','YELLOW','RED')),
    recommended_action TEXT,
    municipality TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS budget_items (
    id TEXT PRIMARY KEY,
    agency_id TEXT REFERENCES agencies(id),
    category TEXT CHECK(category IN ('OBRAS','NOMINA','SERVICIOS','EQUIPAMIENTO','SALUD')),
    description TEXT,
    allocated REAL DEFAULT 0,
    spent REAL DEFAULT 0,
    fiscal_year INTEGER DEFAULT 2026,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

// ---- SEED AGENCIES ----
db.exec(`
  INSERT OR IGNORE INTO agencies (id, name, cluster) VALUES
    ('ag-infra', 'Secretaría de Infraestructura y Obra Pública', 'OBRA'),
    ('ag-salud', 'Secretaría de Salud Nayarit', 'SALUD'),
    ('ag-serv', 'Servicios Públicos Municipales', 'OBRA'),
    ('ag-fin', 'Secretaría de Finanzas', 'FINANZAS'),
    ('ag-agro', 'Secretaría de Agricultura y Desarrollo', 'AGRO'),
    ('ag-seg', 'Secretaría de Seguridad Pública', 'SEGURIDAD');
`);

// ---- SEED PUBLIC WORKS ----
db.exec(`
  INSERT OR IGNORE INTO public_works (id, iun, name, type, status, agency_id, municipality, budget, spent, progress, beneficiaries) VALUES
    ('pw-001', 'NAY-VIA-2026-001', 'Rehabilitación Av. Insurgentes Tepic', 'ROAD', 'IN_PROGRESS', 'ag-infra', 'Tepic', 8500000, 3200000, 38, 45000),
    ('pw-002', 'NAY-ESC-2026-002', 'Construcción Escuela Primaria La Cantera', 'SCHOOL', 'IN_PROGRESS', 'ag-infra', 'Tepic', 2300000, 1150000, 50, 320),
    ('pw-003', 'NAY-AGU-2026-003', 'Red de Agua Potable Colonia Miravalles', 'WATER_INFRA', 'PLANNED', 'ag-serv', 'Tepic', 4100000, 0, 0, 8000);
`);

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ---- EXISTING DEPARTMENT ROUTES ----
  app.get("/api/departments", (req, res) => {
    const stmt = db.prepare("SELECT * FROM departments");
    res.json(stmt.all());
  });

  app.post("/api/departments", (req, res) => {
    const { name, description, contact_email } = req.body;
    const stmt = db.prepare("INSERT INTO departments (name, description, contact_email) VALUES (?, ?, ?)");
    const info = stmt.run(name, description, contact_email);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/departments/:id", (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare("DELETE FROM departments WHERE id = ?");
    stmt.run(id);
    res.json({ success: true });
  });

  app.put("/api/departments/:id", (req, res) => {
    const { id } = req.params;
    const { name, description, contact_email } = req.body;
    const stmt = db.prepare("UPDATE departments SET name = ?, description = ?, contact_email = ? WHERE id = ?");
    stmt.run(name, description, contact_email, id);
    res.json({ success: true });
  });

  // ---- CONNECTX CORE API ROUTES ----

  // GET /api/c5/stats — C5 Dashboard aggregate stats
  app.get('/api/c5/stats', (req, res) => {
    const stats = {
      reports: {
        total: db.prepare('SELECT COUNT(*) as n FROM reports').get() as {n:number},
        pending: db.prepare("SELECT COUNT(*) as n FROM reports WHERE status='PENDING'").get() as {n:number},
        critical: db.prepare("SELECT COUNT(*) as n FROM reports WHERE urgency='CRITICAL'").get() as {n:number},
        today: db.prepare("SELECT COUNT(*) as n FROM reports WHERE date(created_at)=date('now')").get() as {n:number},
      },
      works: {
        total: db.prepare('SELECT COUNT(*) as n FROM public_works').get() as {n:number},
        inProgress: db.prepare("SELECT COUNT(*) as n FROM public_works WHERE status='IN_PROGRESS'").get() as {n:number},
        totalBudget: db.prepare('SELECT COALESCE(SUM(budget),0) as n FROM public_works').get() as {n:number},
        totalSpent: db.prepare('SELECT COALESCE(SUM(spent),0) as n FROM public_works').get() as {n:number},
      },
      citizens: {
        registered: db.prepare('SELECT COUNT(*) as n FROM citizens').get() as {n:number},
      },
      agencies: {
        active: db.prepare("SELECT COUNT(*) as n FROM agencies WHERE active=1").get() as {n:number},
      }
    };
    res.json({
      totalReports: stats.reports.total.n,
      pendingReports: stats.reports.pending.n,
      criticalReports: stats.reports.critical.n,
      todayReports: stats.reports.today.n,
      totalWorks: stats.works.total.n,
      worksInProgress: stats.works.inProgress.n,
      totalBudget: stats.works.totalBudget.n,
      totalSpent: stats.works.totalSpent.n,
      budgetExecution: stats.works.totalBudget.n > 0 ? Math.round((stats.works.totalSpent.n / stats.works.totalBudget.n) * 100) : 0,
      registeredCitizens: stats.citizens.registered.n,
      activeAgencies: stats.agencies.active.n,
    });
  });

  // GET /api/reports — list reports (most recent first)
  app.get('/api/reports', (req, res) => {
    const limit = Number(req.query.limit) || 50;
    const rows = db.prepare('SELECT r.*, a.name as agency_name FROM reports r LEFT JOIN agencies a ON r.agency_id = a.id ORDER BY r.created_at DESC LIMIT ?').all(limit);
    res.json(rows);
  });

  // GET /api/reports/:id
  app.get('/api/reports/:id', (req, res) => {
    const row = db.prepare('SELECT r.*, a.name as agency_name FROM reports r LEFT JOIN agencies a ON r.agency_id = a.id WHERE r.id=?').get(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  });

  // PATCH /api/reports/:id/status
  app.patch('/api/reports/:id/status', (req, res) => {
    const { status } = req.body;
    const allowed = ['PENDING','IN_PROGRESS','RESOLVED','CLOSED'];
    if (!allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' });
    const resolved_at = status === 'RESOLVED' ? new Date().toISOString() : null;
    db.prepare('UPDATE reports SET status=?, resolved_at=? WHERE id=?').run(status, resolved_at, req.params.id);
    res.json({ success: true });
  });

  // GET /api/works — list public works
  app.get('/api/works', (req, res) => {
    const rows = db.prepare('SELECT pw.*, a.name as agency_name FROM public_works pw LEFT JOIN agencies a ON pw.agency_id=a.id ORDER BY pw.created_at DESC').all();
    res.json(rows);
  });

  // POST /api/works — create public work
  app.post('/api/works', (req, res) => {
    const { name, type, status, agency_id, municipality, budget, beneficiaries, start_date, end_date, contractor, lat, lng } = req.body;
    const id = crypto.randomUUID();
    const iun = `NAY-${(type||'GEN').slice(0,3)}-${new Date().getFullYear()}-${Math.floor(Math.random()*9000+1000)}`;
    db.prepare('INSERT INTO public_works (id,iun,name,type,status,agency_id,municipality,budget,beneficiaries,start_date,end_date,contractor,lat,lng) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)').run(id,iun,name,type,status||'PLANNED',agency_id,municipality,budget||0,beneficiaries||0,start_date,end_date,contractor,lat,lng);
    res.json({ id, iun });
  });

  // PATCH /api/works/:id/progress
  app.patch('/api/works/:id/progress', (req, res) => {
    const { progress, spent, status } = req.body;
    db.prepare("UPDATE public_works SET progress=COALESCE(?,progress), spent=COALESCE(?,spent), status=COALESCE(?,status), updated_at=datetime('now') WHERE id=?").run(progress ?? null, spent ?? null, status ?? null, req.params.id);
    res.json({ success: true });
  });

  // GET /api/agencies
  app.get('/api/agencies', (req, res) => {
    res.json(db.prepare('SELECT * FROM agencies ORDER BY cluster, name').all());
  });

  // GET /api/citizens
  app.get('/api/citizens', (req, res) => {
    const rows = db.prepare('SELECT id, name, municipality, verified, registered_at FROM citizens ORDER BY registered_at DESC LIMIT 100').all();
    res.json(rows);
  });

  // POST /api/bot/whatsapp — AI Orchestrator
  // Receives a citizen message (from WhatsApp webhook or simulation)
  // Classifies with Gemini, stores in DB, returns ticket + suggested reply
  app.post('/api/bot/whatsapp', async (req, res) => {
    const { phone, message, municipality = 'Tepic' } = req.body;
    if (!message) return res.status(400).json({ error: 'message required' });

    const startMs = Date.now();
    const reportId = crypto.randomUUID();
    const classId = crypto.randomUUID();

    // Map category → agency
    const CATEGORY_AGENCY: Record<string, string> = {
      BACHE: 'ag-infra', LUMINARIA: 'ag-serv', AGUA: 'ag-serv',
      SEGURIDAD: 'ag-seg', SALUD: 'ag-salud', BASURA: 'ag-serv',
      PARQUE: 'ag-serv', OTRO: 'ag-serv'
    };

    let classification = {
      category: 'OTRO' as string,
      urgency: 'MEDIUM' as string,
      sentiment: 'NEUTRAL' as string,
      summary: message.slice(0, 120),
      location_text: '',
      suggested_reply: '',
      confidence: 0.7
    };

    try {
      const prompt = `Eres el clasificador del Bot Tepic para el gobierno de Nayarit, México.
Analiza este mensaje ciudadano y extrae:
- category: BACHE|LUMINARIA|AGUA|SEGURIDAD|SALUD|BASURA|PARQUE|OTRO
- urgency: LOW|MEDIUM|HIGH|CRITICAL
- sentiment: POSITIVE|NEUTRAL|NEGATIVE|FRUSTRATED
- summary: resumen del problema en máximo 80 caracteres
- location_text: ubicación mencionada o ""
- suggested_reply: respuesta en WhatsApp (máx 120 caracteres) que confirme el reporte con calidez
- confidence: 0.0 a 1.0

Mensaje: "${message.replace(/"/g, "'")}"
Municipio: ${municipality}`;

      const result = await genai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              urgency: { type: Type.STRING },
              sentiment: { type: Type.STRING },
              summary: { type: Type.STRING },
              location_text: { type: Type.STRING },
              suggested_reply: { type: Type.STRING },
              confidence: { type: Type.NUMBER }
            },
            required: ['category','urgency','sentiment','summary','suggested_reply','confidence']
          }
        }
      });
      Object.assign(classification, JSON.parse(result.text));
    } catch (e) {
      console.error('Gemini classification error:', e);
      // fallback: keyword-based classification
      const msg = message.toLowerCase();
      if (msg.includes('bache') || msg.includes('hoyo') || msg.includes('pavimento')) classification.category = 'BACHE';
      else if (msg.includes('luz') || msg.includes('luminaria') || msg.includes('alumbrado')) classification.category = 'LUMINARIA';
      else if (msg.includes('agua') || msg.includes('fuga') || msg.includes('drenaje')) classification.category = 'AGUA';
      else if (msg.includes('robo') || msg.includes('seguridad') || msg.includes('peligro')) classification.category = 'SEGURIDAD';
      else if (msg.includes('basura') || msg.includes('residuos')) classification.category = 'BASURA';
      classification.suggested_reply = `✅ Reporte recibido. Folio: ${reportId.slice(0,8).toUpperCase()}. Atenderemos en breve.`;
    }

    const processingMs = Date.now() - startMs;
    const agencyId = CATEGORY_AGENCY[classification.category] || 'ag-serv';
    const folioShort = reportId.slice(0, 8).toUpperCase();
    const reply = classification.suggested_reply || `✅ Folio ${folioShort}: Tu reporte de ${classification.category} fue recibido. ${agencyId === 'ag-infra' ? 'Infraestructura' : 'Servicios Públicos'} te dará seguimiento. ¡Gracias!`;

    // Persist to DB
    db.prepare(`INSERT INTO reports (id, citizen_phone, raw_message, category, urgency, sentiment, agency_id, ai_summary, location_text, municipality) VALUES (?,?,?,?,?,?,?,?,?,?)`)
      .run(reportId, phone || null, message, classification.category, classification.urgency, classification.sentiment, agencyId, classification.summary, classification.location_text || null, municipality);

    db.prepare(`INSERT INTO ai_classifications (id, report_id, category, urgency, sentiment, routing_agency_id, suggested_reply, confidence, processing_ms) VALUES (?,?,?,?,?,?,?,?,?)`)
      .run(classId, reportId, classification.category, classification.urgency, classification.sentiment, agencyId, reply, classification.confidence, processingMs);

    res.json({
      folio: folioShort,
      report_id: reportId,
      reply,
      classification: {
        category: classification.category,
        urgency: classification.urgency,
        sentiment: classification.sentiment,
        summary: classification.summary,
        agency_id: agencyId,
        confidence: classification.confidence,
        processing_ms: processingMs
      }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
