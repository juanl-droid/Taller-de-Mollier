/**
 * Taller de Mollier · aplicación web con registro automático en Google Sheets
 * Pega este código en: Extensiones → Apps Script (desde tu hoja «Taller_Mollier_Analisis»).
 * Implementa como «Aplicación web» (Ejecutar como: Yo · Acceso: Cualquier usuario) y copia la dirección /exec.
 * Esa dirección se pega en «Panel docente → Recibir los resultados automáticamente» de la app
 * para generar el enlace que se da a los estudiantes.
 * Opcional: si además subes taller-de-mollier.html a tu Drive, la propia dirección /exec muestra la app.
 */
const NOMBRE_HTML = 'taller-de-mollier.html';

function doGet() {
  const archivos = DriveApp.getFilesByName(NOMBRE_HTML);
  if (!archivos.hasNext()) {
    return HtmlService.createHtmlOutput('<p style="font-family:sans-serif">No encuentro el archivo <b>' + NOMBRE_HTML + '</b> en el Google Drive del profesor.</p>');
  }
  const html = archivos.next().getBlob().getDataAsString('UTF-8');
  return HtmlService.createHtmlOutput(html)
    .setTitle('Taller de Mollier')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/** Recibe los resultados enviados desde la app publicada (GitHub Pages u otro sitio). */
function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (!d || !Array.isArray(d.P) || !Array.isArray(d.I)) throw new Error('Datos incompletos');
    return ContentService.createTextOutput(JSON.stringify(guardar(d))).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  }
}

/** La aplicación llama a esta función al terminar una evaluación o al enviar la práctica. */
function guardar(d) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const ss = SpreadsheetApp.getActive();
    const hP = ss.getSheetByName('Datos_problemas');
    const hI = ss.getSheetByName('Datos_items');
    if (!hP || !hI) throw new Error('Faltan las hojas Datos_problemas o Datos_items.');
    escribir(hP, d.P || [], true);
    escribir(hI, d.I || [], false);
    const hC = ss.getSheetByName('Comprobantes') || ss.insertSheet('Comprobantes');
    hC.appendRow([new Date(), String(d.matricula || ''), d.modo === 'prueba' ? 'Evaluación' : 'Práctica', d.recibo || '']);
    return { ok: true, n: (d.P || []).length };
  } finally {
    lock.releaseLock();
  }
}

/** Última fila con dato en la columna A (las columnas auxiliares tienen fórmulas más abajo). */
function ultimaFila(hoja) {
  const v = hoja.getRange(1, 1, hoja.getMaxRows(), 1).getValues();
  for (let i = v.length - 1; i >= 0; i--) if (v[i][0] !== '' && v[i][0] !== null) return i + 1;
  return 1;
}

/** Inserta o reemplaza por id_registro (columna A): reenviar la misma práctica no duplica filas. */
function escribir(hoja, filas, esProblemas) {
  if (!filas.length) return;
  const ancho = filas[0].length;
  let ultima = ultimaFila(hoja);
  const ids = ultima > 1 ? hoja.getRange(2, 1, ultima - 1, 1).getValues().map(r => String(r[0])) : [];
  const grupos = [];
  filas.forEach(f => {
    const g = grupos[grupos.length - 1];
    if (g && g.id === String(f[0])) g.filas.push(f); else grupos.push({ id: String(f[0]), filas: [f] });
  });
  grupos.forEach(g => {
    const pos = ids.indexOf(g.id);
    if (pos >= 0) {
      hoja.getRange(pos + 2, 1, g.filas.length, ancho).setValues(g.filas);
    } else {
      const necesita = ultima + g.filas.length - hoja.getMaxRows();
      if (necesita > 0) hoja.insertRowsAfter(hoja.getMaxRows(), necesita + 200);
      hoja.getRange(ultima + 1, 1, g.filas.length, ancho).setValues(g.filas);
      if (esProblemas) extenderAuxiliar(hoja, ultima + 1, g.filas.length, ancho + 1);
      g.filas.forEach(() => ids.push(g.id));
      ultima += g.filas.length;
    }
  });
}

/** Copia la fórmula de la columna auxiliar (aux_indice_alumno) si la fila nueva no la tiene. */
function extenderAuxiliar(hoja, desde, n, col) {
  const rango = hoja.getRange(desde, col, n, 1);
  const f = rango.getFormulas();
  if (f.some(r => !r[0])) hoja.getRange(2, col).copyTo(rango);
}
