import React from "react";
import Moviecard from "../../components/MovieCard/Moviecard";

const SearchResults = ({ userInput, filteredMovies }) => {
  return (
    <div className=" px-4 text-start">
      <h2 className="pb-2">
        Found {filteredMovies.length} results for '{userInput}'
      </h2>
      <div className="grid gap-3">
        {filteredMovies.map((movie) => {
          return <Moviecard key={movie._id} movie={movie} />;
        })}
      </div>
    </div>
  );
};

export default SearchResults;
