if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const c=e=>i(e,o),l={module:{uri:o},exports:t,require:c};s[o]=Promise.all(n.map((e=>l[e]||c(e)))).then((e=>(r(...e),t)))}}define(["./workbox-08b47157"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/Alibaba-Bold-BjMJTvpu.woff2",revision:null},{url:"assets/Alibaba-Regular-CbtUYRy0.woff2",revision:null},{url:"assets/index-CzqREEpB.css",revision:null},{url:"assets/index-DgBLjIRM.js",revision:null},{url:"icon-512.png",revision:"80942c474b6bda65b0f03abd966e101e"},{url:"icon.png",revision:"adfd435832ce9bf18a7870b418b8d79e"},{url:"index.html",revision:"e52c4514c4ffff1e24afdd23f6e6d0d3"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"service-worker.js",revision:"8f80c23ac266fbc76375a4e5a2cd75ca"},{url:"icon.png",revision:"adfd435832ce9bf18a7870b418b8d79e"},{url:"icon-512.png",revision:"80942c474b6bda65b0f03abd966e101e"},{url:"manifest.webmanifest",revision:"007b504444cd88587f0710cf5e6f5fb3"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute((({request:e})=>"image"===e.destination),new e.CacheFirst({cacheName:"images",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute((({request:e})=>"script"===e.destination||"style"===e.destination),new e.NetworkFirst({cacheName:"assets",plugins:[new e.ExpirationPlugin({maxEntries:20,maxAgeSeconds:604800})]}),"GET")}));