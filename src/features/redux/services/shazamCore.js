import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { shazamKey } from "../../config";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-api7.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", `${shazamKey}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => {
        return `charts/get-top-songs-in-world`;
      },
    }),
    getTopChartsByGenre: builder.query({
      query: ({ genre }) => {
        return `charts/get-top-songs-in_world_by_genre?genre=${genre}`;
      },
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => {
        return `songs/get_details?id=${songid}`;
      },
    }),
    getSongRcommendations: builder.query({
      query: ({ songid }) => {
        return `songs/list-recommendations?id=${songid}`;
      },
    }),
    getArtistDetails: builder.query({
      query: ({ artistId }) => {
        return `artist/get-top-songs?id=${artistId}`;
      },
    }),
    getSongsByCountry: builder.query({
      query: ({ genre, countryCode }) => {
        return `charts/get-top-songs-in_country_by_genre?country_code=${countryCode}&genre=${genre}`;
      },
    }),
    getSearch: builder.query({
      query: ({ term }) => {
        return `/search?term=${term}`;
      },
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetTopChartsByGenreQuery,
  useGetSongRcommendationsQuery,
  useGetSongDetailsQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
  useGetSearchQuery,
} = shazamCoreApi;
