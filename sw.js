const CACHE='amma-v20';
const ASSETS=['./','./index.html','./app.js','./manifest.json','./icon-192.png','./icon-512.png'];

self.addEventListener('install',e=>e.waitUntil(
  caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())
));

self.addEventListener('activate',e=>e.waitUntil(
  caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
));

self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  // Network-first for HTML pages (so updates propagate faster)
  if(e.request.mode==='navigate'||url.pathname.endsWith('.html')){
    e.respondWith(
      fetch(e.request).then(r=>{
        const rc=r.clone();
        caches.open(CACHE).then(c=>c.put(e.request,rc));
        return r;
      }).catch(()=>caches.match(e.request))
    );
  } else {
    // Cache-first for assets (JS, images, manifest)
    e.respondWith(
      caches.match(e.request).then(r=>r||fetch(e.request).then(nr=>{
        const rc=nr.clone();
        caches.open(CACHE).then(c=>c.put(e.request,rc));
        return nr;
      }))
    );
  }
});
