import Image from 'next/image';
import React, { FC } from 'react';
import PlayerSvg from '../../public/player.svg';

interface MovieCardProps {
  apiData: {
    results: {
      id: number;
      original_language: string;
      poster_path: string;
      title: string;
      vote_average: number;
    }[];
  };
  onCardClick: React.MouseEventHandler<HTMLImageElement>;
}

const MovieCard: FC<MovieCardProps> = ({ apiData, onCardClick }: MovieCardProps) => {
  return (
    <div className="flex justify-between flex-wrap">
      {apiData?.results?.map((ele, i: number) => {
        return (
          <div
            className="w-[250px] relative mt-20 cursor-pointer"
            key={i}
            onClick={() => onCardClick(ele.id)}
          >
            <img
              src={
                `https://image.tmdb.org/t/p/w500${ele.poster_path}`
                  ? `https://image.tmdb.org/t/p/w500${ele.poster_path}`
                  : ' https://ih1.redbubble.net/image.1316918254.1116/flat,750x,075,f-pad,750x1000,f8f8f8.jpg'
              }
              alt="MovieImageSvg"
              className="w-[281px] h-[135px]"
            />
            <div className="flex justify-between py-2 px-4 bg-[#2B507C] absolute w-full top-[75%]">
              <div className="bg-[#2B507C]">
                <h3 className="bg-[#2B507C] text-white font-normal text-sm">
                  {ele.title.length <= 20 ? ele.title : ele.title.slice(0, 20)}
                </h3>
                <p className="bg-[#2B507C] text-white font-medium text-base pt-1">
                  {Math.round((ele.vote_average * 10) / 10) / 2} / 5
                </p>
              </div>
              <Image
                src={PlayerSvg}
                alt="PlayerSvg"
                className=" bg-[#2B507C] cursor-pointer"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MovieCard;
