import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import BackButtonSvg from '../public/backbtn.svg';
import Image from 'next/image';
import PlayerSvg from '../public/player.svg';

interface TrailerLink {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

interface MovieDetailsProps {
  data: {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: null;
    budget: number;
    genres: [];
    homepage: string;
    id: 937278;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: [];
    production_countries: [];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: [];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };
  trailerData: TrailerLink;
}

const MovieDetails = ({ data, trailerData }: MovieDetailsProps) => {
  const [trailerLink, setTrailerLink] = useState<TrailerLink>();
  const [modal, setModal] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    setTrailerLink(
      trailerData.results.filter((type: TrailerLink) => {
        return type.type === 'Trailer';
      })[0]
    );
  }, [trailerData]);

  const onBackHandeler = () => {
    router.back();
  };

  const onvideoPlayClick = () => {
    setModal(!modal);
  };

  return (
    <>
      <div className="flex relative">
        <div className="text-white basis-[35%] p-14">
          <Image src={BackButtonSvg} alt="BackButtonSvg" className="mb-6" />
          <h1 className="mb-4">{data?.original_title}</h1>
          <p className="mb-4">
            Rating: {Math.round((data.vote_average * 10) / 10) / 2}/5
          </p>
          <p className="mb-4">{data.overview}</p>
          <div className="flex justify-between mb-4">
            <p>Release Date</p>
            <p>{data.release_date}</p>
          </div>
          <div className="flex justify-between mb-4">
            <p>Orginal Language</p>
            <p>English, Spanish, French</p>
          </div>
        </div>
        <div className="relative flex justify-center items-center w-full">
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt="BackgrondSvg"
            onClick={onBackHandeler}
          />
          <div
            className="absolute w-28 h-28 bg-transparent cursor-pointer"
            onClick={onvideoPlayClick}
          >
            <Image
              src={PlayerSvg}
              alt="PlayerSvg"
              className="h-full w-full bg-transparent"
            />
          </div>
        </div>
      </div>
      {modal && (
        <div className="absolute top-20 left-10 right-10 bottom-10">
          <iframe
            width={1200}
            height={500}
            src={`https://www.youtube-nocookie.com/embed/${trailerLink?.key}?autoplay=1&mute=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </>
  );
};

export default MovieDetails;

export async function getServerSideProps(context: {
  query: { movieId: number };
}) {
  const { query } = context;
  const { movieId } = query;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=36f92e051d1f7b92dd147302b1b51f81&language=en-US`
  );
  const data = await res.json();

  const MovieRes = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=36f92e051d1f7b92dd147302b1b51f81`
  );
  const trailerData = await MovieRes.json();
  return {
    props: {
      data,
      trailerData,
    },
  };
}
