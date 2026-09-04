# ORBE P0 v0.2 — aceptación

P0 solo puede marcarse cerrado si simultáneamente:

1. existe una URL pública con Context.OS LAB accesible;
2. un caso bache/luminaria devuelve folio LAB y `evidenceId`;
3. los ocho casos `npm run test:orbe-p0-e2e` pasan en CI;
4. la UI declara permanentemente `LAB_MOCK`, `authority: NONE`, sin efecto administrativo y no resolución oficial;
5. `docs/orbe/canon/v0.1/MANIFEST.yaml` mantiene el snapshot contra `afb75910bc631d9714fd797cc950550f45f8c7b9`.

La existencia de código sin prueba no satisface estos criterios.
