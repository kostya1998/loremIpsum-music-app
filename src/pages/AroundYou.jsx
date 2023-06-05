import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useGetSongsByCountryQuery } from "../features/redux/services/shazamCore";
import { Loader, Error } from "../shared";
import { SongCard } from "./../widgets";
import { geoApiKey } from "../features/config";

const AroundYou = () => {
  const isMounted = useRef(false);
  const genre = "HOUSE";
  const countryCode = "US";
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery({
    genre,
    countryCode,
  });
  useEffect(() => {
    if (isMounted.current) {
      axios
        .get(`https://geo.ipify.org/api/v2/country?apiKey=${geoApiKey}`)
        .then((res) => setCountry(res?.data?.location?.country))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      isMounted.current = true;
    }
  }, [country]);

  if (isFetching && loading) {
    return <Loader title="Loading Songs Around You" />;
  }
  if (error && country) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <h2 className=" font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You <span className="font-black">{country}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
