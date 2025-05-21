# Movie Watchlist Application

A modern web application for tracking, and discovering movies. Built with Astro, TypeScript, and a RESTful API backend.

### Core Features
- **Movie Discovery**: Browse popular movies and search for specific titles
- **Personal Watchlist**: Create and manage your personal movie collection
- **Watch Status Tracking**: Mark movies as watched/unwatched
- **Responsive Design**: Fully responsive interface for all devices
- **User Authentication**: Secure user registration and login system

### Advanced Features
- **Real-time Search**: Instant search results as you type
- **Pagination**: Navigate through large sets of movie results
- **Filtering**: Filter your watchlist by watched/unwatched status
- **Statistics**: Track your movie watching progress
- **Movie Details**: View comprehensive movie information including:
  - Title
  - Release Year
  - Rating
  - Poster Image
  - Added Date

## 🏗️ Architecture

### Frontend
- **Framework**: Astro
- **Styling**: CSS with modern features (Grid, Flexbox, CSS Variables)
- **State Management**: Local storage for authentication
- **API Integration**: RESTful API calls for movie data

### Backend
- **API Endpoints**:
  - `/api/watchlist`: Manage watchlist operations
  - `/api/movies`: Movie search and discovery
  - `/api/auth`: User authentication

## API Structure

### Authentication Endpoints
```typescript
// Register new user
POST /api/auth/register
Body: {
    username: string,
    email: string,
    password: string
}
Response: {
    token: string,
    userId: number
}

// Login user
POST /api/auth/login
Body: {
    email: string,
    password: string
}
Response: {
    token: string,
    userId: number
}
```

### Movie Endpoints
```typescript
// Search movies
GET /api/movies/search
Query Parameters: {
    query: string,
    page: number
}
Response: {
    results: Movie[],
    totalResults: number,
    totalPages: number
}

// Get popular movies
GET /api/movies/popular
Query Parameters: {
    page: number
}
Response: {
    results: Movie[],
    totalResults: number,
    totalPages: number
}

// Get movie details
GET /api/movies/{movieId}
Response: {
    id: number,
    title: string,
    posterUrl: string,
    year: string,
    rating: number,
    overview: string
}
```

### Watchlist Endpoints
```typescript
// Get user's watchlist
GET /api/watchlist
Query Parameters: {
    userId: number
}
Response: {
    id: number,
    movieTitle: string,
    posterUrl: string,
    watched: boolean,
    addedAt: string
}[]

// Add movie to watchlist
POST /api/watchlist
Body: {
    movieId: number,
    userId: number
}
Response: {
    id: number,
    movieTitle: string,
    posterUrl: string,
    watched: boolean,
    addedAt: string
}

// Update watch status
PUT /api/watchlist/{movieId}
Body: {
    watched: boolean
}
Response: {
    id: number,
    movieTitle: string,
    posterUrl: string,
    watched: boolean,
    addedAt: string
}

// Remove from watchlist
DELETE /api/watchlist/{movieId}
Response: {
    success: boolean
}
```

### Data Models

```typescript
interface User {
    id: number;
    username: string;
    email: string;
    passwordHash: string;
    createdAt: string;
}

interface Movie {
    id: number;
    title: string;
    posterUrl: string | null;
    year: string;
    rating: number;
    overview: string;
}

interface WatchlistItem {
    id: number;
    userId: number;
    movieId: number;
    movieTitle: string;
    posterUrl: string | null;
    watched: boolean;
    addedAt: string;
}

interface ApiResponse<T> {
    data?: T;
    error?: string;
    success: boolean;
}
```

### Error Handling
All API endpoints follow a consistent error response format:
```typescript
{
    success: false,
    error: string,
    statusCode: number
}
```

Common status codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Project Structure

```text
/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── MovieCard.astro
│   ├── layouts/         # Page layouts
│   │   └── MainLayout.astro
│   ├── pages/          # Application routes
│   │   ├── index.astro
│   │   ├── search.astro
│   │   └── watchlist.astro
│   ├── services/       # API services
│   │   └── movieApi.js
│   └── styles/         # Global styles
│       └── global.css
└── package.json
```

## Usage

### Movie Discovery
1. Visit the homepage to see popular movies
2. Use the search bar to find specific movies
3. Browse through paginated results

### Managing Your Watchlist
1. Click "Add to Watchlist" on any movie
2. Access your watchlist from the navigation menu
3. Use filters to view watched/unwatched movies
4. Mark movies as watched or remove them from your list

### User Account
1. Register a new account or login
2. Your watchlist is automatically synced
3. Track your movie watching progress

## Security

- JWT-based authentication
- Secure password hashing
- Protected API endpoints
- CORS configuration
- Input validation

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
