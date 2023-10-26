import React from "react";
import Moviecard from "../../components/MovieCard/Moviecard";

const Reconmended = ({ data, error, loading,updateUI }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="grid gap-3">
      {data.map((movie) => {
        return <Moviecard key={movie._id}  movie={movie} updateUI={updateUI} />;
      })}
    </div>
  );
};

export default Reconmended;
