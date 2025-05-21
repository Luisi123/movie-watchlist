import { e as createComponent, l as renderComponent, k as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_ojrlXbxq.mjs';
import 'kleur/colors';
import { b as $$MainLayout, $ as $$Header, a as $$Footer } from '../chunks/footer_BF694U-I.mjs';
/* empty css                                 */
/* empty css                                     */
export { renderers } from '../renderers.mjs';

const $$Watchlist = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "data-astro-cid-ylz2jmup": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="watchlist-section" data-astro-cid-ylz2jmup> <div class="container" data-astro-cid-ylz2jmup> <h1 class="watchlist-title" data-astro-cid-ylz2jmup>My Watchlist</h1> <div class="watchlist-stats" data-astro-cid-ylz2jmup> <span class="stat" data-astro-cid-ylz2jmup> <span class="stat-value" id="totalMovies" data-astro-cid-ylz2jmup>0</span> <span class="stat-label" data-astro-cid-ylz2jmup>Movies</span> </span> <span class="stat" data-astro-cid-ylz2jmup> <span class="stat-value" id="watchedMovies" data-astro-cid-ylz2jmup>0</span> <span class="stat-label" data-astro-cid-ylz2jmup>Watched</span> </span> </div> <div class="watchlist-filters" data-astro-cid-ylz2jmup> <div class="search-box" data-astro-cid-ylz2jmup> <input type="text" id="searchInput" placeholder="Search your watchlist..." data-astro-cid-ylz2jmup> </div> <div class="filter-buttons" data-astro-cid-ylz2jmup> <button class="filter-btn active" data-filter="all" data-astro-cid-ylz2jmup>All</button> <button class="filter-btn" data-filter="watched" data-astro-cid-ylz2jmup>Watched</button> <button class="filter-btn" data-filter="unwatched" data-astro-cid-ylz2jmup>Unwatched</button> </div> </div> </div> </section> <section class="movies-grid" data-astro-cid-ylz2jmup> <div class="container" data-astro-cid-ylz2jmup> <div class="grid" id="watchlistGrid" data-astro-cid-ylz2jmup> <!-- Movies will be loaded here --> </div> <div class="empty-state" id="emptyState" style="display: none;" data-astro-cid-ylz2jmup> <div class="empty-state-content" data-astro-cid-ylz2jmup> <h2 data-astro-cid-ylz2jmup>Your watchlist is empty</h2> <p data-astro-cid-ylz2jmup>Start adding movies to your watchlist to keep track of what you want to watch.</p> <a href="/search" class="btn primary" data-astro-cid-ylz2jmup>Browse Movies</a> </div> </div> <div class="error-message" id="errorMessage" style="display: none;" data-astro-cid-ylz2jmup> <p id="errorText" data-astro-cid-ylz2jmup></p> </div> </div> </section>  `, "footer": async ($$result2) => renderTemplate`${renderComponent($$result2, "Footer", $$Footer, { "slot": "footer", "data-astro-cid-ylz2jmup": true })}`, "header": async ($$result2) => renderTemplate`${renderComponent($$result2, "Header", $$Header, { "slot": "header", "data-astro-cid-ylz2jmup": true })}` })}  ${renderScript($$result, "C:/Users/USER/movie-watchlist/src/pages/watchlist.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/USER/movie-watchlist/src/pages/watchlist.astro", void 0);

const $$file = "C:/Users/USER/movie-watchlist/src/pages/watchlist.astro";
const $$url = "/watchlist";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Watchlist,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
