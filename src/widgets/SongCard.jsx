import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PlayPause } from "../shared";
import {
  playPause,
  setActiveSong,
} from "../features/redux/features/playerSlice";

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  return (
    <div className="flex flex-col w-[250px] p-4 bg-black/20 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56  group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-40 group-hover:flex ${
            activeSong?.title === (song?.title || song?.heading?.title)
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          {song?.hub ? (
            <PlayPause
              song={song}
              activeSong={activeSong}
              isPlaying={isPlaying}
              handlePause={handlePauseClick}
              handlePlay={handlePlayClick}
            />
          ) : null}
        </div>
        <img
          alt="song_img"
          src={song.images?.coverart || song.images?.default}
        />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>
            {song.title || song?.heading?.title}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song.subtitle || song?.heading?.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
