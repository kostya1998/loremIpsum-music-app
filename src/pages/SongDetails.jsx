import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailsHeader } from "../entites";

import { Error, Loader } from "../shared";
import { RecommendedSongs } from "../widgets";
import {
  useGetSongDetailsQuery,
  useGetSongRcommendationsQuery,
} from "../features/redux/services/shazamCore";
import {
  playPause,
  setActiveSong,
} from "../features/redux/features/playerSlice";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { songid } = useParams();
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });

  const {
    data,
    isFetching: isFetchingRecommendedSongs,
    error,
  } = useGetSongRcommendationsQuery({ songid });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  if (isFetchingSongDetails || isFetchingRecommendedSongs)
    return <Loader title="Searching song details" />;

  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics :</h2>
        <div className="mt-5">
          {songData?.sections[1].type === "LYRICS" ? (
            songData?.sections[1].text.map((line, i) => (
              <p key={i} className="text-white text-base my-1">
                {line}
              </p>
            ))
          ) : (
            <p className="text-white text-base ">Sorry, no lyrics found!</p>
          )}
        </div>
      </div>

      <RecommendedSongs
        data={data?.tracks}
        artistId=""
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePlayClick={handlePlayClick}
        handlePauseClick={handlePauseClick}
      />
    </div>
  );
};

export default SongDetails;
