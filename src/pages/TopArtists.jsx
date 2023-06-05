import { ArtistCard } from "../entites";
import { useGetTopChartsByGenreQuery } from "../features/redux/services/shazamCore";
import { Error, Loader } from "../shared";

const TopArtists = () => {
  const genre = "House";
  const { data, isFetching, error } = useGetTopChartsByGenreQuery({ genre });

  if (isFetching) {
    return <Loader title="Loading Top Artists" />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <h2 className=" font-bold text-3xl text-white text-left mt-4 mb-10">
        Top Artists
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks.map((track) => (
          <ArtistCard key={track.key} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
