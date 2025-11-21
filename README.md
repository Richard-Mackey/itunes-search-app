# iTunes Search App

A full-stack web application that allows users to search the iTunes library for various media types including music, films, podcasts, audiobooks, and more. Users can save their favourite items for easy access later.

## Features

- **Multi-media search**: Search across music, films, podcasts, music videos, audiobooks, TV shows, short films, and eBooks
- **Responsive filtering**: Filter results by media type using a sidebar (desktop) or dropdown (mobile)
- **Favourites system**: Save and manage favourite items across sessions
- **Secure authentication**: JWT-based authentication for API requests
- **Responsive design**: Fully responsive interface built with Bootstrap
- **Real-time search**: Instant search results from the iTunes API

## Tech Stack

### Frontend

- React 18
- React Router DOM (client-side routing)
- Bootstrap 5 (UI framework)
- Axios (HTTP client)

### Backend

- Node.js
- Express.js
- JSON Web Tokens (JWT) for authentication
- Axios (external API requests)
- CORS (cross-origin resource sharing)

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Richard-Mackey/itunes-search-app
cd itunes-search-app
```

2. Install frontend dependencies:

```bash
npm install
```

3. Install backend dependencies:

```bash
cd server
npm install
```

## Environment Variables

Create a `.env` file in the server directory with the following:

```env
PORT=8000
JWT_SECRET=your_secret_key_here
```

Replace `your_secret_key_here` with a secure random string for JWT token generation.

## Running the Application

### Development Mode

1. Start the backend server:

```bash
cd server
node server.js
```

The server will run on `http://localhost:8000`

2. In a separate terminal, start the React frontend:

```bash
npm start
```

The frontend will run on `http://localhost:3000`

### Production Mode

The application is configured to run on Render with the following production URLs:

- Frontend: `https://itunes-search-app-2.onrender.com`
- Backend: `https://itunes-search-app-ysx2.onrender.com`

## Project Structure

```
itunes-search-app/
├── public/
│   ├── apple_logo.png
│   ├── apple_navbar.png
│   └── ...
├── src/
│   ├── components/
│   │   ├── Favourites.js        # Favourites page component
│   │   ├── Navbar.js            # Navigation bar
│   │   ├── ResultsDisplay.js    # Search results display
│   │   ├── SearchForm.js        # Search input form
│   │   ├── Sidebar.js           # Media type filter sidebar
│   │   └── Sidebar.css          # Sidebar styling
│   ├── App.js                   # Main application component
│   └── index.js                 # React entry point
├── server/
│   ├── middleware/
│   │   └── middleware_auth.js   # JWT authentication middleware
│   └── server.js                # Express backend server
└── README.md
```

## How It Works

### Authentication Flow

1. On application load, the frontend requests a JWT token from the backend
2. The token is stored in state and included in all subsequent API requests
3. If a token expires (1-hour validity), a new one is automatically requested

### Search Flow

1. User enters a search term and selects a media type filter
2. Frontend sends authenticated request to backend
3. Backend forwards request to iTunes API
4. Results are filtered by media type and displayed
5. Users can add items to favourites, which persist in local state

### Media Type Filtering

The application maps iTunes API response types to user-friendly categories:

- **Music**: Songs
- **Films**: Feature films
- **Podcasts**: Podcast episodes
- **Music Videos**: Music video content
- **Audiobooks**: Audiobook content
- **TV Shows**: TV episodes
- **Short Films**: Short film content
- **eBooks**: Electronic books

## API Integration

This application uses the [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html) to fetch media content.

Example API endpoint structure:

```
https://itunes.apple.com/search?term={searchTerm}&entity={mediaType}
```

## Security Considerations

- JWT tokens expire after 1 hour for enhanced security
- CORS is configured to only allow requests from specified origins
- Environment variables are used for sensitive configuration
- Token verification is enforced via middleware on all search endpoints

## Future Enhancements

- Persistent favourites using local storage or a database
- User authentication system for personalised favourites
- Preview functionality for media items
- Advanced search filters (genre, price range, release date)
- Pagination for large result sets
