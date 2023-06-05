import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader, Error } from "../shared";
import { DetailsHeader } from "../entites";
import { RecommendedSongs } from "../widgets";
import { useGetArtistDetailsQuery } from "../features/redux/services/shazamCore";
import {
  playPause,
  setActiveSong,
} from "../features/redux/features/playerSlice";

const ArtistDetails = () => {
  const dispatch = useDispatch();

  const { id: artistId } = useParams();

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery({ artistId });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  if (isFetchingArtistDetails) return <Loader title="Loading artist details" />;

  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} songData="" />
      <RecommendedSongs
        data={Object.values(artistData?.data)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePlayClick={handlePlayClick}
        handlePauseClick={handlePauseClick}
      />
    </div>
  );
};

export default ArtistDetails;
