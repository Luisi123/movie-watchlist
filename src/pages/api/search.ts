import type { APIRoute } from 'astro';
import { searchMoviesByTitle } from '../../services/movieApi';

export const GET: APIRoute = async ({ url }) => {
    const query = url.searchParams.get('query');
    const page = parseInt(url.searchParams.get('page') || '1');

    if (!query) {
        return new Response(JSON.stringify({ error: 'Query parameter is required' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    try {
        const results = await searchMoviesByTitle(query, page);
        return new Response(JSON.stringify(results), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to search movies' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}; 