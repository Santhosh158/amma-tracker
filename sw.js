/* Amma's Care — service worker
   Makes the app work offline after the first visit.
   IMPORTANT: when you update index.html, bump CACHE_VERSION below
   (e.g. v1 -> v2) so phones pull the new version. */
const CACHE_VERSION = "amma-care-v3";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-180.png"
];

// Install: pre-cache the app shell, activate immediately.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

// Activate: remove old caches, take control of open pages.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Google Fonts (cross-origin): cache-first so type works offline after first online load.
  if (url.origin === "https://fonts.googleapis.com" || url.origin === "https://fonts.gstatic.com") {
    event.respondWith(
      caches.open(CACHE_VERSION).then((cache) =>
        cache.match(req).then((hit) =>
          hit || fetch(req).then((res) => { cache.put(req, res.clone()); return res; }).catch(() => hit)
        )
      )
    );
    return;
  }

  // Same-origin app files: cache-first, fall back to network, then to cached index for navigations.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((hit) =>
        hit || fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
          return res;
        }).catch(() => {
          if (req.mode === "navigate") return caches.match("./index.html");
        })
      )
    );
  }
});
