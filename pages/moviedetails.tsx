import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import BackButtonSvg from '../public/backbtn.svg';
import Image from 'next/image';
import PlayerSvg from '../public/player.svg';

interface TrailerLink {
  type: string;
}

interface MovieDetailsProps {
  data: {
    id: number;
    original_title: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    overview: string;
  };
  trailerData: TrailerLink;
}

const MovieDetails: FC<MovieDetailsProps> = ({
  data,
  trailerData,
}: MovieDetailsProps) => {
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
          <Image
            src={BackButtonSvg}
            alt="BackButtonSvg"
            className="mb-6 cursor-pointer"
            onClick={onBackHandeler}
          />
          <h1 className="mb-4 font-medium text-5xl">{data?.original_title}</h1>
          <p className="mb-4 font-normal text-base">
            Rating: {Math.round((data.vote_average * 10) / 10) / 2}/5
          </p>
          <p className="mb-4 font-normal text-lg">{data.overview}</p>
          <div className="flex justify-between mb-4">
            <p className='font-normal text-base' >Release Date</p>
            <p className='font-normal text-base' >{data.release_date}</p>
          </div>
          <div className="flex justify-between mb-4">
            <p className='font-normal text-base' >Orginal Language</p>
            <p className='font-normal text-base' >English, Spanish, French</p>
          </div>
        </div>
        <div className="relative flex justify-center items-center w-full">
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt="BackgrondSvg"
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
    `${process.env.Base_URL}movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`
  );
  const data = await res.json();

  const MovieRes = await fetch(
    `${process.env.Base_URL}movie/${movieId}/videos?api_key=${process.env.API_KEY}`
  );
  const trailerData = await MovieRes.json();
  return {
    props: {
      data,
      trailerData,
    },
  };
}
