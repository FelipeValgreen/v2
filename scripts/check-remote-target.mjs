// El gate de navegador remoto debe apuntar al deployment que se quiere aprobar.
//
// Antes, qa:browser:remote caía por defecto en https://rinon-v2.vercel.app. Ese alias
// no sigue automáticamente a codex/rc7: llegó a servir un build anterior a 4edfd24
// mientras el preview de la branch ya tenía los arreglos, y la suite reportó fallas
// que no correspondían al código. Un gate que mide un build indeterminado no es un gate.

const base = process.env.RINON_PLAYWRIGHT_BASE_URL?.trim();

if (!base) {
  console.error("RINON REMOTE BROWSER QA: falta RINON_PLAYWRIGHT_BASE_URL.");
  console.error("Pasa explícitamente la URL del deployment a validar, no un alias:");
  console.error("  vercel ls rinon-v2");
  console.error("  RINON_PLAYWRIGHT_BASE_URL=https://<deployment>.vercel.app npm run qa:browser:remote");
  console.error("Motivo: rinon-v2.vercel.app puede estar sirviendo un build anterior al de la branch.");
  process.exit(1);
}

try {
  const url = new URL(base);
  if (url.protocol !== "https:") throw new Error("debe ser https");
} catch (error) {
  console.error(`RINON REMOTE BROWSER QA: RINON_PLAYWRIGHT_BASE_URL inválida (${base}): ${error.message}`);
  process.exit(1);
}

console.log(`RINON REMOTE BROWSER QA target: ${base}`);
