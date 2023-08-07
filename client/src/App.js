import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import FilmListesi from "./Filmler/FilmListesi.js";
import Film from "./Filmler/Film.js";

import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get("http://localhost:5001/api/filmler") // Burayı Postman'le çalışın
        .then((response) => {
          // Bu kısmı log statementlarıyla çalışın
          // console.log(response.data);
          // ve burdan gelen response'u 'movieList' e aktarın
          setMovieList(response.data);
        })
        .catch((error) => {
          console.error("Sunucu Hatası", error);
        });
    };
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (id) => {
    if (!saved.includes(id)) {
      setSaved([...saved, id]);
    }
  };

  return (
    <div>
      <KaydedilenlerListesi list={saved} />

      <div>
        <Switch>
          <Route exact path="/">
            <FilmListesi movies={movieList} />
          </Route>

          <Route exact path="/filmler/:id">
            <Film saveFunc={KaydedilenlerListesineEkle} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
