// favourites section of app
import React from "react";
import ResultsDisplay from "./ResultsDisplay";

// display favourites, unless there are no favourites added,
export default function Favourites({ favourites, onRemoveFavourite }) {
  if (favourites.length === 0) {
    return "There are no results to display";
  }

  return (
    <ResultsDisplay
      searchResults={favourites}
      favourites={favourites}
      onRemoveFavourite={onRemoveFavourite}
    />
  );
}
