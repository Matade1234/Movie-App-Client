import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import Moviecard from "../../components/MovieCard/Moviecard";
import { useCustomParams } from "../../hooks/useCustomParams";
import Loading from "../../utils/Loading";

const Movies = () => {
  const { data, error, loading, updateUI } = useFetch("/api/movie");
  const { userInput, filteredMovies } = useCustomParams(data);
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (userInput) {
    return (
      <SearchResults userInput={userInput} filteredMovies={filteredMovies} />
    );
  }

  return (
    <div className="grid gap-3 mx-4 text-start">
      {data.map((movie) => {
        return <Moviecard key={movie._id} movie={movie} updateUI={updateUI} />;
      })}
    </div>
  );
};

export default Movies;
