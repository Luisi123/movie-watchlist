import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { p as NOOP_MIDDLEWARE_HEADER, q as decodeKey } from './chunks/astro/server_ojrlXbxq.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/USER/movie-watchlist/","cacheDir":"file:///C:/Users/USER/movie-watchlist/node_modules/.astro/","outDir":"file:///C:/Users/USER/movie-watchlist/dist/","srcDir":"file:///C:/Users/USER/movie-watchlist/src/","publicDir":"file:///C:/Users/USER/movie-watchlist/public/","buildClientDir":"file:///C:/Users/USER/movie-watchlist/dist/","buildServerDir":"file:///C:/Users/USER/movie-watchlist/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/search","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/search\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/search.ts","pathname":"/api/search","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CBH18QQk.css"},{"type":"inline","content":".movie-card[data-astro-cid-y6otcn7o]{background:#1a1a1a;border-radius:8px;overflow:hidden;transition:transform .3s ease;position:relative}.movie-card[data-astro-cid-y6otcn7o]:hover{transform:translateY(-5px)}.poster-container[data-astro-cid-y6otcn7o]{position:relative;padding-top:150%;background:#2d2d2d}.poster[data-astro-cid-y6otcn7o]{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover}.no-poster[data-astro-cid-y6otcn7o]{position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#2d2d2d;color:#666}.rating[data-astro-cid-y6otcn7o]{position:absolute;top:10px;right:10px;background:#000c;color:#fff;padding:4px 8px;border-radius:4px;font-size:.9rem}.movie-info[data-astro-cid-y6otcn7o]{padding:1rem}.title[data-astro-cid-y6otcn7o]{margin:0;font-size:1rem;color:#fff;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.year[data-astro-cid-y6otcn7o]{margin:.5rem 0;color:#888;font-size:.9rem}.add-button[data-astro-cid-y6otcn7o]{width:100%;padding:.5rem;background:#e94560;color:#fff;border:none;border-radius:4px;cursor:pointer;transition:all .3s ease;font-weight:500}.add-button[data-astro-cid-y6otcn7o]:hover{background:#d13652}.add-button[data-astro-cid-y6otcn7o]:disabled{background:#4caf50;cursor:not-allowed}.add-button[data-astro-cid-y6otcn7o].added{background:#4caf50}.search-section[data-astro-cid-ipsxrsrh]{background-color:#f8f9fa;padding:3rem 0;text-align:center}.search-title[data-astro-cid-ipsxrsrh]{margin-bottom:1.5rem;color:#333}.search-form[data-astro-cid-ipsxrsrh]{display:flex;max-width:600px;margin:0 auto;gap:.5rem}.search-input[data-astro-cid-ipsxrsrh]{flex-grow:1;padding:.8rem 1rem;border:2px solid #ddd;border-radius:4px;font-size:1rem;transition:border-color .3s ease}.search-input[data-astro-cid-ipsxrsrh]:focus{outline:none;border-color:#e94560}.search-button[data-astro-cid-ipsxrsrh]{background-color:#e94560;color:#fff;border:none;border-radius:4px;padding:.8rem 1.5rem;cursor:pointer;transition:background-color .3s ease;font-weight:600}.search-button[data-astro-cid-ipsxrsrh]:hover{background-color:#d13652}.search-button[data-astro-cid-ipsxrsrh]:disabled{background-color:#ccc;cursor:not-allowed}.results-count[data-astro-cid-ipsxrsrh]{margin-top:1rem;color:#666;font-size:1.1rem}.movies-grid[data-astro-cid-ipsxrsrh]{padding:3rem 0}.grid[data-astro-cid-ipsxrsrh]{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:2rem;padding:1rem 0}.no-results[data-astro-cid-ipsxrsrh]{text-align:center;margin-top:2rem;color:#555}.error-message[data-astro-cid-ipsxrsrh]{background-color:#f8d7da;color:#721c24;padding:1rem;border-radius:4px;margin:2rem auto;max-width:800px}.pagination[data-astro-cid-ipsxrsrh]{display:flex;justify-content:center;margin-top:2rem;gap:.5rem;flex-wrap:wrap}.pagination-link[data-astro-cid-ipsxrsrh]{display:inline-block;padding:.5rem 1rem;border:1px solid #ddd;border-radius:4px;text-decoration:none;color:#333;transition:background-color .3s ease}.pagination-link[data-astro-cid-ipsxrsrh]:hover{background-color:#eee}.pagination-link[data-astro-cid-ipsxrsrh].active{background-color:#e94560;color:#fff;border-color:#e94560}.pagination-link[data-astro-cid-ipsxrsrh].disabled{opacity:.5;pointer-events:none;cursor:not-allowed}.pagination-ellipsis[data-astro-cid-ipsxrsrh]{display:inline-block;padding:.5rem 0;color:#555}.container[data-astro-cid-ipsxrsrh]{width:90%;max-width:1200px;margin:0 auto}@media (max-width: 768px){.search-form[data-astro-cid-ipsxrsrh]{flex-direction:column;gap:.5rem;padding:0 1rem}.search-input[data-astro-cid-ipsxrsrh],.search-button[data-astro-cid-ipsxrsrh]{border-radius:4px}.grid[data-astro-cid-ipsxrsrh]{grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:1rem}}\n"}],"routeData":{"route":"/search","isIndex":false,"type":"page","pattern":"^\\/search\\/?$","segments":[[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/search.astro","pathname":"/search","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/signup.C4vWDEVX.css"}],"routeData":{"route":"/signup","isIndex":false,"type":"page","pattern":"^\\/signup\\/?$","segments":[[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signup.astro","pathname":"/signup","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/test","isIndex":false,"type":"page","pattern":"^\\/test\\/?$","segments":[[{"content":"test","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/test.astro","pathname":"/test","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CBH18QQk.css"},{"type":"external","src":"/_astro/watchlist.DXuT4wln.css"}],"routeData":{"route":"/watchlist","isIndex":false,"type":"page","pattern":"^\\/watchlist\\/?$","segments":[[{"content":"watchlist","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/watchlist.astro","pathname":"/watchlist","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CBH18QQk.css"},{"type":"external","src":"/_astro/index.CjIDSkQc.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/USER/movie-watchlist/src/pages/signup.astro",{"propagation":"none","containsHead":true}],["C:/Users/USER/movie-watchlist/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/USER/movie-watchlist/src/pages/search.astro",{"propagation":"none","containsHead":true}],["C:/Users/USER/movie-watchlist/src/pages/watchlist.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/api/search@_@ts":"pages/api/search.astro.mjs","\u0000@astro-page:src/pages/search@_@astro":"pages/search.astro.mjs","\u0000@astro-page:src/pages/signup@_@astro":"pages/signup.astro.mjs","\u0000@astro-page:src/pages/test@_@astro":"pages/test.astro.mjs","\u0000@astro-page:src/pages/watchlist@_@astro":"pages/watchlist.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CMF--pIQ.mjs","C:/Users/USER/movie-watchlist/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","C:/Users/USER/movie-watchlist/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BUFcBiMd.mjs","@astrojs/svelte/client.js":"_astro/client.svelte.C1D4sTT2.js","C:/Users/USER/movie-watchlist/src/pages/search.astro?astro&type=script&index=0&lang.ts":"_astro/search.astro_astro_type_script_index_0_lang.BFfPZDt7.js","C:/Users/USER/movie-watchlist/src/pages/watchlist.astro?astro&type=script&index=0&lang.ts":"_astro/watchlist.astro_astro_type_script_index_0_lang.CDf8yi9G.js","C:/Users/USER/movie-watchlist/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.3Hu9fllg.js","C:/Users/USER/movie-watchlist/src/components/header.astro?astro&type=script&index=0&lang.ts":"_astro/header.astro_astro_type_script_index_0_lang.3k-VnNQu.js","C:/Users/USER/movie-watchlist/src/components/MovieCard.astro?astro&type=script&index=0&lang.ts":"_astro/MovieCard.astro_astro_type_script_index_0_lang.EwyuYUVo.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/USER/movie-watchlist/src/pages/search.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const e=document.getElementById(\"searchForm\"),t=e?.querySelector(\".search-input\");e&&t&&e instanceof HTMLFormElement&&t instanceof HTMLInputElement&&(t.focus(),e.addEventListener(\"submit\",async r=>{r.preventDefault();const n=t.value.trim();if(!n)return;const o=`/search?q=${encodeURIComponent(n)}`;window.history.pushState({},\"\",o),window.location.href=o}))});"],["C:/Users/USER/movie-watchlist/src/pages/index.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const i=document.querySelector(\".movie-track\"),c=document.querySelector(\".carousel-button.prev\"),r=document.querySelector(\".carousel-button.next\"),s=document.querySelectorAll(\".dot\"),a=document.querySelectorAll(\".movie-card\");if(!i||!c||!r)return;let t=0;const l=250,u=32,m=window.innerWidth>768?4:window.innerWidth>480?3:2,d=Math.max(0,a.length-m);function e(){const n=t*(l+u);i.style.transform=`translateX(-${n}px)`,s.forEach((o,w)=>{o.classList.toggle(\"active\",w===t)}),c.style.opacity=t===0?\"0.5\":\"1\",r.style.opacity=t>=d?\"0.5\":\"1\",c.style.pointerEvents=t===0?\"none\":\"auto\",r.style.pointerEvents=t>=d?\"none\":\"auto\"}c.addEventListener(\"click\",()=>{t>0&&(t--,e())}),r.addEventListener(\"click\",()=>{t<d&&(t++,e())}),s.forEach((n,o)=>{n.addEventListener(\"click\",()=>{t=Math.min(o,d),e()})}),e(),window.addEventListener(\"resize\",()=>{const n=window.innerWidth>768?4:window.innerWidth>480?3:2,o=Math.max(0,a.length-n);t=Math.min(t,o),e()})});"],["C:/Users/USER/movie-watchlist/src/components/header.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const o=localStorage.getItem(\"token\"),t=document.getElementById(\"signupBtn\"),n=document.getElementById(\"loginBtn\"),e=document.getElementById(\"logoutBtn\");o?(t&&(t.style.display=\"none\"),n&&(n.style.display=\"none\"),e&&(e.style.display=\"block\")):(t&&(t.style.display=\"block\"),n&&(n.style.display=\"block\"),e&&(e.style.display=\"none\")),e&&e.addEventListener(\"click\",()=>{localStorage.removeItem(\"token\"),localStorage.removeItem(\"user\"),window.location.href=\"/\"})});"],["C:/Users/USER/movie-watchlist/src/components/MovieCard.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{document.querySelectorAll(\".add-button\").forEach(c=>{c.addEventListener(\"click\",async o=>{o.preventDefault();const a=o.currentTarget.dataset.movieId,n=o.currentTarget.dataset.apiBaseUrl,u=o.currentTarget.dataset.movieTitle,g=o.currentTarget.dataset.posterUrl;if(!a||!n){console.error(\"Missing required data:\",{movieId:a,apiBaseUrl:n});return}const e=o.currentTarget;e.disabled=!0;const m=e.textContent;e.textContent=\"Adding...\";try{const t=localStorage.getItem(\"token\");if(!t){window.location.href=\"/signup\";return}const s=JSON.parse(atob(t.split(\".\")[1])),i=parseInt(s[\"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier\"]);if(!i||isNaN(i)){localStorage.removeItem(\"token\"),window.location.href=\"/signup\";return}const l={userId:i,movieId:parseInt(a),movieTitle:u,posterUrl:g||null};console.log(\"Sending request with data:\",l);const d=await fetch(`${n}/watchlist`,{method:\"POST\",headers:{\"Content-Type\":\"application/json\",Authorization:`Bearer ${t}`},body:JSON.stringify(l)});let r;try{r=await d.json(),console.log(\"Server response:\",r)}catch(p){throw console.error(\"Error parsing server response:\",p),new Error(\"Server returned an invalid response. Please try again.\")}if(!d.ok){if(d.status===400){if(r.message===\"User not found\"){localStorage.removeItem(\"token\"),window.location.href=\"/signup\";return}throw new Error(r.message||\"Failed to add movie to watchlist\")}throw new Error(r.message||\"Failed to add movie to watchlist\")}e&&e.isConnected?(e.textContent=\"Added to Watchlist\",e.classList.add(\"added\")):alert(\"Movie added to watchlist successfully!\")}catch(t){console.error(\"Error adding movie to watchlist:\",t);const s=t instanceof Error?t.message:\"Failed to add movie to watchlist. Please try again.\";alert(s),e&&e.isConnected&&(e.disabled=!1,e.textContent=m)}})})});"]],"assets":["/_astro/index.CjIDSkQc.css","/_astro/index.CBH18QQk.css","/_astro/signup.C4vWDEVX.css","/_astro/watchlist.DXuT4wln.css","/images/no-poster.jpg","/scripts/form.js","/_astro/client.svelte.C1D4sTT2.js","/_astro/watchlist.astro_astro_type_script_index_0_lang.CDf8yi9G.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"SP2WpyBQf8fxWMJ5C7I3GxPvDDzzjVCFwAkaNGxrJco=","sessionConfig":{"driver":"fs-lite","options":{"base":"C:\\Users\\USER\\movie-watchlist\\node_modules\\.astro\\sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
