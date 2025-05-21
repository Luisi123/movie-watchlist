import { s as searchMoviesByTitle } from '../../chunks/movieApi_BTjl66Y-.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async ({ url }) => {
  const query = url.searchParams.get("query");
  const page = parseInt(url.searchParams.get("page") || "1");
  if (!query) {
    return new Response(JSON.stringify({ error: "Query parameter is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  try {
    const results = await searchMoviesByTitle(query, page);
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to search movies" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
