const cacheName = 'weatherup-1';
const resourcesToPrecache = [
    '/',
    'index.html',
    'weather.css',
    'weather.js',
    'skycons.js',
];

self.addEventListener('install', (event) => {
    console.log('Service worker install event');
    event.waitUntil(
        caches.open(cacheName)
        .then((cache) => {
            return cache.addAll(resourcesToPrecache)
        })
    )
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request) || fetch(event.request)
    )
})