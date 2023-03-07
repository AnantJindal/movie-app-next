import MovieCard from '@/components/moviecard';
import Pagination from '@/components/pagination';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import WallPaperSvg from '../public/wallpaper.svg';
import { useEffect, useState } from 'react';

export interface MovieInfo {
  data: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
}
interface HomePageProps {
  data: {
    page: number;
    total_pages: number;
    total_results: number;
    results: {
      adult: boolean;
      backdrop_path: string;
      genre_ids: number[];
      id: number;
      media_type: string;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string;
      release_date: string;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    }[];
  };
}

const Home = ({ data }: HomePageProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/');
    }
  }, [router]);

  const onDynamicPageHandeler = (i: number) => {
    router.replace({ pathname: '/home', query: { pageNum: i } });
  };

  const onPrevPagehandeler = () => {
    if (Number(router.query.pageNum) !== 1) {
      router.replace({
        pathname: '/home',
        query: { pageNum: Number(router.query.pageNum) - 1 },
      });
    }
  };

  const onNextPageHandeler = () => {
    if (data?.total_pages !== Number(router.query.pageNum)) {
      router.replace({
        pathname: '/home',
        query: { pageNum: Number(router.query.pageNum) + 1 },
      });
    }
  };

  const onCardClick = (i: number) => {
    router.push({ pathname: '/movieDetails', query: { movieId: i } });
  };

  return (
    <div>
      <Image src={WallPaperSvg} alt="WallPaperSvg" />
      <div className="p-14">
        <h1 className="text-white font-medium text-3xl">Trending</h1>
        <MovieCard apiData={data || []} onCardClick={onCardClick} />
      </div>

      <Pagination
        onDynamicPageHandeler={onDynamicPageHandeler}
        onPrevPage={onPrevPagehandeler}
        onNextPage={onNextPageHandeler}
      />
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: {
  query: { pageNum: number };
}) {
  const { pageNum } = context.query;

  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=36f92e051d1f7b92dd147302b1b51f81&page=${pageNum}`
  );
  const apiData = await res.json();

  return {
    props: {
      data: apiData,
    },
  };
}
