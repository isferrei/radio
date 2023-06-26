import { useEffect, useState } from "react";

type Radio = {
  stationuuid: string;
  name: string;
  url: string;
  homepage: string;
  country: string;
  codec: string;
  language: string;
};

export const useFetch = () => {
  const [data, setData] = useState<Radio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const res = await fetch(
        "https://de1.api.radio-browser.info/json/stations/search?limit=10"
      );
      const jsonData = await res.json();

      if (jsonData) {
        setIsLoading(false);
        setData(jsonData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, [data]);

  return { data, isLoading };
};
