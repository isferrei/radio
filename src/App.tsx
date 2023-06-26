import React, { useEffect, useState } from "react";
import "./App.css";
import { Menu, Radio } from "./components/Menu/Menu";
import { List } from "./components/List/List";

function App() {
  const [favoriteRadios, setFavoriteRadios] = useState<Radio[]>([]);

  const handleRadio = (radio: Radio) => {
    if (
      !favoriteRadios.find(
        (favorite) => favorite.stationuuid === radio.stationuuid
      )
    ) {
      localStorage.setItem(
        "favoriteRadios",
        JSON.stringify([...favoriteRadios, radio])
      );
      return setFavoriteRadios([...favoriteRadios, radio]);
    }
  };

  const handleRemoveRadio = (id: string) => {
    localStorage.setItem(
      "favoriteRadios",
      JSON.stringify(favoriteRadios.filter((radio) => radio.stationuuid !== id))
    );

    return setFavoriteRadios((items) =>
      items.filter((radio) => radio.stationuuid !== id)
    );
  };

  const handleEditRadioName = (id:string, value:string) => {
    console.log(id, value);
    
  }

  useEffect(() => {
    const storedFavoriteRadios = localStorage.getItem("favoriteRadios");

    if (storedFavoriteRadios) {
      setFavoriteRadios(JSON.parse(storedFavoriteRadios));
    }

    localStorage.removeItem("filteredRadios");
  }, []);

  return (
    <div className="flex gap-5 h-screen overflow-y-hidden">
      <Menu handleRadio={handleRadio} favoriteRadios={favoriteRadios}></Menu>
      <section className="flex flex-col gap-5 w-full p-3">
        <h2 className="text-center font-bold text-xl align-center text-white">
          Radio Browser
        </h2>
        <List
          favoriteRadios={favoriteRadios}
          removeRadio={handleRemoveRadio}
          handleEditRadioName={handleEditRadioName}
        ></List>
      </section>
    </div>
  );
}

export default App;
