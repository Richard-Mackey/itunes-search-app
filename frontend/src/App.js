import React, { useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SearchForm from "./components/SearchForm";
import Favourites from "./components/Favourites";
import ResultsDisplay from "./components/ResultsDisplay";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

function AppContent() {
  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://itunes-search-app-ysx2.onrender.com"
      : "http://localhost:8000";
  const [searchResults, setSearchResults] = useState([]); // stores the array from the search of the API
  const [error, setError] = useState(""); // stores any error messages
  const [favourites, setFavourites] = useState([]); // stores users favourite items
  const [token, setToken] = useState(null); // stores the JWT for API calls
  const [isLoadingToken, setIsLoadingToken] = useState(true); // tracks whether the app is waiting for the token
  const [selectedMediaType, setSelectedMediaType] = useState("all"); // tracks which media type is being searched
  const [isSearching, setIsSearching] = useState(false); // tracks whether a search is currently in progress

  useEffect(() => {
    getToken();
  }, []);

  // gets a JWT token, and returns an error message if unsuccesful
  const getToken = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/token`);
      const newToken = response.data.token;
      setToken(newToken);
      setIsLoadingToken(false);
      return newToken;
    } catch (error) {
      setError("Failed to connect to server. Please refresh the page.");
      setIsLoadingToken(false);
      return null;
    }
  };

  // Function to make authenticated API calls
  const makeAuthenticatedRequest = async (url) => {
    let currentToken = token;

    // If no token, get one first
    if (!currentToken) {
      currentToken = await getToken();
      if (!currentToken) return null;
    }

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      return response;
    } catch (error) {
      // If token is invalid/expired, get a new one and retry
      if (error.response?.status === 403 || error.response?.status === 401) {
        currentToken = await getToken();
        if (currentToken) {
          // Retry with new token
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${currentToken}`,
            },
          });
          return response;
        }
      }
      throw error; // Re-throw if it's not a token issue
    }
  };

  // search handler function, puts a search request to the API and returns an error if no results were found
  const searchHandler = async (searchTerm) => {
    try {
      setIsSearching(true);
      setError("");
      setSearchResults([]);

      const response = await makeAuthenticatedRequest(
        `${API_BASE_URL}/search?term=${searchTerm}`
      );

      if (response) {
        const searchData = response.data.results;
        setSearchResults(searchData);
        if (searchData.length === 0) {
          setError(
            "No search results for that request. Please try searching for something else or look under 'All Media' for all results."
          );
        } else {
          setSearchResults(searchData);
        }
      }
    } catch (error) {
      setError(
        error.message || "No search results for that request. Please try again."
      );
    } finally {
      setIsSearching(false);
    }
  };

  // add to favourites function
  const addToFavourites = (item) => {
    const itemId = item.trackId || item.collectionId || item.artistId;

    if (
      !favourites.some((fav) => {
        const favId = fav.trackId || fav.collectionId || fav.artistId;
        return favId === itemId;
      })
    ) {
      setFavourites([...favourites, item]);
    }
  };

  // remove from favourites function
  const removeFromFavourites = (trackId) => {
    setFavourites(
      favourites.filter((fav) => {
        const favId = fav.trackId || fav.collectionId || fav.artistId; // Fixed order
        return favId !== trackId;
      })
    );
  };

  return (
    <div className="mt-4">
      <Navbar />
      <Sidebar
        selectedMediaType={selectedMediaType}
        onMediaTypeChange={setSelectedMediaType}
      />
      <div className="main-content">
        {/* renders pages in app*/}
        <Routes>
          {/* main search page in app*/}
          <Route
            path="/"
            element={
              <>
                <div className="text-center mt-4 mb-5">
                  <h1 className="fs-3 fs-md-1">iTunes Search App</h1>
                  <h3 className="fs-5 fs-md-3">
                    Search the iTunes library for your favourite content
                  </h3>
                </div>

                {isLoadingToken ? (
                  <div className="text-center">
                    <p>Connecting to server...</p>
                  </div>
                ) : (
                  <SearchForm
                    onSearch={searchHandler}
                    selectedMediaType={selectedMediaType}
                    onMediaTypeChange={setSelectedMediaType}
                  />
                )}
                {searchResults.length > 0 && (
                  <ResultsDisplay
                    searchResults={searchResults}
                    selectedMediaType={selectedMediaType}
                    favourites={favourites}
                    onAddFavourite={addToFavourites}
                    onRemoveFavourite={removeFromFavourites}
                  />
                )}
              </>
            }
          />
          {/* favourites page in app*/}
          <Route
            path="/favourites"
            element={
              <>
                <div className="text-center mt-4 mb-5">
                  <h1 className="fs-3 fs-md-1">My Favourites</h1>
                  <h3 className="fs-5 fs-md-3">Your saved iTunes content</h3>
                </div>
                <Favourites
                  favourites={favourites}
                  onRemoveFavourite={removeFromFavourites}
                />
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
export default App;
