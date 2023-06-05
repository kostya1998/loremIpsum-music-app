import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader, Error } from "../shared";
import { SongCard } from "../widgets";
import { useGetSearchQuery } from "../features/redux/services/shazamCore";

const Search = () => {
  const { term } = useParams();

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSearchQuery({ term });

  const songs = data?.tracks?.hits?.map((song) => song);
  if (isFetching) {
    return <Loader title="Loading Search" />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <h2 className=" font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="font-black">{term}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data?.tracks?.hits}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
