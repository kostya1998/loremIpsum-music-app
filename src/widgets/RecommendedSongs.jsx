import { SongBar } from "../entites";
const RecommendedSongs = ({
  data,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Recommended Songs :</h1>

      <div className="mt-6 w-full flex flex-col">
        {data?.map((song, i) => (
          <SongBar
            key={`${i}-${artistId}`}
            song={song}
            i={i}
            artistId={artistId}
            isPlayong={isPlaying}
            activeSong={activeSong}
            handlePlayClick={handlePlayClick}
            handlePauseClick={handlePauseClick}
          />
        ))}
      </div>
    </div>
  );
};
export default RecommendedSongs;
