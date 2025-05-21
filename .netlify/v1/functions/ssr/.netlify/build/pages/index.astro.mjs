import { e as createComponent, l as renderComponent, k as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_ojrlXbxq.mjs';
import 'kleur/colors';
import { b as $$MainLayout, $ as $$Header, a as $$Footer } from '../chunks/footer_BF694U-I.mjs';
import { g as getPopularMovies } from '../chunks/movieApi_BTjl66Y-.mjs';
/* empty css                                 */
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const popularMovies = await getPopularMovies(1);
  const featuredMovies = popularMovies.results.slice(0, 8);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="hero" data-astro-cid-j7pv25f6> <div class="hero-content" data-astro-cid-j7pv25f6> <h1 data-astro-cid-j7pv25f6>Track, Rate, and Discover Movies</h1> <p data-astro-cid-j7pv25f6>Build your personal watchlist and get AI-powered recommendations based on your taste</p> <div class="cta-buttons" data-astro-cid-j7pv25f6> <a href="/signup" class="btn primary" data-astro-cid-j7pv25f6>Get Started</a> <a href="/search" class="btn secondary" data-astro-cid-j7pv25f6>Explore Movies</a> </div> </div> </section> <section class="features" data-astro-cid-j7pv25f6> <div class="feature" data-astro-cid-j7pv25f6> <div class="feature-icon" data-astro-cid-j7pv25f6>📋</div> <h2 data-astro-cid-j7pv25f6>Track Your Movies</h2> <p data-astro-cid-j7pv25f6>Create and manage your personal watchlist with ease.</p> </div> <div class="feature" data-astro-cid-j7pv25f6> <div class="feature-icon" data-astro-cid-j7pv25f6>⭐</div> <h2 data-astro-cid-j7pv25f6>Rate & Review</h2> <p data-astro-cid-j7pv25f6>Share your thoughts and ratings on films you've watched.</p> </div> <div class="feature" data-astro-cid-j7pv25f6> <div class="feature-icon" data-astro-cid-j7pv25f6>🤖</div> <h2 data-astro-cid-j7pv25f6>Smart Recommendations</h2> <p data-astro-cid-j7pv25f6>Get personalized movie suggestions powered by AI.</p> </div> </section> <section class="featured" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Featured Movies</h2> <div class="carousel-container" data-astro-cid-j7pv25f6> <button class="carousel-button prev" aria-label="Previous slide" data-astro-cid-j7pv25f6>❮</button> <div class="movie-carousel" data-astro-cid-j7pv25f6> <div class="movie-track" data-astro-cid-j7pv25f6> ${featuredMovies.map((movie) => renderTemplate`<div class="movie-card" data-astro-cid-j7pv25f6> <div class="movie-poster" data-astro-cid-j7pv25f6> <img${addAttribute(movie.posterUrl || "https://via.placeholder.com/300x450?text=No+Image", "src")}${addAttribute(movie.title, "alt")} data-astro-cid-j7pv25f6> </div> <div class="movie-info" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>${movie.title}</h3> <div class="movie-meta" data-astro-cid-j7pv25f6> <span class="year" data-astro-cid-j7pv25f6>${movie.year}</span> <span class="rating" data-astro-cid-j7pv25f6>⭐ ${movie.rating}</span> </div> </div> </div>`)} </div> </div> <button class="carousel-button next" aria-label="Next slide" data-astro-cid-j7pv25f6>❯</button> <div class="carousel-dots" data-astro-cid-j7pv25f6> ${featuredMovies.slice(0, Math.max(0, featuredMovies.length - 3)).map((movie, index) => renderTemplate`<button class="dot"${addAttribute(`Go to slide ${index + 1}`, "aria-label")} data-astro-cid-j7pv25f6></button>`)} </div> </div> <div class="view-more" data-astro-cid-j7pv25f6> <a href="/search" class="btn secondary" data-astro-cid-j7pv25f6>View More Movies</a> </div> </section>  `, "footer": async ($$result2) => renderTemplate`${renderComponent($$result2, "Footer", $$Footer, { "slot": "footer", "data-astro-cid-j7pv25f6": true })}`, "header": async ($$result2) => renderTemplate`${renderComponent($$result2, "Header", $$Header, { "slot": "header", "data-astro-cid-j7pv25f6": true })}` })}  ${renderScript($$result, "C:/Users/USER/movie-watchlist/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/USER/movie-watchlist/src/pages/index.astro", void 0);

const $$file = "C:/Users/USER/movie-watchlist/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
