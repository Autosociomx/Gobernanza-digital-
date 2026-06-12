import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ─── SISTEMA PROMPT para el asistente ─────────────────────── */
const SISTEMA = `Eres el asistente oficial de la campaña de Geraldine Ponce, presidenta municipal de Tepic y candidata a gobernadora de Nayarit 2027. Respondes en español mexicano, cálido y claro, máximo 3 oraciones.

CONTEXTO: Geraldine Ponce, 30 años, primera mujer presidenta municipal de Tepic (2021-2027, reelecta). Logros reales en operación: obras públicas transparentes con dashboard público, predial digital con recordatorio por WhatsApp, reportes ciudadanos con IA por WhatsApp (foto → IA clasifica → seguimiento), TEPICTU Salud (triaje médico IA offline en módulos DIF). Propuesta para gobernadora: 4 pilares - Gobierno Transparente (trazabilidad satelital de obras), Sexenio del Campesino (mapeo satelital + IA agrícola + sensores IoT), TEPICTU Salud estatal (triaje IA en todas las clínicas, offline para la sierra: El Nayar, Huajicori, La Yesca), PyMEs Nayaritas (digitalización de tortillerías, panaderías, restaurantes). El nombre de ConnectX / la empresa tecnológica que la apoya es Connect X con sede en Tepic.

Si te preguntan algo fuera de la campaña, redirige amablemente al tema. Nunca inventes cifras.`;

/* ─── Wixárika CSS embebido ────────────────────────────────── */
const LANDING_CSS = `
/* ── Paleta ── */
.lp { --mag:#E5007A;--turq:#00BCD4;--sol:#FFB300;--vrd:#00873E;--cor:#F44336;--mrd:#7B1FA2;--tnt:#150800;--crm:#FEF8EE;--hso:#F0E6D3;--bco:#FFFFFF;--grs:#6B5D50; }
.lp *,
.lp *::before,
.lp *::after { box-sizing:border-box; margin:0; padding:0; }
.lp { background:var(--crm); color:var(--tnt); font-family:'Instrument Sans',sans-serif; overflow-x:hidden; line-height:1.6; }

/* ── Utilidades tipográficas ── */
.lp-frau     { font-family:'Fraunces',serif; }
.lp-inst     { font-family:'Instrument Sans',sans-serif; }
.lp-mono     { font-family:'Spline Sans Mono',monospace; }

/* ── Patrón Wixárika (nierika) ── */
.lp-wix-bg {
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpolygon points='40,3 77,40 40,77 3,40' fill='none' stroke='%23E5007A' stroke-width='1.8' opacity='0.18'/%3E%3Cpolygon points='40,14 66,40 40,66 14,40' fill='none' stroke='%2300BCD4' stroke-width='1.4' opacity='0.15'/%3E%3Cline x1='40' y1='3' x2='40' y2='77' stroke='%23FFB300' stroke-width='.8' opacity='0.08'/%3E%3Cline x1='3' y1='40' x2='77' y2='40' stroke='%23FFB300' stroke-width='.8' opacity='0.08'/%3E%3Ccircle cx='40' cy='40' r='3.5' fill='%23FFB300' opacity='0.2'/%3E%3Ccircle cx='40' cy='3' r='2.5' fill='%23E5007A' opacity='0.22'/%3E%3Ccircle cx='77' cy='40' r='2.5' fill='%2300BCD4' opacity='0.22'/%3E%3Ccircle cx='40' cy='77' r='2.5' fill='%23E5007A' opacity='0.22'/%3E%3Ccircle cx='3' cy='40' r='2.5' fill='%2300BCD4' opacity='0.22'/%3E%3C/svg%3E");
  background-size:80px 80px;
}

/* ── NAV ── */
.lp-nav {
  position:fixed;top:0;left:0;right:0;z-index:900;
  background:rgba(254,248,238,.96);backdrop-filter:blur(14px);
  padding:.95rem 2rem;
  display:flex;align-items:center;justify-content:space-between;
  border-bottom:1px solid rgba(21,8,0,.1);
  transition:box-shadow .3s;
}
.lp-nav.sombra { box-shadow:0 6px 28px rgba(21,8,0,.1); }
.lp-nav-logo {
  font-family:'Fraunces',serif;font-weight:900;font-size:1.15rem;
  font-variation-settings:'opsz' 40;
  letter-spacing:-.01em;color:var(--tnt);
  text-decoration:none;display:flex;align-items:center;gap:.55rem;cursor:pointer;
}
.lp-gema {
  width:14px;height:14px;background:var(--mag);
  transform:rotate(45deg);flex-shrink:0;
  box-shadow:2.5px 2.5px 0 var(--sol);
}
.lp-nav-links { display:flex;align-items:center;gap:1.8rem;list-style:none; }
.lp-nav-links a {
  font-family:'Instrument Sans',sans-serif;font-size:.72rem;font-weight:600;
  letter-spacing:.12em;text-transform:uppercase;
  color:var(--grs);text-decoration:none;transition:color .2s;
}
.lp-nav-links a:hover { color:var(--mag); }
.lp-nav-cta {
  background:var(--tnt)!important;color:var(--crm)!important;
  padding:.5rem 1.3rem;border-radius:2rem;
  transition:background .2s!important;cursor:pointer;
  font-family:'Instrument Sans',sans-serif;font-size:.72rem;font-weight:600;
  letter-spacing:.12em;text-transform:uppercase;
  text-decoration:none;border:none;
}
.lp-nav-cta:hover { background:var(--mag)!important; }

/* ── HERO ── */
.lp-hero {
  min-height:100vh;padding:7.5rem 2rem 4rem;
  display:grid;grid-template-columns:1.15fr 1fr;
  align-items:center;gap:3rem;
  position:relative;overflow:hidden;
  background-color:var(--crm);
}
.lp-banda-top {
  position:absolute;top:0;left:0;right:0;height:5px;
  background:linear-gradient(90deg,var(--mag) 0 20%,var(--sol) 20% 40%,var(--turq) 40% 60%,var(--vrd) 60% 80%,var(--cor) 80% 100%);
}

/* ── Ojos de Dios ── */
.lp-ojos-escena {
  position:absolute;inset:0;
  pointer-events:none;z-index:1;
  perspective:1000px;overflow:hidden;
}
.lp-ojo {
  position:absolute;
  transform-style:preserve-3d;
  will-change:transform;
  filter:drop-shadow(0 18px 28px rgba(21,8,0,.22));
}
.lp-ojo-giro {
  position:absolute;inset:0;
  transform-style:preserve-3d;
  animation:lp-ojo-girar 9s linear infinite;
}
.lp-ojo:nth-child(2) .lp-ojo-giro { animation-duration:12s;animation-direction:reverse; }
.lp-ojo:nth-child(3) .lp-ojo-giro { animation-duration:7.5s; }
@keyframes lp-ojo-girar {
  0%   { transform:rotateZ(45deg) rotateY(0deg)   rotateX(8deg); }
  100% { transform:rotateZ(45deg) rotateY(360deg) rotateX(8deg); }
}
.lp-ojo { animation:lp-ojo-flotar 6s ease-in-out infinite; }
.lp-ojo:nth-child(2) { animation-delay:-2.3s;animation-duration:7.5s; }
.lp-ojo:nth-child(3) { animation-delay:-4.1s;animation-duration:8.5s; }
@keyframes lp-ojo-flotar {
  0%,100% { transform:translateY(0); }
  50%     { transform:translateY(-14px); }
}
.lp-ojo-giro::before,.lp-ojo-giro::after {
  content:'';position:absolute;
  background:linear-gradient(90deg,#8B5E34,#C49A6C,#8B5E34);
  border-radius:3px;
  box-shadow:0 2px 4px rgba(21,8,0,.3);
  transform:translateZ(-6px);
}
.lp-ojo-giro::before { width:128%;height:4.5%;top:47.75%;left:-14%; }
.lp-ojo-giro::after  { width:4.5%;height:128%;left:47.75%;top:-14%; }
.lp-capa {
  position:absolute;border-style:solid;
  box-shadow:inset 0 2px 3px rgba(255,255,255,.3),inset 0 -2px 3px rgba(21,8,0,.2),0 1px 2px rgba(21,8,0,.15);
}
.lp-c1{transform:translateZ(0px)} .lp-c2{transform:translateZ(2.5px)}
.lp-c3{transform:translateZ(5px)}  .lp-c4{transform:translateZ(7.5px)}
.lp-c5{transform:translateZ(10px)} .lp-c6{transform:translateZ(12px)}
/* Ojo A */
.lp-ojo-a { width:150px;height:150px;left:-2%;bottom:6%; }
.lp-ojo-a .lp-c1{inset:0;border-width:13px;border-color:var(--mag)}
.lp-ojo-a .lp-c2{inset:13px;border-width:12px;border-color:var(--sol)}
.lp-ojo-a .lp-c3{inset:25px;border-width:11px;border-color:#fff}
.lp-ojo-a .lp-c4{inset:36px;border-width:11px;border-color:var(--turq)}
.lp-ojo-a .lp-c5{inset:47px;border-width:10px;border-color:var(--mrd)}
.lp-ojo-a .lp-c6{inset:57px;background:var(--tnt)}
/* Ojo B */
.lp-ojo-b { width:105px;height:105px;right:4%;top:11%; }
.lp-ojo-b .lp-c1{inset:0;border-width:10px;border-color:var(--turq)}
.lp-ojo-b .lp-c2{inset:10px;border-width:9px;border-color:#fff}
.lp-ojo-b .lp-c3{inset:19px;border-width:9px;border-color:var(--vrd)}
.lp-ojo-b .lp-c4{inset:28px;border-width:8px;border-color:var(--sol)}
.lp-ojo-b .lp-c5{inset:36px;background:var(--cor)}
.lp-ojo-b .lp-c6{display:none}
/* Ojo C */
.lp-ojo-c { width:72px;height:72px;left:38%;top:5%; }
.lp-ojo-c .lp-c1{inset:0;border-width:8px;border-color:var(--cor)}
.lp-ojo-c .lp-c2{inset:8px;border-width:7px;border-color:var(--sol)}
.lp-ojo-c .lp-c3{inset:15px;border-width:7px;border-color:var(--mrd)}
.lp-ojo-c .lp-c4{inset:22px;background:#fff}
.lp-ojo-c .lp-c5,.lp-ojo-c .lp-c6{display:none}

/* ── Texto hero ── */
.lp-hero-texto { position:relative;z-index:2; }
.lp-eyebrow {
  display:inline-flex;align-items:center;gap:.55rem;
  font-family:'Spline Sans Mono',monospace;font-weight:600;
  font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;
  color:var(--tnt);border:1.5px solid var(--tnt);
  background:var(--sol);padding:.35rem .95rem;border-radius:2rem;
  margin-bottom:1.6rem;box-shadow:3px 3px 0 var(--tnt);
}
.lp-eyebrow-dot { width:6px;height:6px;border-radius:50%;background:var(--mag);animation:lp-parp 2s infinite; }
@keyframes lp-parp { 0%,100%{opacity:1}50%{opacity:.2} }
.lp-nombre {
  font-family:'Fraunces',serif;
  font-variation-settings:'opsz' 144;
  font-weight:900;
  font-size:clamp(4rem,11.5vw,9rem);
  line-height:.9;letter-spacing:-.045em;margin-bottom:.32em;
}
.lp-fn { display:block;color:var(--tnt); }
.lp-ln {
  display:block;color:var(--mag);font-style:italic;
  position:relative;
}
.lp-ln::after {
  content:'';position:absolute;left:.02em;bottom:-.04em;
  height:.05em;width:96%;
  background:linear-gradient(90deg,var(--mag),var(--sol),var(--turq),var(--vrd));
  transform-origin:left;border-radius:2px;
  animation:lp-raya 1s 1s both;
}
@keyframes lp-raya { from{transform:scaleX(0)}to{transform:scaleX(1)} }
.lp-cargo {
  font-family:'Fraunces',serif;font-variation-settings:'opsz' 30;
  font-weight:400;font-style:italic;
  font-size:clamp(1rem,2.2vw,1.4rem);
  color:var(--grs);margin-bottom:1.1rem;
}
.lp-cargo strong { font-style:normal;font-weight:600;color:var(--tnt); }
.lp-tagline {
  font-size:clamp(.88rem,1.8vw,1.05rem);
  color:var(--tnt);opacity:.82;
  max-width:450px;line-height:1.75;margin-bottom:2rem;
}
.lp-tagline em { color:var(--mag);font-style:normal;font-weight:700; }
.lp-btns { display:flex;flex-wrap:wrap;gap:.85rem; }
.lp-btn-a {
  background:var(--tnt);color:var(--crm);
  font-family:'Instrument Sans',sans-serif;font-weight:700;font-size:.88rem;
  padding:.9rem 2rem;border-radius:2.5rem;
  text-decoration:none;display:inline-flex;align-items:center;gap:.5rem;
  border:none;cursor:pointer;
  transition:background .25s,transform .25s,box-shadow .25s;
  box-shadow:0 4px 0 var(--mag);
}
.lp-btn-a:hover { background:var(--mag);transform:translateY(-3px);box-shadow:0 7px 0 var(--tnt); }
.lp-btn-b {
  background:transparent;color:var(--tnt);
  font-family:'Instrument Sans',sans-serif;font-weight:700;font-size:.88rem;
  padding:.9rem 2rem;border-radius:2.5rem;
  border:2px solid var(--tnt);
  text-decoration:none;display:inline-flex;align-items:center;gap:.5rem;
  cursor:pointer;
  transition:all .25s;
}
.lp-btn-b:hover { background:var(--turq);border-color:var(--turq);color:#fff;transform:translateY(-3px); }

/* ── Foto hero ── */
.lp-hero-foto { position:relative;z-index:2; }
.lp-foto-frame {
  position:relative;padding:9px;border-radius:1.2rem;
  background:linear-gradient(135deg,var(--mag),var(--sol),var(--turq),var(--vrd));
  box-shadow:0 24px 60px rgba(21,8,0,.22);
  transition:transform .15s ease-out;
}
.lp-foto-img {
  width:100%;aspect-ratio:3/4;
  object-fit:cover;object-position:top center;
  display:block;border-radius:.8rem;
  filter:saturate(1.06);
}
.lp-foto-label {
  position:absolute;top:-12px;right:-10px;
  background:var(--mag);color:#fff;
  font-family:'Spline Sans Mono',monospace;font-size:.58rem;font-weight:600;
  letter-spacing:.08em;text-transform:uppercase;
  padding:.45rem .75rem;border-radius:.4rem;
  box-shadow:0 6px 18px rgba(229,0,122,.4);
  max-width:150px;text-align:center;line-height:1.35;
}
.lp-foto-badge {
  position:absolute;bottom:-14px;left:-12px;
  background:var(--crm);border:2px solid var(--tnt);border-radius:.7rem;
  padding:.6rem 1rem;box-shadow:4px 4px 0 var(--sol);
}
.lp-badge-n {
  font-family:'Fraunces',serif;font-variation-settings:'opsz' 144;
  font-weight:900;font-size:1.6rem;line-height:1;color:var(--tnt);display:block;
}
.lp-badge-t {
  font-family:'Spline Sans Mono',monospace;font-size:.58rem;font-weight:600;
  letter-spacing:.1em;text-transform:uppercase;color:var(--grs);display:block;margin-top:.12rem;
}

/* ── Stats ── */
.lp-stats { background:var(--tnt);padding:2.2rem 2rem;border-top:5px solid var(--sol); }
.lp-stats-grid {
  max-width:980px;margin:0 auto;
  display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;text-align:center;
}
.lp-st-num {
  font-family:'Fraunces',serif;font-variation-settings:'opsz' 144;
  font-weight:900;font-size:clamp(2rem,5vw,3.4rem);
  line-height:1;display:block;
}
.lp-s1{color:var(--mag)} .lp-s2{color:var(--turq)} .lp-s3{color:var(--sol)} .lp-s4{color:#5DD39E}
.lp-st-label {
  font-family:'Spline Sans Mono',monospace;font-size:.6rem;font-weight:400;
  letter-spacing:.14em;text-transform:uppercase;
  color:rgba(254,248,238,.5);margin-top:.4rem;display:block;
}

/* ── Secciones base ── */
.lp-sec { padding:5.5rem 2rem; }
.lp-sec-crema { background:var(--crm); }
.lp-sec-hueso { background:var(--hso); }
.lp-sec-blanco { background:#fff; }
.lp-wrap { max-width:980px;margin:0 auto; }
.lp-tag {
  display:inline-block;
  font-family:'Spline Sans Mono',monospace;font-size:.6rem;font-weight:600;
  letter-spacing:.2em;text-transform:uppercase;
  color:#fff;padding:.32rem .9rem;border-radius:2rem;margin-bottom:1.1rem;
}
.lp-ttl {
  font-family:'Fraunces',serif;font-variation-settings:'opsz' 144;
  font-weight:900;font-size:clamp(2.1rem,5.5vw,3.9rem);
  line-height:.98;letter-spacing:-.035em;margin-bottom:1rem;
}
.lp-ttl em { font-style:italic; }
.lp-bajada {
  font-family:'Fraunces',serif;font-variation-settings:'opsz' 30;
  font-style:italic;font-weight:400;
  font-size:clamp(1rem,2.1vw,1.35rem);
  color:var(--grs);line-height:1.5;margin-bottom:2.4rem;max-width:560px;
}

/* ── Logros ── */
.lp-logros-layout { display:grid;grid-template-columns:1fr 1.3fr;gap:2.6rem;align-items:start; }
.lp-lf-wrap {
  position:relative;padding:7px;border-radius:1rem;
  background:linear-gradient(160deg,var(--turq),var(--vrd),var(--sol));
  box-shadow:0 20px 50px rgba(21,8,0,.18);
}
.lp-lf-img { width:100%;aspect-ratio:4/5;object-fit:cover;object-position:center top;display:block;border-radius:.65rem; }
.lp-lf-cap {
  position:absolute;bottom:-14px;right:-12px;
  background:var(--crm);border:2px solid var(--tnt);border-radius:.7rem;
  padding:.65rem 1rem;box-shadow:4px 4px 0 var(--turq);
}
.lp-lf-cap b {
  font-family:'Fraunces',serif;font-variation-settings:'opsz' 144;
  font-weight:900;font-size:1.25rem;color:var(--tnt);display:block;line-height:1;
}
.lp-lf-cap small {
  font-family:'Spline Sans Mono',monospace;font-size:.56rem;font-weight:600;
  letter-spacing:.1em;text-transform:uppercase;color:var(--grs);
}
.lp-lg-cards { display:flex;flex-direction:column;gap:1rem; }
.lp-lg {
  background:#fff;border:1.5px solid rgba(21,8,0,.12);border-radius:1rem;
  padding:1.25rem 1.45rem;position:relative;overflow:hidden;
  transition:transform .25s,box-shadow .25s,border-color .25s;
}
.lp-lg::before {
  content:'';position:absolute;left:0;top:0;bottom:0;width:5px;border-radius:5px 0 0 5px;
}
.lp-lg:nth-child(1)::before{background:var(--mag)}
.lp-lg:nth-child(2)::before{background:var(--turq)}
.lp-lg:nth-child(3)::before{background:var(--sol)}
.lp-lg:nth-child(4)::before{background:var(--vrd)}
.lp-lg:hover { transform:translateY(-4px);box-shadow:0 14px 36px rgba(21,8,0,.1);border-color:rgba(21,8,0,.28); }
.lp-lg-h { display:flex;align-items:center;gap:.75rem;margin-bottom:.4rem; }
.lp-lg-ic { font-size:1.4rem;flex-shrink:0; }
.lp-lg-t {
  font-family:'Fraunces',serif;font-variation-settings:'opsz' 60;
  font-weight:600;font-size:1rem;letter-spacing:-.01em;color:var(--tnt);
}
.lp-lg-d { font-size:.82rem;color:var(--grs);line-height:1.68;padding-left:2.2rem; }
.lp-lg-pill {
  display:inline-block;margin-top:.6rem;margin-left:2.2rem;
  font-family:'Spline Sans Mono',monospace;font-size:.54rem;font-weight:600;
  letter-spacing:.14em;text-transform:uppercase;
  color:#fff;padding:.22rem .7rem;border-radius:2rem;
}
.lp-lg:nth-child(1) .lp-lg-pill{background:var(--mag)}
.lp-lg:nth-child(2) .lp-lg-pill{background:var(--turq)}
.lp-lg:nth-child(3) .lp-lg-pill{background:var(--sol);color:var(--tnt)}
.lp-lg:nth-child(4) .lp-lg-pill{background:var(--vrd)}

/* ── Frase ── */
.lp-frase { background:var(--mag);padding:5rem 2rem;position:relative;overflow:hidden;background-color:var(--mag); }
.lp-frase-in { max-width:920px;margin:0 auto;display:grid;grid-template-columns:auto 1fr;gap:2.4rem;align-items:center; }
.lp-ff-wrap {
  width:170px;padding:6px;border-radius:50%;
  background:linear-gradient(135deg,var(--sol),var(--turq));
  box-shadow:0 16px 44px rgba(21,8,0,.35);
}
.lp-ff-img { width:100%;aspect-ratio:1;border-radius:50%;object-fit:cover;object-position:top center;display:block; }
.lp-frase blockquote {
  font-family:'Fraunces',serif;font-variation-settings:'opsz' 144;
  font-weight:600;font-style:italic;
  font-size:clamp(1.4rem,3.6vw,2.6rem);
  color:#fff;line-height:1.25;margin-bottom:1rem;
}
.lp-frase blockquote em { font-style:italic;color:var(--sol); }
.lp-frase cite {
  font-family:'Spline Sans Mono',monospace;font-size:.6rem;font-weight:600;
  letter-spacing:.2em;text-transform:uppercase;
  color:rgba(255,255,255,.65);font-style:normal;
}

/* ── Pilares ── */
.lp-pil-grid { display:grid;grid-template-columns:repeat(2,1fr);gap:1.3rem;margin-top:2.2rem; }
.lp-pil {
  background:#fff;border-radius:1.2rem;border:1.5px solid rgba(21,8,0,.1);
  padding:2rem 1.9rem;position:relative;overflow:hidden;
  transition:transform .3s,box-shadow .3s;
}
.lp-pil:hover { transform:translateY(-6px);box-shadow:0 20px 48px rgba(21,8,0,.12); }
.lp-pil::after { content:'';position:absolute;top:0;left:0;right:0;height:6px; }
.lp-q1::after{background:var(--mag)} .lp-q2::after{background:var(--vrd)}
.lp-q3::after{background:var(--cor)} .lp-q4::after{background:var(--turq)}
.lp-pil-tag {
  display:inline-block;font-family:'Spline Sans Mono',monospace;font-size:.56rem;font-weight:600;
  letter-spacing:.18em;text-transform:uppercase;color:#fff;
  padding:.24rem .8rem;border-radius:2rem;margin-bottom:1.1rem;
}
.lp-q1 .lp-pil-tag{background:var(--mag)} .lp-q2 .lp-pil-tag{background:var(--vrd)}
.lp-q3 .lp-pil-tag{background:var(--cor)} .lp-q4 .lp-pil-tag{background:var(--turq)}
.lp-pil-ic { font-size:2.6rem;display:block;margin-bottom:.85rem; }
.lp-pil-t {
  font-family:'Fraunces',serif;font-variation-settings:'opsz' 90;
  font-weight:900;font-size:1.3rem;letter-spacing:-.02em;color:var(--tnt);margin-bottom:.55rem;
}
.lp-pil-d { font-size:.83rem;color:var(--grs);line-height:1.72;margin-bottom:1rem; }
.lp-pil-q {
  font-family:'Fraunces',serif;font-variation-settings:'opsz' 30;
  font-style:italic;font-weight:400;font-size:.92rem;line-height:1.5;padding-left:.9rem;
}
.lp-q1 .lp-pil-q{color:var(--mag);border-left:3px solid var(--mag)}
.lp-q2 .lp-pil-q{color:var(--vrd);border-left:3px solid var(--vrd)}
.lp-q3 .lp-pil-q{color:var(--cor);border-left:3px solid var(--cor)}
.lp-q4 .lp-pil-q{color:var(--turq);border-left:3px solid var(--turq)}

/* ── IA / Chat ── */
.lp-ia-sec { background:var(--tnt);position:relative;overflow:hidden;padding:5.5rem 2rem; }
.lp-ia-sec::before {
  content:'';position:absolute;inset:0;opacity:.04;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpolygon points='40,3 77,40 40,77 3,40' fill='none' stroke='%23FFB300' stroke-width='1.8'/%3E%3Cpolygon points='40,14 66,40 40,66 14,40' fill='none' stroke='%2300BCD4' stroke-width='1.4'/%3E%3C/svg%3E");
  background-size:80px 80px;
}
.lp-ia-sec .lp-ttl { color:var(--crm); }
.lp-ia-sec .lp-bajada { color:rgba(254,248,238,.6); }
.lp-ia-grid { display:grid;grid-template-columns:1fr 1fr;gap:2.4rem;align-items:center;position:relative;z-index:1; }
.lp-chat-shell { background:var(--crm);border-radius:1.3rem;overflow:hidden;box-shadow:0 28px 70px rgba(0,0,0,.4); }
.lp-chat-head {
  background:linear-gradient(90deg,var(--mag),var(--mrd));
  padding:.9rem 1.2rem;display:flex;align-items:center;gap:.7rem;
}
.lp-chat-ava {
  width:32px;height:32px;border-radius:50%;background:var(--sol);
  display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;
}
.lp-chat-head-t { font-family:'Instrument Sans',sans-serif;font-weight:700;font-size:.8rem;color:#fff;display:block; }
.lp-chat-head-s { font-family:'Spline Sans Mono',monospace;font-size:.55rem;color:rgba(255,255,255,.7);display:block; }
.lp-chat-body {
  padding:1.1rem;display:flex;flex-direction:column;gap:.7rem;
  min-height:240px;max-height:320px;overflow-y:auto;
}
.lp-msg { max-width:85%;padding:.65rem .95rem;border-radius:1rem;font-size:.8rem;line-height:1.55; }
.lp-msg-u { align-self:flex-end;background:var(--tnt);color:var(--crm);border-bottom-right-radius:.25rem; }
.lp-msg-ia {
  align-self:flex-start;background:#fff;color:var(--tnt);
  border:1px solid rgba(21,8,0,.1);border-bottom-left-radius:.25rem;
}
.lp-chat-input-row {
  display:flex;gap:.5rem;padding:.9rem 1.1rem;
  border-top:1px solid rgba(21,8,0,.1);
}
.lp-chat-input {
  flex:1;border:1.5px solid rgba(21,8,0,.18);border-radius:2rem;
  padding:.6rem 1.1rem;font-family:'Instrument Sans',sans-serif;font-size:.8rem;
  background:#fff;color:var(--tnt);outline:none;transition:border-color .2s;
}
.lp-chat-input:focus { border-color:var(--mag); }
.lp-chat-send {
  background:var(--mag);color:#fff;border:none;border-radius:50%;
  width:38px;height:38px;font-size:1rem;cursor:pointer;flex-shrink:0;
  transition:background .2s,transform .2s;display:flex;align-items:center;justify-content:center;
}
.lp-chat-send:hover { background:var(--mrd);transform:scale(1.07); }
.lp-chat-send:disabled { background:#ccc;cursor:not-allowed;transform:none; }
.lp-ia-features { display:flex;flex-direction:column;gap:1rem; }
.lp-ia-f {
  display:flex;gap:1rem;align-items:flex-start;
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
  border-radius:.9rem;padding:1.05rem 1.2rem;
  transition:background .25s,border-color .25s;
}
.lp-ia-f:hover { background:rgba(255,255,255,.08);border-color:rgba(255,179,0,.35); }
.lp-ia-f-ic { font-size:1.4rem;flex-shrink:0;margin-top:.1rem; }
.lp-ia-f-t { font-family:'Instrument Sans',sans-serif;font-weight:700;font-size:.85rem;color:var(--crm);display:block;margin-bottom:.2rem; }
.lp-ia-f-d { font-size:.76rem;color:rgba(254,248,238,.55);line-height:1.6; }

/* ── Ruta ── */
.lp-timeline { display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-top:2.2rem; }
.lp-tl {
  background:#fff;border:1.5px solid rgba(21,8,0,.12);border-radius:1rem;
  padding:1.6rem 1.4rem;position:relative;transition:transform .25s,box-shadow .25s;
}
.lp-tl:hover { transform:translateY(-4px);box-shadow:0 14px 34px rgba(21,8,0,.1); }
.lp-tl-ahora { border:2px solid var(--mag);box-shadow:0 10px 30px rgba(229,0,122,.15); }
.lp-tl-bd {
  font-family:'Spline Sans Mono',monospace;font-size:.56rem;font-weight:600;
  letter-spacing:.15em;text-transform:uppercase;color:var(--grs);display:block;margin-bottom:.55rem;
}
.lp-tl-ahora .lp-tl-bd { color:var(--mag); }
.lp-tl-t {
  font-family:'Fraunces',serif;font-variation-settings:'opsz' 60;
  font-weight:900;font-size:1rem;color:var(--tnt);margin-bottom:.4rem;line-height:1.15;
}
.lp-tl-d { font-size:.76rem;color:var(--grs);line-height:1.62; }

/* ── Redes ── */
.lp-redes-grid { display:grid;grid-template-columns:repeat(2,1fr);gap:.8rem;margin-top:2.2rem; }
.lp-red {
  background:var(--crm);border:1.5px solid rgba(21,8,0,.12);border-radius:1rem;
  padding:1rem 1.2rem;text-decoration:none;display:flex;align-items:center;gap:.9rem;
  transition:transform .22s,box-shadow .22s,border-color .22s;
}
.lp-red:hover { transform:translateY(-3px);box-shadow:0 12px 28px rgba(21,8,0,.1); }
.lp-r1:hover{border-color:var(--mag)} .lp-r2:hover{border-color:var(--cor)}
.lp-r3:hover{border-color:var(--tnt)} .lp-r4:hover{border-color:var(--turq)}
.lp-r5:hover{border-color:var(--cor)} .lp-r6:hover{border-color:var(--mrd)}
.lp-red-ic { font-size:1.45rem;width:36px;text-align:center;flex-shrink:0; }
.lp-red-n {
  font-family:'Instrument Sans',sans-serif;font-size:.74rem;font-weight:700;
  letter-spacing:.04em;text-transform:uppercase;color:var(--tnt);display:block;
}
.lp-red-h { font-family:'Spline Sans Mono',monospace;font-size:.6rem;color:var(--grs);display:block;margin-top:.08rem; }
.lp-red-u {
  font-family:'Fraunces',serif;font-variation-settings:'opsz' 20;
  font-size:.78rem;font-style:italic;color:var(--grs);margin-top:.12rem;display:block;
}

/* ── CTA ── */
.lp-cta { background:var(--sol);padding:5.5rem 2rem;text-align:center;border-top:5px solid var(--tnt); }
.lp-cta .lp-ttl { color:var(--tnt); }
.lp-cta .lp-bajada { color:rgba(21,8,0,.65);margin:0 auto 2.2rem; }
.lp-cta .lp-tag { background:var(--tnt);color:var(--sol); }
.lp-wa {
  display:inline-flex;align-items:center;gap:.7rem;
  background:var(--tnt);color:var(--crm);
  font-family:'Instrument Sans',sans-serif;font-weight:700;font-size:1rem;
  padding:1.05rem 2.4rem;border-radius:3rem;
  text-decoration:none;
  box-shadow:0 6px 0 rgba(21,8,0,.3);
  transition:transform .22s,box-shadow .22s,background .22s;
}
.lp-wa:hover { background:var(--vrd);transform:translateY(-3px);box-shadow:0 9px 0 rgba(21,8,0,.3); }
.lp-cta-n { font-size:.7rem;color:rgba(21,8,0,.5);margin-top:1.2rem;font-style:italic; }

/* ── Footer ── */
.lp-footer { background:var(--tnt);padding:2.6rem 2rem;text-align:center;border-top:5px solid var(--mag); }
.lp-ft-logo {
  font-family:'Fraunces',serif;font-variation-settings:'opsz' 144;
  font-weight:900;font-size:1.9rem;letter-spacing:-.03em;
  color:var(--crm);display:block;margin-bottom:.3rem;
}
.lp-ft-logo em { color:var(--mag);font-style:italic; }
.lp-ft-sub {
  font-family:'Fraunces',serif;font-variation-settings:'opsz' 20;
  font-size:.88rem;font-style:italic;color:rgba(254,248,238,.5);margin-bottom:1rem;
}
.lp-ft-arco { height:3px;width:84px;margin:.9rem auto 1rem;border-radius:2px;background:linear-gradient(90deg,var(--mag),var(--sol),var(--turq),var(--vrd)); }
.lp-ft-cr { font-family:'Spline Sans Mono',monospace;font-size:.58rem;color:rgba(254,248,238,.25); }
.lp-ft-cr a { color:rgba(255,179,0,.55);text-decoration:none; }
.lp-ft-cr a:hover { color:var(--sol); }

/* ── Reveal ── */
.lp-rv { opacity:0;transform:translateY(26px);transition:opacity .7s cubic-bezier(.4,0,.2,1),transform .7s cubic-bezier(.4,0,.2,1); }
.lp-rv.on { opacity:1;transform:none; }
.lp-d1{transition-delay:.08s} .lp-d2{transition-delay:.16s}
.lp-d3{transition-delay:.24s} .lp-d4{transition-delay:.32s}

/* ── Responsive ── */
@media(max-width:820px){
  .lp-hero { grid-template-columns:1fr;padding-top:6.5rem; }
  .lp-hero-foto { order:-1;max-width:280px;margin:0 auto; }
  .lp-logros-layout { grid-template-columns:1fr; }
  .lp-ia-grid { grid-template-columns:1fr; }
  .lp-frase-in { grid-template-columns:1fr;text-align:center; }
  .lp-ff-wrap { margin:0 auto; }
  .lp-pil-grid { grid-template-columns:1fr; }
  .lp-timeline { grid-template-columns:repeat(2,1fr); }
  .lp-stats-grid { grid-template-columns:repeat(2,1fr); }
  .lp-nav-links { display:none; }
}
@media(max-width:520px){
  .lp-redes-grid { grid-template-columns:1fr; }
  .lp-timeline { grid-template-columns:1fr; }
}
@media(prefers-reduced-motion:reduce){
  .lp *,.lp *::before,.lp *::after{animation:none!important;transition:none!important}
}
`;

/* ─── Types ─────────────────────────────────────────────────── */
interface ChatMsg { text: string; isUser: boolean }

/* ─── Component ─────────────────────────────────────────────── */
export function LandingPage({ onLogin }: { onLogin: () => void }) {
  /* state */
  const [navScrolled, setNavScrolled] = useState(false);
  const [chatMsgs, setChatMsgs] = useState<ChatMsg[]>([
    { text: '¡Hola! Soy el asistente de la campaña. Pregúntame sobre las propuestas, los logros en Tepic o cómo participar. 🌽', isUser: false }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [historial, setHistorial] = useState<{ role: string; content: string }[]>([]);

  /* refs */
  const ojoARef = useRef<HTMLDivElement>(null);
  const ojoBRef = useRef<HTMLDivElement>(null);
  const ojoCRef = useRef<HTMLDivElement>(null);
  const fotoFrameRef = useRef<HTMLDivElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  /* ── Nav scroll ── */
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Reveal IntersectionObserver ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.lp-rv').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ── Ojos de Dios parallax ── */
  useEffect(() => {
    const ojos = [
      { ref: ojoARef, prof: 22 },
      { ref: ojoBRef, prof: 40 },
      { ref: ojoCRef, prof: 60 },
    ];
    let tx = 0, ty = 0, cx = 0, cy = 0;
    let rafId: number;
    const isTouch = 'ontouchstart' in window;

    if (!isTouch) {
      const onMouseMove = (e: MouseEvent) => {
        tx = e.clientX / window.innerWidth - 0.5;
        ty = e.clientY / window.innerHeight - 0.5;
      };
      document.addEventListener('mousemove', onMouseMove, { passive: true });
      const animate = () => {
        cx += (tx - cx) * 0.06;
        cy += (ty - cy) * 0.06;
        ojos.forEach(({ ref, prof }) => {
          if (ref.current) ref.current.style.translate = `${cx * prof}px ${cy * prof}px`;
        });
        rafId = requestAnimationFrame(animate);
      };
      rafId = requestAnimationFrame(animate);
      return () => {
        document.removeEventListener('mousemove', onMouseMove);
        cancelAnimationFrame(rafId);
      };
    } else {
      const onScroll = () => { ty = Math.max(-0.5, Math.min(0.5, window.scrollY / window.innerHeight - 0.25)); };
      window.addEventListener('scroll', onScroll, { passive: true });
      const animate = () => {
        cx += (tx - cx) * 0.06;
        cy += (ty - cy) * 0.06;
        ojos.forEach(({ ref, prof }) => {
          if (ref.current) ref.current.style.translate = `${cx * prof}px ${cy * prof}px`;
        });
        rafId = requestAnimationFrame(animate);
      };
      rafId = requestAnimationFrame(animate);
      return () => {
        window.removeEventListener('scroll', onScroll);
        cancelAnimationFrame(rafId);
      };
    }
  }, []);

  /* ── Foto tilt (desktop) ── */
  const handleFotoMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = fotoFrameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 7}deg) rotateX(${y * -7}deg) scale(1.015)`;
  }, []);
  const handleFotoLeave = useCallback(() => {
    if (fotoFrameRef.current) fotoFrameRef.current.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)';
  }, []);

  /* ── Chat ── */
  const scrollChat = () => {
    setTimeout(() => {
      if (chatBodyRef.current) chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }, 50);
  };

  const enviar = async (textoOverride?: string) => {
    const texto = textoOverride ?? chatInput;
    if (!texto.trim() || chatLoading) return;
    setChatInput('');

    const userMsg: ChatMsg = { text: texto, isUser: true };
    setChatMsgs(prev => [...prev, userMsg]);
    const newHistorial = [...historial, { role: 'user', content: texto }];
    setHistorial(newHistorial);
    setChatLoading(true);
    scrollChat();

    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 400,
          system: SISTEMA,
          messages: newHistorial,
        }),
      });
      const data = await res.json();
      const respuesta: string =
        (data.content || []).filter((b: any) => b.type === 'text').map((b: any) => b.text).join('\n') ||
        'Disculpa, intenta de nuevo.';
      setChatMsgs(prev => [...prev, { text: respuesta, isUser: false }]);
      const updated = [...newHistorial, { role: 'assistant', content: respuesta }];
      setHistorial(updated.slice(-12));
    } catch {
      setChatMsgs(prev => [...prev, { text: 'El asistente estará disponible muy pronto. Únete al canal de WhatsApp para más info. 💬', isUser: false }]);
    } finally {
      setChatLoading(false);
      scrollChat();
    }
  };

  /* ─── RENDER ─────────────────────────────────────────────── */
  return (
    <div className="lp">
      <style>{LANDING_CSS}</style>

      {/* ── NAV ── */}
      <nav className={`lp-nav${navScrolled ? ' sombra' : ''}`}>
        <a href="#inicio" className="lp-nav-logo">
          <span className="lp-gema" />
          Geraldine Ponce
        </a>
        <ul className="lp-nav-links">
          <li><a href="#logros">Logros</a></li>
          <li><a href="#pilares">Propuesta</a></li>
          <li><a href="#ia">Asistente IA</a></li>
          <li>
            <button className="lp-nav-cta" onClick={onLogin}>Panel de Gobierno</button>
          </li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section className="lp-hero lp-wix-bg" id="inicio">
        <div className="lp-banda-top" />
        {/* Ojos de Dios */}
        <div className="lp-ojos-escena">
          <div className="lp-ojo lp-ojo-a" ref={ojoARef}>
            <div className="lp-ojo-giro">
              {[1,2,3,4,5,6].map(n => <div key={n} className={`lp-capa lp-c${n}`} />)}
            </div>
          </div>
          <div className="lp-ojo lp-ojo-b" ref={ojoBRef}>
            <div className="lp-ojo-giro">
              {[1,2,3,4,5,6].map(n => <div key={n} className={`lp-capa lp-c${n}`} />)}
            </div>
          </div>
          <div className="lp-ojo lp-ojo-c" ref={ojoCRef}>
            <div className="lp-ojo-giro">
              {[1,2,3,4,5,6].map(n => <div key={n} className={`lp-capa lp-c${n}`} />)}
            </div>
          </div>
        </div>

        {/* Texto */}
        <div className="lp-hero-texto">
          <div className="lp-eyebrow">
            <span className="lp-eyebrow-dot" />
            Nayarit · Gobernatura · 2027
          </div>
          <h1 className="lp-nombre">
            <span className="lp-fn">Geraldine</span>
            <span className="lp-ln">Ponce</span>
          </h1>
          <p className="lp-cargo">
            <strong>Presidenta Municipal de Tepic</strong>,<br />
            primera mujer en gobernar la capital de Nayarit
          </p>
          <p className="lp-tagline">
            La gobernante que <em>ya transformó Tepic.</em><br />
            Ahora lleva ese cambio a los 20 municipios de Nayarit.
          </p>
          <div className="lp-btns">
            <a href="#pilares" className="lp-btn-a">Ver la propuesta →</a>
            <a href="#comunidad" className="lp-btn-b">Únete al movimiento</a>
          </div>
        </div>

        {/* Foto */}
        <div className="lp-hero-foto">
          <div
            className="lp-foto-frame"
            ref={fotoFrameRef}
            onMouseMove={handleFotoMove}
            onMouseLeave={handleFotoLeave}
          >
            <img
              className="lp-foto-img"
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop&crop=faces&auto=format&q=85"
              alt="Geraldine Ponce — Presidenta Municipal de Tepic"
              loading="eager"
            />
            <div className="lp-foto-label">1ª Presidenta Municipal de Tepic</div>
            <div className="lp-foto-badge">
              <span className="lp-badge-n">30</span>
              <span className="lp-badge-t">años · Tepic</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="lp-stats">
        <div className="lp-stats-grid">
          <div><span className="lp-st-num lp-s1">425K</span><span className="lp-st-label">Tepicenses gobernados</span></div>
          <div><span className="lp-st-num lp-s2">100%</span><span className="lp-st-label">Obras trazables en vivo</span></div>
          <div><span className="lp-st-num lp-s3">20</span><span className="lp-st-label">Municipios por digitalizar</span></div>
          <div><span className="lp-st-num lp-s4">519K</span><span className="lp-st-label">Seguidores en Instagram</span></div>
        </div>
      </div>

      {/* ── LOGROS ── */}
      <section className="lp-sec lp-sec-crema" id="logros">
        <div className="lp-wrap">
          <span className="lp-tag lp-rv" style={{ background: 'var(--mag)' }}>Resultados reales · Tepic 2021–2026</span>
          <h2 className="lp-ttl lp-rv lp-d1">Mientras otros prometen,<br /><em style={{ color: 'var(--mag)' }}>ella ya lo hizo.</em></h2>
          <p className="lp-bajada lp-rv lp-d2">Cada logro ya funciona hoy. No es plan de campaña — es historial de gobierno.</p>
          <div className="lp-logros-layout">
            <div className="lp-rv lp-d1">
              <div className="lp-lf-wrap">
                <img
                  className="lp-lf-img"
                  src="https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=500&h=625&fit=crop&crop=faces&auto=format&q=80"
                  alt="Geraldine Ponce en actividad de gobierno"
                  loading="lazy"
                />
                <div className="lp-lf-cap"><b>2021</b><small>–2026 · En gobierno</small></div>
              </div>
            </div>
            <div className="lp-lg-cards">
              {[
                { ic:'🏗️', t:'Obras Públicas Transparentes', d:'Cada peso de construcción vial, drenaje y equipamiento, visible en tiempo real desde cualquier celular. Cero opacidad.', pill:'Activo · Dashboard público' },
                { ic:'💳', t:'Predial y Trámites Digitales', d:'Pagos municipales sin filas, con recordatorio por WhatsApp. Recaudación incrementada desde el primer mes.', pill:'Activo · Tesorería digital' },
                { ic:'📱', t:'Reportes Ciudadanos con IA', d:'Foto por WhatsApp → la IA clasifica y asigna → el vecino recibe seguimiento hasta resolución.', pill:'Activo · Servicios públicos' },
                { ic:'💚', t:'TEPICTU Salud', d:'Triaje médico con IA en módulos DIF. Funciona sin internet. El nombre viene de la palabra original que da origen a "Tepic".', pill:'Activo · Bienestar social' },
              ].map((lg, i) => (
                <div className="lp-lg lp-rv" style={{ transitionDelay: `${(i+1)*0.08}s` }} key={i}>
                  <div className="lp-lg-h"><span className="lp-lg-ic">{lg.ic}</span><div className="lp-lg-t">{lg.t}</div></div>
                  <p className="lp-lg-d">{lg.d}</p>
                  <span className="lp-lg-pill">{lg.pill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FRASE ── */}
      <div className="lp-frase lp-wix-bg">
        <div className="lp-frase-in lp-rv">
          <div className="lp-ff-wrap">
            <img
              className="lp-ff-img"
              src="https://images.unsplash.com/photo-1586996292898-71f4036c4e07?w=300&h=300&fit=crop&crop=faces&auto=format&q=80"
              alt="Geraldine Ponce"
              loading="lazy"
            />
          </div>
          <div>
            <blockquote>"Si pude digitalizar Tepic con <em>425 mil habitantes,</em> puedo digitalizar Nayarit entero."</blockquote>
            <cite>— Geraldine Ponce · Presidenta Municipal de Tepic</cite>
          </div>
        </div>
      </div>

      {/* ── PILARES ── */}
      <section className="lp-sec lp-sec-hueso" id="pilares">
        <div className="lp-wrap">
          <span className="lp-tag lp-rv" style={{ background: 'var(--turq)' }}>Propuesta de Gobierno · 2027–2033</span>
          <h2 className="lp-ttl lp-rv lp-d1">Cuatro pilares.<br /><em style={{ color: 'var(--turq)' }}>Un solo Nayarit.</em></h2>
          <p className="lp-bajada lp-rv lp-d2">Productos ya construidos en Tepic. Listos el primer día de gobierno.</p>
          <div className="lp-pil-grid lp-rv lp-d3">
            {[
              { cls:'lp-q1', tag:'Transparencia', ic:'🏛️', t:'Gobierno Transparente', d:'Trazabilidad satelital de cada obra estatal. Contratos, avances y auditoría ciudadana en tiempo real.', q:'"Cada peso del erario, visible en el celular de cualquier nayarita."' },
              { cls:'lp-q2', tag:'Campo', ic:'🌽', t:'El Sexenio del Campesino', d:'Mapeo satelital de la sierra. IA que recomienda cultivos por suelo, altitud y clima. Sensores IoT para el productor.', q:'"Llego con el mapa ya hecho. Los demás llegan con promesas."' },
              { cls:'lp-q3', tag:'Salud', ic:'💚', t:'TEPICTU Salud', d:'Triaje médico con IA en cada clínica estatal. Funciona offline — llega a El Nayar, Huajicori, La Yesca.', q:'"Inteligencia artificial del mar a la sierra. Sin excepción."' },
              { cls:'lp-q4', tag:'PyMEs', ic:'🛒', t:'PyMEs Nayaritas', d:'Digitalización para tortillerías, panaderías y restaurantes. Tecnología de grandes empresas, para el pueblo.', q:'"El primer gobierno que digitaliza al pueblo, no a las corporaciones."' },
            ].map((p, i) => (
              <div className={`lp-pil ${p.cls}`} key={i}>
                <span className="lp-pil-tag">{p.tag}</span>
                <span className="lp-pil-ic">{p.ic}</span>
                <div className="lp-pil-t">{p.t}</div>
                <p className="lp-pil-d">{p.d}</p>
                <p className="lp-pil-q">{p.q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ASISTENTE IA ── */}
      <section className="lp-ia-sec" id="ia">
        <div className="lp-wrap">
          <span className="lp-tag lp-rv" style={{ background: 'var(--sol)', color: 'var(--tnt)' }}>Propuesta de valor · Inteligencia Artificial</span>
          <h2 className="lp-ttl lp-rv lp-d1">Pregúntale a la<br /><em style={{ color: 'var(--sol)' }}>campaña. Directamente.</em></h2>
          <p className="lp-bajada lp-rv lp-d2">El primer asistente de IA de una campaña en Nayarit: responde dudas sobre propuestas, trámites y resultados — las 24 horas, en lenguaje claro.</p>
          <div className="lp-ia-grid">
            {/* Chat */}
            <div className="lp-chat-shell lp-rv lp-d1">
              <div className="lp-chat-head">
                <div className="lp-chat-ava">🌽</div>
                <div>
                  <span className="lp-chat-head-t">Asistente Nayarit Digital</span>
                  <span className="lp-chat-head-s">Potenciado por IA · Siempre disponible</span>
                </div>
              </div>
              <div className="lp-chat-body" ref={chatBodyRef}>
                {chatMsgs.map((m, i) => (
                  <div key={i} className={`lp-msg ${m.isUser ? 'lp-msg-u' : 'lp-msg-ia'}`}>{m.text}</div>
                ))}
                {chatLoading && (
                  <div className="lp-msg lp-msg-ia" style={{ opacity: 0.5 }}>Escribiendo...</div>
                )}
              </div>
              <div className="lp-chat-input-row">
                <input
                  className="lp-chat-input"
                  type="text"
                  placeholder="Escribe tu pregunta..."
                  maxLength={200}
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') enviar(); }}
                />
                <button
                  className="lp-chat-send"
                  onClick={() => enviar()}
                  disabled={chatLoading || !chatInput.trim()}
                  aria-label="Enviar"
                >
                  →
                </button>
              </div>
            </div>
            {/* Features */}
            <div className="lp-ia-features lp-rv lp-d2">
              {[
                { ic:'💬', t:'Respuestas al instante, 24/7', d:'Cualquier ciudadano pregunta sobre propuestas, trámites o resultados — y recibe respuesta clara al momento.' },
                { ic:'🗳️', t:'Escucha ciudadana inteligente', d:'Cada conversación detecta las preocupaciones reales por colonia: agua, seguridad, baches.' },
                { ic:'🌐', t:'Habla tu idioma', d:'Español, wixárika, náhuatl o cora: la IA responde en la lengua del ciudadano. Inclusión real.' },
                { ic:'📊', t:'Transparencia verificable', d:'El asistente cita datos reales del gobierno municipal: obras, presupuestos, avances. No opina — informa.' },
              ].map((f, i) => (
                <div className="lp-ia-f" key={i}>
                  <span className="lp-ia-f-ic">{f.ic}</span>
                  <div>
                    <span className="lp-ia-f-t">{f.t}</span>
                    <p className="lp-ia-f-d">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RUTA ── */}
      <section className="lp-sec lp-sec-crema" id="ruta">
        <div className="lp-wrap">
          <span className="lp-tag lp-rv" style={{ background: 'var(--vrd)' }}>De Tepic al Estado</span>
          <h2 className="lp-ttl lp-rv lp-d1">Del municipio<br /><em style={{ color: 'var(--vrd)' }}>a los 20 municipios.</em></h2>
          <p className="lp-bajada lp-rv lp-d2">El modelo Tepic es el molde para Nayarit. Misma estrategia, mayor escala.</p>
          <div className="lp-timeline lp-rv lp-d3">
            {[
              { bd:'Ahora · En curso', t:'Tepic Digital', d:'Obras trazables, pagos digitales, IA ciudadana y TEPICTU Salud para 425,924 tepicenses.', ahora: true },
              { bd:'2026', t:'250 Colonias', d:'NayaritID: identidad digital única. Promotores digitales en cada colonia.', ahora: false },
              { bd:'2027 · Campaña', t:'El Debate', d:'Datos reales contra promesas vacías. El argumento que nadie puede refutar.', ahora: false },
              { bd:'2027–2033', t:'Nayarit Digital', d:'Los 20 municipios con el modelo Tepic. El primer gobierno estatal digital de México.', ahora: false },
            ].map((tl, i) => (
              <div key={i} className={`lp-tl${tl.ahora ? ' lp-tl-ahora' : ''}`}>
                <span className="lp-tl-bd">{tl.bd}</span>
                <div className="lp-tl-t">{tl.t}</div>
                <p className="lp-tl-d">{tl.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REDES ── */}
      <section className="lp-sec lp-sec-blanco" id="redes">
        <div className="lp-wrap">
          <span className="lp-tag lp-rv" style={{ background: 'var(--mrd)' }}>Canales oficiales</span>
          <h2 className="lp-ttl lp-rv lp-d1">Sigue el <em style={{ color: 'var(--mrd)' }}>movimiento.</em></h2>
          <p className="lp-bajada lp-rv lp-d2">519 mil seguidores en Instagram. La voz más fuerte de Tepic.</p>
          <div className="lp-redes-grid lp-rv lp-d3">
            {[
              { cls:'lp-r1', href:'https://facebook.com/GeraldinePonceMexico', ic:'📘', n:'Facebook', h:'@GeraldinePonceMexico', u:'Noticias y eventos' },
              { cls:'lp-r2', href:'https://instagram.com/geraldineponcem', ic:'📸', n:'Instagram', h:'@geraldineponcem · 519K', u:'El día a día del gobierno' },
              { cls:'lp-r3', href:'https://tiktok.com/@geraldineponcem', ic:'🎵', n:'TikTok', h:'@geraldineponcem', u:'Recorridos en vivo' },
              { cls:'lp-r4', href:'https://x.com/GeraldinePonceM', ic:'𝕏', n:'X / Twitter', h:'@GeraldinePonceM', u:'Debate político' },
              { cls:'lp-r5', href:'https://youtube.com/@geraldine-ponce-m', ic:'▶️', n:'YouTube', h:'@geraldine-ponce-m', u:'Propuestas a detalle' },
              { cls:'lp-r6', href:'https://threads.net/@geraldineponcem', ic:'🧵', n:'Threads', h:'@geraldineponcem', u:'Comunidad y reflexiones' },
            ].map((r, i) => (
              <a key={i} className={`lp-red ${r.cls}`} href={r.href} target="_blank" rel="noopener noreferrer">
                <span className="lp-red-ic">{r.ic}</span>
                <div>
                  <span className="lp-red-n">{r.n}</span>
                  <span className="lp-red-h">{r.h}</span>
                  <span className="lp-red-u">{r.u}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="lp-cta lp-wix-bg" id="comunidad">
        <div className="lp-wrap">
          <span className="lp-tag lp-rv">Canal oficial · WhatsApp</span>
          <h2 className="lp-ttl lp-rv lp-d1">Sé parte de<br />Nayarit Digital.</h2>
          <p className="lp-bajada lp-rv lp-d2" style={{ maxWidth: '520px' }}>
            Únete al canal oficial y recibe noticias del municipio, propuestas de gobierno y actualizaciones de campaña. Directo. Sin intermediarios.
          </p>
          <a href="https://wa.me/message/geraldineponcem" className="lp-wa lp-rv lp-d3" target="_blank" rel="noopener noreferrer">
            💬 Unirme al canal oficial
          </a>
          <p className="lp-cta-n lp-rv lp-d4">Canal de difusión — solo recibes contenido oficial. Tu número es privado.</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <span className="lp-ft-logo">Geraldine <em>Ponce</em></span>
        <p className="lp-ft-sub">Presidenta Municipal de Tepic · Candidata a Gobernadora de Nayarit 2027</p>
        <div className="lp-ft-arco" />
        <p className="lp-ft-cr">Estrategia digital: <a href="https://connectx.mx" target="_blank" rel="noopener noreferrer">ConnectX</a> · Tepic, Nayarit</p>
        <p className="lp-ft-cr" style={{ marginTop: '.5rem' }}>
          <button
            onClick={onLogin}
            style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(255,179,0,.55)', fontFamily:'inherit', fontSize:'.58rem' }}
            onMouseEnter={e => (e.currentTarget.style.color='#FFB300')}
            onMouseLeave={e => (e.currentTarget.style.color='rgba(255,179,0,.55)')}
          >
            🔒 Acceso Panel ConnectX
          </button>
        </p>
      </footer>
    </div>
  );
}
