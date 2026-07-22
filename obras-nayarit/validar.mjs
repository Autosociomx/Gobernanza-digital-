#!/usr/bin/env node
// Validador del esquema v2 de datos/obras.json (ver SCHEMA.md).
// Uso: node obras-nayarit/validar.mjs  |  npm run validar:obras
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ruta = join(dirname(fileURLToPath(import.meta.url)), "datos", "obras.json");
const errores = [];
const err = (msg) => errores.push(msg);

let data;
try {
  data = JSON.parse(readFileSync(ruta, "utf8"));
} catch (e) {
  console.error(`JSON ilegible: ${e.message}`);
  process.exit(1);
}

const esTexto = (v) => typeof v === "string" && v.trim() !== "";
const esFecha = (v) => /^\d{4}(-\d{2}){0,2}$/.test(v);
const esURL = (v) => /^https?:\/\/\S+$/.test(v);

if (data.version !== 2) err(`raíz: version debe ser 2, es ${data.version}`);
if (!esTexto(data.actualizado) || !/^\d{4}-\d{2}-\d{2}/.test(data.actualizado))
  err("raíz: 'actualizado' debe iniciar con fecha AAAA-MM-DD");
if (data.estado !== "Nayarit") err("raíz: 'estado' debe ser \"Nayarit\"");

const ambitos = Object.keys(data.clasificacion?.ambitos ?? {});
const etapas = Object.keys(data.clasificacion?.etapas ?? {});
if (!ambitos.length) err("raíz: falta clasificacion.ambitos");
if (!etapas.length) err("raíz: falta clasificacion.etapas");
if (!Array.isArray(data.obras) || !data.obras.length) err("raíz: 'obras' vacío o ausente");

const OBLIGATORIOS_TEXTO = [
  "nombre", "dependencia_ejecutora", "quien_propuso", "quien_autorizo",
  "descripcion", "estatus",
];
const ids = new Set();

for (const [i, o] of (data.obras ?? []).entries()) {
  const quien = `obras[${i}] (${o?.id ?? "sin id"})`;

  if (!esTexto(o.id) || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(o.id)) err(`${quien}: id ausente o no es kebab-case`);
  else if (ids.has(o.id)) err(`${quien}: id duplicado`);
  else ids.add(o.id);

  for (const campo of OBLIGATORIOS_TEXTO)
    if (!esTexto(o[campo])) err(`${quien}: falta texto en '${campo}'`);

  if (!ambitos.includes(o.ambito)) err(`${quien}: ambito '${o.ambito}' fuera del catálogo`);
  if (!etapas.includes(o.etapa)) err(`${quien}: etapa '${o.etapa}' fuera del catálogo`);

  if (!Array.isArray(o.municipios) || o.municipios.some((m) => !esTexto(m)))
    err(`${quien}: 'municipios' debe ser arreglo de textos (puede ser vacío)`);

  for (const campo of ["inversion_mdp", "empleos_estimados"]) {
    const v = o[campo];
    if (!(v === null || (typeof v === "number" && v > 0)))
      err(`${quien}: '${campo}' debe ser número positivo o null`);
  }

  for (const campo of ["fuente_financiamiento", "fecha_inicio", "fecha_entrega_estimada"]) {
    const v = o[campo];
    if (!(v === null || esTexto(v))) err(`${quien}: '${campo}' debe ser texto o null`);
  }

  if (typeof o.contratacion !== "object" || o.contratacion === null ||
      !esTexto(o.contratacion.esquema) ||
      !(o.contratacion.referencia === null || esTexto(o.contratacion.referencia)))
    err(`${quien}: 'contratacion' debe ser { esquema: texto, referencia: texto|null }`);

  if (!Array.isArray(o.hitos) || !o.hitos.length) err(`${quien}: 'hitos' vacío o ausente`);
  else {
    let previa = "";
    for (const [j, h] of o.hitos.entries()) {
      if (!esTexto(h?.fecha) || !esFecha(h.fecha)) err(`${quien}: hitos[${j}].fecha inválida ('${h?.fecha}')`);
      else {
        if (h.fecha.slice(0, previa.length) < previa.slice(0, h.fecha.length) && h.fecha < previa)
          err(`${quien}: hitos[${j}] fuera de orden cronológico`);
        previa = h.fecha;
      }
      if (!esTexto(h?.hecho)) err(`${quien}: hitos[${j}].hecho vacío`);
    }
  }

  if (!Array.isArray(o.fuentes) || !o.fuentes.length) err(`${quien}: se requiere al menos una fuente`);
  else for (const [j, u] of o.fuentes.entries())
    if (!esURL(u)) err(`${quien}: fuentes[${j}] no es URL válida ('${u}')`);

  if (!Array.isArray(o.pendientes_de_verificar) || o.pendientes_de_verificar.some((p) => !esTexto(p)))
    err(`${quien}: 'pendientes_de_verificar' debe ser arreglo de textos (puede ser vacío)`);
}

if (errores.length) {
  console.error(`✗ ${errores.length} error(es) de esquema en datos/obras.json:\n`);
  for (const e of errores) console.error("  - " + e);
  process.exit(1);
}
console.log(`✓ datos/obras.json válido: ${data.obras.length} obras, esquema v${data.version}, actualizado ${data.actualizado}`);
