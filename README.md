# Taller de Mollier

![Licencia MIT](https://img.shields.io/badge/licencia-MIT-blue) ![Versión](https://img.shields.io/badge/versión-2.1-informational)

Aplicación libre para aprender a diseñar sistemas de refrigeración sobre el **diagrama de Mollier (log P–h)** real de diez refrigerantes: R-134a, R-600, R-290, R-448A, R-449A, R-717, R-410A, R-32, R-1234ze(E) y R-1233zd(E).

- **Práctica:** problemas al azar con retroalimentación, pistas y solución paso a paso.
- **Evaluación:** problemas sin ayuda, calificación sobre 10 y comprobante verificable.
- **Simulador:** ciclo interactivo con lector de estado y balance del compresor.
- **Instalable y sin conexión:** funciona en celular y computadora aunque no haya internet.
- **Registro para investigación:** errores tipificados por competencia, exportables a Excel o Google Sheets.

**Autor:** Juan Luis Hernández Méndez ([ORCID 0000-0002-5686-2887](https://orcid.org/0000-0002-5686-2887)) · Universidad Autónoma de Nayarit, Unidad Académica de Ciencias Básicas e Ingenierías, Programa Académico de Ingeniería Mecánica, Tepic, Nayarit, México.
**Licencia:** MIT (ver `LICENSE`). **Aplicación:** <https://juanl-droid.github.io/Taller-de-Mollier/>

## Cómo citar

Si usas el Taller de Mollier en docencia o investigación, cítalo así (también disponible en el botón **Cite this repository** de GitHub y en la app, al pie: *Créditos y cómo citar*):

**APA 7**
> Hernández Méndez, J. L. (2026). *Taller de Mollier: aplicación web para la práctica y evaluación del ciclo de refrigeración por compresión de vapor sobre diagramas presión–entalpía* (Versión 2.1) [Software]. Universidad Autónoma de Nayarit. https://juanl-droid.github.io/Taller-de-Mollier/

**BibTeX**
```bibtex
@software{hernandez2026mollier,
  author    = {Hernández Méndez, Juan Luis},
  title     = {{Taller de Mollier}: Aplicación web para la práctica y evaluación del ciclo de refrigeración por compresión de vapor sobre diagramas presión–entalpía},
  version   = {2.1},
  year      = {2026},
  publisher = {Universidad Autónoma de Nayarit},
  url       = {https://juanl-droid.github.io/Taller-de-Mollier/},
  license   = {MIT}
}
```

El DOI de arriba (*concept DOI*) siempre apunta a la versión más reciente; cada versión publicada tiene además su propio DOI en Zenodo.

---

## 1. Publicarla gratis en GitHub Pages (una sola vez)

1. Crea una cuenta gratuita en <https://github.com>.
2. Pulsa **New repository**, ponle un nombre (por ejemplo `taller-mollier`), márcalo como **Public** y créalo.
3. En el repositorio pulsa **Add file → Upload files** y arrastra **todo el contenido de esta carpeta** (index.html, sw.js, manifest.webmanifest, los íconos, LICENSE, README.md y la carpeta `docente`). Pulsa **Commit changes**.
4. Ve a **Settings → Pages**. En *Branch* elige **main** y la carpeta **/(root)**; guarda.
5. En uno o dos minutos aparece la dirección, del tipo `https://TU-USUARIO.github.io/taller-mollier/`. Esa es la aplicación: cualquiera puede abrirla e instalarla, sin cuenta.

Para actualizarla, vuelve a subir el `index.html` nuevo en el mismo repositorio; las apps instaladas se actualizan solas la siguiente vez que abren con internet.

## 2. Instalarla

- **Android (Chrome):** abre la dirección → menú ⋮ → **Instalar aplicación** (o «Agregar a la pantalla principal»).
- **iPhone (Safari):** abre la dirección → botón Compartir → **Agregar a inicio**.
- **Computadora (Chrome o Edge):** abre la dirección → ícono de instalar en la barra de direcciones.

Después de abrirla una vez con internet, funciona sin conexión.

## 3. Recibir los resultados automáticamente (opcional, para cada profesor)

Cada profesor puede conectar **su propia** hoja de Google; los resultados de sus estudiantes solo llegan a él.

1. Sube `docente/Taller_Mollier_Analisis.xlsx` a tu Google Drive, ábrelo y usa **Archivo → Guardar como Hojas de cálculo de Google**.
2. En esa hoja: **Extensiones → Apps Script**. Borra el contenido, pega todo `docente/Codigo.gs` y guarda.
3. **Implementar → Nueva implementación → Aplicación web**. Ejecutar como: **Yo**. Quién tiene acceso: **Cualquier usuario**. Autoriza los permisos (si aparece «Google no ha verificado esta app», entra en *Configuración avanzada* y continúa: el código es tuyo).
4. Copia la dirección que termina en **/exec**.
5. Abre la aplicación publicada → **Panel docente** (al pie) → *Recibir los resultados automáticamente* → pega la dirección /exec → **Generar enlace para estudiantes**.
6. Da ese enlace a tus estudiantes. Al abrirlo una vez, sus evaluaciones y prácticas llegan solas a las hojas **Datos_problemas**, **Datos_items** y **Comprobantes**, y el análisis se actualiza.

Si tu cuenta institucional no permite «Cualquier usuario», haz estos pasos con una cuenta personal de Gmail.

Sin este paso la app funciona igual: los estudiantes copian su comprobante y el profesor lo procesa en el Panel docente, que genera las filas para el Excel.

## 4. Créditos

Diseño didáctico, modelado y desarrollo: Juan Luis Hernández Méndez (Universidad Autónoma de Nayarit). Agradecimientos a los estudiantes de Ingeniería Mecánica de la UAN, cuya práctica y retroalimentación orientaron el diseño.

Si publicas resultados obtenidos con esta herramienta, cita también CoolProp: Bell, I. H., Wronski, J., Quoilin, S., & Lemort, V. (2014). *Industrial & Engineering Chemistry Research, 53*(6), 2498–2508. https://doi.org/10.1021/ie4033999


Propiedades termodinámicas generadas con **CoolProp** (licencia MIT), referencia IIR (h = 200 kJ/kg y s = 1 kJ/kg·K para líquido saturado a 0 °C). En R-448A y R-449A, T<sub>o</sub> y T<sub>k</sub> son temperaturas de rocío y la campana se calculó hasta unos 31 bar (límite del modelo de mezcla). Uso didáctico: verifica selecciones reales con el software del fabricante.
