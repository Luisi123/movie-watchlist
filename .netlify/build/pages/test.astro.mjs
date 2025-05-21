import { e as createComponent, f as createAstro, m as maybeRenderHead, r as renderTemplate } from '../chunks/astro/server_ojrlXbxq.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Test = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Test;
  return renderTemplate`${maybeRenderHead()}<h1>Hello, Astro!</h1> <p>This is a test page.</p>`;
}, "C:/Users/USER/movie-watchlist/src/pages/test.astro", void 0);

const $$file = "C:/Users/USER/movie-watchlist/src/pages/test.astro";
const $$url = "/test";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Test,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
