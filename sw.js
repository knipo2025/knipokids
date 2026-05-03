// KNIPO Kids — Service Worker pour mode hors-ligne complet
const CACHE_NAME = 'knipo-kids-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Nunito:wght@400;700&display=swap'
];

// Installation : pré-cache les assets critiques
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS).catch(()=>{}))
  );
  self.skipWaiting();
});

// Activation : nettoyer les vieux caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch : Cache-first pour fonctionnement hors-ligne total
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        // Cache la réponse pour la prochaine fois
        if (response && response.status === 200 && response.type === 'basic') {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, cloned));
        }
        return response;
      }).catch(() => {
        // Fallback : si HTML demandé et offline, renvoyer index.html
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});
