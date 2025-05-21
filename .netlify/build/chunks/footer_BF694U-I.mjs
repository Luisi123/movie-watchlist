import { e as createComponent, f as createAstro, n as renderHead, o as renderSlot, r as renderTemplate, m as maybeRenderHead, k as renderScript } from './astro/server_ojrlXbxq.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro();
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title = "Movie Watchlist" } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><link rel="stylesheet" href="/src/styles/global.css">${renderHead()}</head> <body> <header> ${renderSlot($$result, $$slots["header"])} </header> <main> ${renderSlot($$result, $$slots["default"])} </main> <footer> ${renderSlot($$result, $$slots["footer"])} </footer> </body></html>`;
}, "C:/Users/USER/movie-watchlist/src/layouts/MainLayout.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="header" data-astro-cid-hpnw4vwy> <div class="container" data-astro-cid-hpnw4vwy> <a href="/" class="logo" data-astro-cid-hpnw4vwy>MovieWatchlist</a> <nav class="nav" data-astro-cid-hpnw4vwy> <a href="/" class="nav-link" data-astro-cid-hpnw4vwy>Home</a> <a href="/search" class="nav-link" data-astro-cid-hpnw4vwy>Search</a> <a href="/watchlist" class="nav-link" data-astro-cid-hpnw4vwy>My Watchlist</a> <div class="auth-buttons" data-astro-cid-hpnw4vwy> <a href="/signup" class="btn secondary" id="signupBtn" data-astro-cid-hpnw4vwy>Sign Up</a> <a href="/signup" class="btn primary" id="loginBtn" data-astro-cid-hpnw4vwy>Login</a> <button class="btn secondary" id="logoutBtn" style="display: none;" data-astro-cid-hpnw4vwy>Logout</button> </div> </nav> </div> </header>  ${renderScript($$result, "C:/Users/USER/movie-watchlist/src/components/header.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/USER/movie-watchlist/src/components/header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="site-footer" data-astro-cid-k2f5zb5c> <div class="container" data-astro-cid-k2f5zb5c> <div class="footer-content" data-astro-cid-k2f5zb5c> <div class="footer-section" data-astro-cid-k2f5zb5c> <h3 data-astro-cid-k2f5zb5c>Movie Watchlist</h3> <p data-astro-cid-k2f5zb5c>Your personal movie tracking companion</p> </div> <div class="footer-section" data-astro-cid-k2f5zb5c> <h4 data-astro-cid-k2f5zb5c>Quick Links</h4> <ul data-astro-cid-k2f5zb5c> <li data-astro-cid-k2f5zb5c><a href="/" data-astro-cid-k2f5zb5c>Home</a></li> <li data-astro-cid-k2f5zb5c><a href="/search" data-astro-cid-k2f5zb5c>Search Movies</a></li> <li data-astro-cid-k2f5zb5c><a href="/watchlist" data-astro-cid-k2f5zb5c>My Watchlist</a></li> <li data-astro-cid-k2f5zb5c><a href="/Signup" data-astro-cid-k2f5zb5c>Sign In</a></li> </ul> </div> <div class="footer-section" data-astro-cid-k2f5zb5c> <h4 data-astro-cid-k2f5zb5c>Connect</h4> <ul data-astro-cid-k2f5zb5c> <li data-astro-cid-k2f5zb5c><a href="#" data-astro-cid-k2f5zb5c>About Us</a></li> <li data-astro-cid-k2f5zb5c><a href="#" data-astro-cid-k2f5zb5c>Contact</a></li> <li data-astro-cid-k2f5zb5c><a href="#" data-astro-cid-k2f5zb5c>Privacy Policy</a></li> <li data-astro-cid-k2f5zb5c><a href="#" data-astro-cid-k2f5zb5c>Terms of Service</a></li> </ul> </div> </div> <div class="footer-bottom" data-astro-cid-k2f5zb5c> <p data-astro-cid-k2f5zb5c>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Movie Watchlist. All rights reserved.</p> </div> </div> </footer> `;
}, "C:/Users/USER/movie-watchlist/src/components/footer.astro", void 0);

export { $$Header as $, $$Footer as a, $$MainLayout as b };
