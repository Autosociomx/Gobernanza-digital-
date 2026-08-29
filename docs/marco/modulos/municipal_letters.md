# Cartas Municipales

## Qué es
Generador de oficios y constancias municipales en modo demostración — calcula un hash SHA-256 real del contenido, dibuja un QR con ese hash y descarga un PDF con membrete, todo etiquetado como sin validez oficial.

## Estado
**Riesgo — simula un resultado que podría confundirse con uno real (pago, documento oficial, verificación)**

Se mantiene en "Riesgo" a propósito. Los vectores de engaño más graves ya se cerraron (ver abajo), pero el módulo sigue produciendo un PDF con el membrete del H. Ayuntamiento de Tepic que, impreso y fuera de contexto, puede confundirse con un oficio real.

## Conexiones
_Sin conexiones registradas todavía._

## Dónde vive
- Código: `src/components/MunicipalLettersView.tsx` — función/componente `MunicipalLettersView()`, líneas 1-940


## Cómo editarlo
- `buildCanonicalPayload()` / `sha256Hex()` (líneas 70-107, fuera del componente): serialización determinística del documento y hash SHA-256 real vía `crypto.subtle.digest`. El mismo contenido produce siempre el mismo hash. Si agregas campos al documento, agrégalos también a la cadena canónica o la verificación dejará de ser significativa.
- `handleGenerate()` (async): calcula el hash sobre folio + tipo + nombre + CURP + domicilio + colonia + fecha ISO. Si `crypto.subtle` no está disponible (contexto no seguro), **no emite el documento** y muestra el error — no se fabrica un hash de reemplazo.
- El QR codifica la cadena en texto plano `NAYARIT-DEMO|<folio>|<hash>`. **No es una URL**: no existe ningún portal de verificación. No lo cambies por una URL sin que ese endpoint exista de verdad.
- `handleVerifyOnScreen()` recalcula el SHA-256 del contenido que está en el formulario y lo compara contra lo que pega la persona; falla y lo dice si no coincide, si el folio no corresponde o si el valor no tiene forma de SHA-256.
- `handleDownloadPDF()` imprime el hash real y la cadena del QR en el PDF, además del disclaimer en rojo.
- `startStressTest()` es una animación: todas las cifras se generan en el navegador con `Math.random()`. El texto del panel ya lo declara — no lo suavices.
- El folio (`MX-TEP-2026-######`) sigue siendo aleatorio y está documentado como consecutivo simulado: no hay libro de gobierno detrás.

## Pendientes
- **Revisión legal obligatoria antes de producción** de todos los textos de descargo del módulo (los del PDF, el encabezado del documento y el pie normativo). La redacción actual la escribió la auditoría técnica, no un área jurídica.
- El hash comprueba **integridad**, no **autenticidad** ni no repudio: sin una firma con llave de la autoridad o un registro publicado por el Ayuntamiento, cualquiera puede recalcular el mismo hash sobre un documento propio. No presentar el hash como equivalente a firma electrónica.
- No demostrar este módulo en vivo con nombres de funcionarias/os reales.
- Sigue sin conexión a RENAPO, SAT y PNT; todas las tarjetas de "Fuentes de Datos Abiertos" muestran "Sin conexión" y deben seguir así hasta que exista convenio.
