import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function FilmListesi(props) {
  return (
    <div className="movie-list">
      {props.movies.map((movie) => (
        <FilmDetaylari key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

function FilmDetaylari(props) {
  const { title, director, metascore, id } = props.movie;
  const history = useHistory();

  return (
    <div
      className="movie-card"
      onClick={() => {
        history.push(`/filmler/${id}`);
      }}
    >
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
    </div>
  );
}
