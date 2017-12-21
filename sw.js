var Edition= 'minimal-pwa-0.0.1';

var cacheList = [
  '/',
  "index.html",
  "build/main.css",
  "build/vendor.js",
  "build/main.js",
  "src/images/icon.png"
]

self.addEventListener('install', function(e) {
    console.log('install')
    e.waitUntil(
        caches.open(cacheStorageKey).then(function(cache) {
            console.log('Adding to Cache:', cacheList)
            return cache.addAll(cacheList)
        }).then(function() {
            console.log('Skip waiting!')
            return self.skipWaiting()
        })
    )
})

self.addEventListener('activate', function(e) {
    console.log('activate')
    e.waitUntil(
        Promise.all(
            caches.keys().then(cacheNames => {
                return cacheNames.map(name => {
                    if (name !== cacheStorageKey) {
                        return caches.delete(name)
                    }
                })
            })
        ).then(() => {
            console.log('Clients claims.')
            return self.clients.claim()
        })
    )
})

self.addEventListener('fetch', function(e) {
    console.log('fetch')
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if (response != null) {
                console.log('Using cache for:', e.request.url)
                return response
            }
            console.log('Fallback to fetch:', e.request.url)
            return fetch(e.request.url)
        })
    )
})