import MovieCard from '@/components/moviecard';
import Pagination from '@/components/pagination';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import WallPaperSvg from '../public/wallpaper.svg';
import { useEffect } from 'react';

interface HomePageProps {
  data: {
    page: number;
    total_pages: number;
    total_results: number;
    results: {
      id: number;
      original_language: string;
      poster_path: string;
      title: string;
      vote_average: number;
    }[];
  };
}

const Home: FC<HomePageProps> = ({ data }: HomePageProps) => {
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
    router.push({ pathname: '/moviedetails', query: { movieId: i } });
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
    `${process.env.Base_URL}trending/movie/day?api_key=${process.env.API_KEY}&page=${pageNum}`
  );
  const apiData = await res.json();

  return {
    props: {
      data: apiData,
    },
  };
}
