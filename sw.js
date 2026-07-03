const CACHE_NAME = 'feg-stage-pro-v30-rigging-spec-sheet';
const RUNTIME_CACHE = 'feg-stage-runtime-v30-rigging-spec-sheet';

const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './src/modules/AppVersion.js',
  './src/modules/ResponsiveStability.js',
  './assets/vendor/jspdf.umd.min.js',
  './assets/vendor/html2canvas.min.js',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png'
];

const OPTIONAL_ASSETS = [];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS)
        .then(() => cache.addAll(OPTIONAL_ASSETS).catch(() => null)))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys
        .filter(key => ![CACHE_NAME, RUNTIME_CACHE].includes(key))
        .map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const fresh = await fetch(request, { cache: 'no-store' });
    if (fresh && fresh.ok) cache.put('./index.html', fresh.clone());
    return fresh;
  } catch (error) {
    return (await cache.match('./index.html')) || (await cache.match('./')) || Response.error();
  }
}

async function cacheFirstWithRuntime(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && (response.ok || response.type === 'opaque')) {
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(cacheFirstWithRuntime(request));
});
