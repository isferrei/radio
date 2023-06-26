import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { InputSearch } from "../InputSearch/InputSearch";

type Radio = {
  language: any;
  stationuuid: string;
  name: string;
  url: string;
  homepage: string;
  country: string;
  codec: string;
};

type Track = {
  stationuuid: string;
  name: string;
  url: string;
  homepage: string;
  country: string;
  codec: string;
  isPlaying: boolean;
};

type Title = {
  stationuuid: string;
  name: string;
  editTitle: boolean;
};

export interface IListProps {
  favoriteRadios: Radio[];
  removeRadio: (id: string) => void;
  handleEditRadioName: (id: string, value: string) => void;
}

export const List = (props: IListProps) => {
  const [playingTrack, setPlayingTrack] = useState<Track | null>(null);
  const [editTitle, setEditTitle] = useState<Title | null>(null);
  const [radioTitle, setRadioTitle] = useState<string | null>();
  const [filteredList, setFilteredList] = useState<Radio[]>(
    props.favoriteRadios
  );

  const handleRemoveRadio = (id: string) => {
    if (playingTrack?.stationuuid === id) {
      setPlayingTrack(null);
    }
    return props.removeRadio(id);
  };

  const handleFilterList = (searchValue: string) => {
    const lowerCaseSearchValue = searchValue.toLowerCase();

    const filteredList = props.favoriteRadios.filter(
      (radio) =>
        radio.name.toLowerCase().includes(lowerCaseSearchValue) ||
        radio.country.toLowerCase().includes(lowerCaseSearchValue) ||
        radio.language.toLowerCase().includes(lowerCaseSearchValue)
    );

    setFilteredList(filteredList);
  };

  const handleEditRadioName = (id: string, value: string) => {
    setRadioTitle(value);

    return props.handleEditRadioName(id, value);
  };

  useEffect(() => {
    if (props.favoriteRadios) {
      setFilteredList(props.favoriteRadios);
    }
  }, [props.favoriteRadios]);

  const listContent = filteredList.map((radio, key) => (
    <div
      key={`${key}-${radio.stationuuid}`}
      className="bg-lightGray text-black p-2 pl-5 w-full flex gap-4 items-center justify-between"
    >
      <div className="flex gap-4 items-center">
        {playingTrack?.stationuuid === radio.stationuuid &&
        playingTrack?.isPlaying === true ? (
          <Button
            onClick={() => setPlayingTrack({ ...radio, isPlaying: false })}
            variation={"primary"}
            icon="stop"
            iconHeight={30}
            iconWidth={30}
          />
        ) : (
          <Button
            onClick={() => setPlayingTrack({ ...radio, isPlaying: true })}
            variation={"primary"}
            icon="play"
            iconHeight={30}
            iconWidth={30}
          />
        )}
        <span className="flex flex-col">
          {editTitle?.stationuuid === radio.stationuuid &&
          editTitle.editTitle ? (
            <input
              type="text"
              value={radioTitle ?? radio.name}
              onChange={(e) =>
                handleEditRadioName(radio.stationuuid, e.target.value)
              }
            />
          ) : (
            <p>{radio.name}</p>
          )}
          <small>
            {radio.country}, {radio.codec}
          </small>
        </span>
      </div>
      <span>
        <Button
          variation={"secondary"}
          icon="edit"
          iconHeight={30}
          iconWidth={30}
          onClick={() => {
            setEditTitle({ ...radio, editTitle: !editTitle });
          }}
        />
        <Button
          variation={"secondary"}
          icon="delete"
          iconHeight={30}
          iconWidth={30}
          onClick={() => {
            handleRemoveRadio(radio.stationuuid);
          }}
        />
      </span>
    </div>
  ));

  return (
    <>
      <section className="flex items-center justify-between">
        <h2 className="text-white ml-5">FAVORITE RADIOS</h2>
        <div className="flex items-center">
          <Button
            variation={"secondary"}
            icon="search"
            iconHeight={30}
            iconWidth={30}
            onClick={() => {}}
          />
          <InputSearch
            onChange={(value) => handleFilterList(value)}
            placeholder="Search here"
          />
        </div>
      </section>
      <section className="flex flex-col gap-[0.4rem] py-[1rem] px-[0.5rem] w-full bg-gray rounded-xl items-center overflow-auto">
        {playingTrack && (
          <div className="border-b w-full border-lightGray p-[0.2rem] pb-4 pl-5 flex items-center gap-2">
            {playingTrack?.isPlaying === true ? (
              <Button
                onClick={() =>
                  setPlayingTrack({ ...playingTrack, isPlaying: false })
                }
                variation={"primary"}
                icon="stop"
                iconHeight={30}
                iconWidth={30}
              />
            ) : (
              <Button
                onClick={() => {
                  setPlayingTrack({ ...playingTrack, isPlaying: true });
                }}
                variation={"primary"}
                icon="play"
                iconHeight={30}
                iconWidth={30}
              />
            )}
            <p className="font-bold">{playingTrack.name}</p>
          </div>
        )}
        {props.favoriteRadios.length > 0 ? (
          listContent
        ) : (
          <h2 className="text-white pt-2">
            {"You have no favorite radios yet :("}
          </h2>
        )}
      </section>
    </>
  );
};
