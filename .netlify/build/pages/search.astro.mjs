import { e as createComponent, f as createAstro, m as maybeRenderHead, k as renderScript, h as addAttribute, r as renderTemplate, l as renderComponent } from '../chunks/astro/server_ojrlXbxq.mjs';
import 'kleur/colors';
import { $ as $$Header, a as $$Footer, b as $$MainLayout } from '../chunks/footer_BF694U-I.mjs';
import 'clsx';
/* empty css                                  */
import { s as searchMoviesByTitle, g as getPopularMovies } from '../chunks/movieApi_BTjl66Y-.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$MovieCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MovieCard;
  const { id, title, posterUrl, year, rating, showAddButton = false, apiBaseUrl } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="movie-card" data-astro-cid-y6otcn7o> <div class="poster-container" data-astro-cid-y6otcn7o> ${posterUrl ? renderTemplate`<img${addAttribute(posterUrl, "src")}${addAttribute(`${title} poster`, "alt")} class="poster" loading="lazy" onerror="this.src='/images/no-poster.jpg'" data-astro-cid-y6otcn7o>` : renderTemplate`<div class="no-poster" data-astro-cid-y6otcn7o> <span data-astro-cid-y6otcn7o>No Image</span> </div>`} <div class="rating" data-astro-cid-y6otcn7o>${rating !== void 0 ? rating.toFixed(1) : "N/A"}</div> </div> <div class="movie-info" data-astro-cid-y6otcn7o> <h3 class="title" data-astro-cid-y6otcn7o>${title}</h3> ${year !== void 0 && renderTemplate`<p class="year" data-astro-cid-y6otcn7o>${year}</p>`} ${showAddButton && renderTemplate`<button class="add-button"${addAttribute(id, "data-movie-id")}${addAttribute(apiBaseUrl, "data-api-base-url")}${addAttribute(title, "data-movie-title")}${addAttribute(posterUrl, "data-poster-url")} data-astro-cid-y6otcn7o>
Add to Watchlist
</button>`} </div> </div>  ${renderScript($$result, "C:/Users/USER/movie-watchlist/src/components/MovieCard.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/USER/movie-watchlist/src/components/MovieCard.astro", void 0);

const $$Astro = createAstro();
const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Search;
  const query = Astro2.url.searchParams.get("q") || "";
  let movies = [];
  let error = null;
  let totalResults = 0;
  let totalPages = 0;
  let currentPage = parseInt(Astro2.url.searchParams.get("page") || "1");
  try {
    if (query.trim()) {
      const searchResults = await searchMoviesByTitle(query.trim(), currentPage);
      if (searchResults && searchResults.results) {
        movies = searchResults.results;
        totalResults = searchResults.totalResults;
        totalPages = searchResults.totalPages;
      } else {
        throw new Error("No results found");
      }
    } else {
      const popularMovies = await getPopularMovies(currentPage);
      if (popularMovies && popularMovies.results) {
        movies = popularMovies.results;
        totalResults = popularMovies.totalResults;
        totalPages = popularMovies.totalPages;
      } else {
        throw new Error("Failed to load popular movies");
      }
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load movies. Please try again later.";
  }
  function generatePaginationLinks(currentPage2, totalPages2, query2) {
    const pages = [];
    pages.push(1);
    let startPage = Math.max(2, currentPage2 - 2);
    let endPage = Math.min(totalPages2 - 1, currentPage2 + 2);
    if (startPage > 2) {
      pages.push("...");
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (endPage < totalPages2 - 1) {
      pages.push("...");
    }
    if (totalPages2 > 1) {
      pages.push(totalPages2);
    }
    return pages;
  }
  generatePaginationLinks(currentPage, totalPages);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "data-astro-cid-ipsxrsrh": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="search-section" data-astro-cid-ipsxrsrh> <div class="container" data-astro-cid-ipsxrsrh> <h1 class="search-title" data-astro-cid-ipsxrsrh> ${query ? `Search Results for "${query}"` : "Discover Movies"} </h1> <form class="search-form" action="/search" method="get" id="searchForm" data-astro-cid-ipsxrsrh> <input type="text" name="q" placeholder="Search for movies..."${addAttribute(query, "value")} class="search-input" required minlength="1" data-astro-cid-ipsxrsrh> <button type="submit" class="search-button" data-astro-cid-ipsxrsrh>Search</button> </form> ${error && renderTemplate`<div class="error-message" data-astro-cid-ipsxrsrh> <p data-astro-cid-ipsxrsrh>Error: ${error}</p> <p data-astro-cid-ipsxrsrh>Please check your API key and try again.</p> </div>`} ${totalResults > 0 && renderTemplate`<p class="results-count" data-astro-cid-ipsxrsrh>Found ${totalResults} results</p>`} </div> </section> <section class="movies-grid" data-astro-cid-ipsxrsrh> <div class="container" data-astro-cid-ipsxrsrh> ${movies.length > 0 ? renderTemplate`<div class="grid" data-astro-cid-ipsxrsrh> ${movies.map((movie) => renderTemplate`${renderComponent($$result2, "MovieCard", $$MovieCard, { "id": movie.id, "title": movie.title, "posterUrl": movie.posterUrl, "year": movie.year, "rating": movie.rating, "showAddButton": true, "apiBaseUrl": "http://localhost:5002/api", "data-astro-cid-ipsxrsrh": true })}`)} </div>` : !error && renderTemplate`<div class="no-results" data-astro-cid-ipsxrsrh> <h2 data-astro-cid-ipsxrsrh>No movies found</h2> <p data-astro-cid-ipsxrsrh>Try adjusting your search terms or browse popular movies.</p> </div>`}  ${totalPages > 1 && renderTemplate`<div class="pagination" data-astro-cid-ipsxrsrh> <a${addAttribute(`/search?q=${encodeURIComponent(query)}&page=${Math.max(1, currentPage - 1)}`, "href")}${addAttribute(`pagination-link ${currentPage === 1 ? "disabled" : ""}`, "class")} data-astro-cid-ipsxrsrh>
Previous
</a> ${generatePaginationLinks(currentPage, totalPages).map(
    (page) => page === "..." ? renderTemplate`<span class="pagination-ellipsis" data-astro-cid-ipsxrsrh>...</span>` : renderTemplate`<a${addAttribute(`/search?q=${encodeURIComponent(query)}&page=${page}`, "href")}${addAttribute(`pagination-link ${page === currentPage ? "active" : ""}`, "class")} data-astro-cid-ipsxrsrh> ${page} </a>`
  )} <a${addAttribute(`/search?q=${encodeURIComponent(query)}&page=${Math.min(totalPages, currentPage + 1)}`, "href")}${addAttribute(`pagination-link ${currentPage === totalPages ? "disabled" : ""}`, "class")} data-astro-cid-ipsxrsrh>
Next
</a> </div>`} </div> </section>  `, "footer": async ($$result2) => renderTemplate`${renderComponent($$result2, "Footer", $$Footer, { "slot": "footer", "data-astro-cid-ipsxrsrh": true })}`, "header": async ($$result2) => renderTemplate`${renderComponent($$result2, "Header", $$Header, { "slot": "header", "data-astro-cid-ipsxrsrh": true })}` })}  ${renderScript($$result, "C:/Users/USER/movie-watchlist/src/pages/search.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/USER/movie-watchlist/src/pages/search.astro", void 0);

const $$file = "C:/Users/USER/movie-watchlist/src/pages/search.astro";
const $$url = "/search";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Search,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
