self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('BeFasterCache')
            .then(function (cache) {
                return cache.addAll([
                    '/',
                    '/index.html',
                    '/css/styles.css',
                    '/js/script.js',
                    '/database/db.json',
                    '/src/pages/shop/shop.html',
                ]);
            })
    );
});
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
    );
});
