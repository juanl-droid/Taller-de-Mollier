// Taller de Mollier · service worker: funciona sin conexión y se actualiza solo.
const VERSION = 'mollier-v3';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;                       // los envíos de resultados van directo a la red
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    // la página: red primero (para recibir actualizaciones) y copia guardada si no hay conexión
    if (req.mode === 'navigate') {
      e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(VERSION).then(c => c.put('./index.html', cp)); return r; })
        .catch(() => caches.match('./index.html')));
      return;
    }
    e.respondWith(caches.match(req, { ignoreSearch: true }).then(m => m || fetch(req)));
    return;
  }
  if (url.hostname.endsWith('fonts.googleapis.com') || url.hostname.endsWith('fonts.gstatic.com')) {
    e.respondWith(caches.open(VERSION).then(c => c.match(req).then(m => m || fetch(req).then(r => { c.put(req, r.clone()); return r; }))));
  }
});
