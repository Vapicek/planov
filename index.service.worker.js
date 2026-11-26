// Pláňov: hra se přestěhovala na planov.cz/hra/.
// Tenhle soubor jen uklidí starou uloženou kopii hry z hlavní adresy, aby se ukázala nová úvodní stránka.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (event) {
  event.waitUntil((async function () {
    var keys = await caches.keys();
    await Promise.all(keys.filter(function (k) { return k.indexOf('Planov-sw-cache-') === 0; }).map(function (k) { return caches.delete(k); }));
    await self.registration.unregister();
    var all = await self.clients.matchAll({ type: 'window' });
    all.forEach(function (c) { c.navigate(c.url); });
  })());
});
