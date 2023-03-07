import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { MouseEventHandler } from 'react';
import NextSvg from '../../public/nexticon.svg';
import PrevSvg from '../../public/prev.svg';

interface PaginationProps {
  onDynamicPageHandeler: () => void;
  onPrevPage: MouseEventHandler<HTMLImageElement>;
  onNextPage: MouseEventHandler<HTMLImageElement>;
}

const Pagination = ({
  onDynamicPageHandeler,
  onPrevPage,
  onNextPage,
}: PaginationProps) => {
  const pageLimit = 6;
  const router = useRouter();

  const getPaginationGroup = () => {
    let start = Math.floor((Number(router.query.pageNum) - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, index) => start + index + 1);
};

  return (
    <>
      <div className="flex justify-center gap-6">
        <Image
          src={PrevSvg}
          alt="PrevSvg"
          className="cursor-pointer"
          onClick={onPrevPage}
        />
        <div className="flex justify-center gap-9 py-14">
          {getPaginationGroup().map((ele, i) => {
            return (
              <h1
                key={i}
                onClick={() => onDynamicPageHandeler(ele)}
                className={`cursor-pointer text-lg font-bold ${
                  ele === Number(router.query.pageNum)
                    ? 'text-red-600 border-b-2 border-solid border-red-600'
                    : 'text-white'
                }`}
              >
                {ele}
              </h1>
            );
          })}
        </div>
        <Image
          src={NextSvg}
          alt="NextSvg"
          className="cursor-pointer"
          onClick={onNextPage}
        />
      </div>
    </>
  );
};

export default Pagination;
