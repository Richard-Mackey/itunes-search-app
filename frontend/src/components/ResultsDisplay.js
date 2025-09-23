// results display section of app

import React, { useEffect } from "react";
import Image from "react-bootstrap/Image";

export default function ResultsDisplay({
  // props passed in results display
  searchResults,
  selectedMediaType,
  favourites,
  onAddFavourite,
  onRemoveFavourite,
}) {
  // converts date to readable format
  const formatReleaseDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  // allow results ot be filtered by their media type in the sidebar or dropdown on mobile
  const filterResultsByMediaType = (results, selectedType) => {
    const mediaTypeMapping = {
      music: ["song"],
      movie: ["feature-movie"],
      podcast: ["podcast"],
      music_video: ["music-video"],
      audiobook: ["audiobook"],
      TV_episode: ["tv-episode"],
      short_film: ["short-film"],
      Ebook: [undefined],
    };

    if (selectedType === "all") return results;

    const allowedValues = mediaTypeMapping[selectedType];

    if (!allowedValues) {
      return results;
    }

    return results.filter((result) => {
      if (selectedType === "Ebook") {
        // eBooks: wrapperType is 'audiobook' AND kind is undefined (from looking at the API results)
        return result.wrapperType === "audiobook" && result.kind === undefined;
      }
      if (selectedType === "audiobook") {
        // Audiobooks: kind is 'audiobook'
        return result.kind === "audiobook";
      }

      return (
        allowedValues.includes(result.kind) ||
        allowedValues.includes(result.wrapperType)
      );
    });
  };

  // Appication of the filter before rendering
  const filteredResults = filterResultsByMediaType(
    searchResults,
    selectedMediaType
  );

  return (
    <div className="container-fluid">
      <h2 className="display-6 text-center"></h2>
      <div className="row mt-1">
        {filteredResults.map((result) => (
          <div
            // responsive layout
            className="col-12 col-md-6 col-lg-4 col-xl-3 mb-2 text-center"
            key={result.trackId || result.collectionId || result.artistId}
          >
            <div className="card bg-white p-4 rounded shadow  d-flex flex-column h-100">
              <Image src={result.artworkUrl100} alt="Album artwork" thumbnail />
              <h5 className="mt-2">{result.artistName}</h5>
              <p>{result.collectionName}</p>
              <p>Released: {formatReleaseDate(result.releaseDate)}</p>

              <div className="mt-auto">
                <button
                  className="btn btn-link w-100"
                  type="button"
                  onClick={() => {
                    {
                      /* Check if the card is in favourites, and adjust 'add' or 'remove' from favourites */
                    }
                    const checkFavourites = favourites.some((favourite) => {
                      const favouriteId =
                        favourite.trackId ||
                        favourite.collectionId ||
                        favourite.artistId;
                      const resultId =
                        result.trackId ||
                        result.collectionId ||
                        result.artistId;
                      return favouriteId === resultId;
                    });

                    if (!checkFavourites) onAddFavourite(result);
                    else
                      onRemoveFavourite(
                        result.trackId || result.collectionId || result.artistId
                      );
                  }}
                >
                  {favourites.some((favourite) => {
                    const favouriteId =
                      favourite.trackId ||
                      favourite.collectionId ||
                      favourite.artistId;
                    const resultId =
                      result.trackId || result.collectionId || result.artistId;
                    return favouriteId === resultId;
                  })
                    ? "Remove from favourites"
                    : "Add to favourites"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
