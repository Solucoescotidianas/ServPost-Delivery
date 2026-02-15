const CACHE_NAME = 'servipost-v4';
const assets = [
  './index.html',
  './manifest.json',
  './icon-512.png'
];

// Instalación: Guarda los archivos en la memoria del móvil
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Activación: Limpia cachés antiguas
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
});

// Estrategia: Cargar de caché primero, luego red (para modo offline)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
