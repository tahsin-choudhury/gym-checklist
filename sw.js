/* Service worker: caches the app shell so the app works offline.
   Bump CACHE_VERSION whenever you edit any file below (data.js included)
   so installed copies pick up the change. */
const CACHE_VERSION = "gym-checklist-v4";

const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./data.js",
  "./app.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png"
];

self.addEventListener("install", (event) => {
  // cache: "reload" bypasses the browser HTTP cache, so a version bump always
  // pulls the freshly deployed files. GitHub Pages serves max-age=600, and
  // without this the new cache could be filled with up-to-10-minute-old copies.
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(
        APP_SHELL.map((url) => new Request(url, { cache: "reload" }))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* Cache-first for the shell, with a network fallback that refreshes the cache.
   Navigations fall back to the cached index.html when offline. */
self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === "basic") {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached || caches.match("./index.html"));
      return cached || network;
    })
  );
});
