import React from "react";
import Moviecard from "../../components/MovieCard/Moviecard";
import { useFetch } from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import { useCustomParams } from "../../hooks/useCustomParams";
import SearchResults from "../Home/SearchResults";
import Loading from "../../utils/Loading";

const Bookmark = () => {
  const { token } = useAuth();
  const { data, error, loading, updateUI } = useFetch("/api/bookmark", token);
  const { userInput, filteredMovies } = useCustomParams(data);

  console.log(data);
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

export default Bookmark;
