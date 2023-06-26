import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { InputSearch } from "../InputSearch/InputSearch";
import { useFetch } from "../../hooks/useFetch";
import { Loader } from "../Loader/Loader";

export type Radio = {
  stationuuid: string;
  name: string;
  url: string;
  homepage: string;
  country: string;
  codec: string;
  language: any;
};

export interface IMenuProps {
  handleRadio: (radio: Radio) => void;
  favoriteRadios: Radio[];
}

export const Menu = (props: IMenuProps) => {
  const { data, isLoading } = useFetch();
  const radios = data;
  const [selectedRadio, setSelectedRadio] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(true);
  const [filteredMenu, setFilteredMenu] = useState<Radio[]>(radios);

  const handleSelectedRadio = (radio: Radio) => {
    if (!selectedRadio.includes(radio.stationuuid)) {
      setSelectedRadio((prevRadios) => [...prevRadios, radio.stationuuid]);
    }
  };

  const handleUpdateRadio = (favoriteRadios: Radio[]) => {
    if (selectedRadio.length === 0) {
      const favoriteRadioIds = favoriteRadios.map((radio) => radio.stationuuid);
      setSelectedRadio(favoriteRadioIds);
    } else {
      setSelectedRadio((prevRadios) =>
        prevRadios.filter((radio) =>
          favoriteRadios.some((favorite) => radio === favorite.stationuuid)
        )
      );
    }
  };

  const handleFilterRadios = (searchValue: string) => {
    const lowerCaseSearchValue = searchValue.toLowerCase();

    const filteredList = radios.filter(
      (radio) =>
        radio.name.toLowerCase().includes(lowerCaseSearchValue) ||
        radio.country.toLowerCase().includes(lowerCaseSearchValue) ||
        radio.language.toLowerCase().includes(lowerCaseSearchValue)
    );

    setFilteredMenu(filteredList);
  };

  useEffect(() => {
    handleUpdateRadio(props.favoriteRadios);
  }, [props.favoriteRadios]);

  useEffect(() => {
    setFilteredMenu(radios);
  }, [radios]);

  return (
    <div
      className={`flex flex-col items-end gap-[1rem] py-[1.2rem] px-[0.3rem] w-max h-full bg-black800 ${
        expanded ? "translate(0%)" : "translate(-10%)"
      }`}
      style={{
        transition: "all 0.5s ease-in-out",
      }}
    >
      <Button
        onClick={() => {
          setExpanded((prevExpanded) => !prevExpanded);
        }}
        variation={"secondary"}
        icon="menu"
        iconHeight={30}
        iconWidth={30}
      />
      {expanded && (
        <div className="flex flex-col gap-4 items-center overflow-hidden">
          <InputSearch
            placeholder="Search here"
            onChange={(value) => handleFilterRadios(value)}
          />
          <div className="flex flex-col gap-[1rem] px-2 w-full h-screen overflow-y-scroll">
            {isLoading ? (
              <Loader />
            ) : (
              filteredMenu.map((radio, index) => (
                <Button
                  key={radio.stationuuid}
                  onClick={() => {
                    props.handleRadio(radio);
                    handleSelectedRadio(radio);
                  }}
                >
                  {radio.name}
                  {selectedRadio.includes(radio.stationuuid) && (
                    <img src="/assets/check.svg" alt="check icon" />
                  )}
                </Button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
