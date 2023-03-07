import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import HeaderLogo from '../../public/headerlogo.svg';
import SearchLogo from '../../public/search.png';

const Header = () => {
  const [token, setToken] = useState<string | null>('');
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const onLogoutHandeler = () => {
    localStorage.clear();
    router.push('/');
  };

  const onChangeHandeler = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSearchHandeler = () => {
    router.push({
      pathname: '/home',
      query: { pageNum: router.query.pageNum, movieName: search },
    });
  };

  return (
    <div className="bg-[#263F61] h-[70px] w-full py-4 px-14 flex justify-between items-center flex-wrap">
      <Image src={HeaderLogo} alt="Headerimg" className="bg-[#263F61]" />
      {token &&
        router.asPath !== '/' &&
        router.pathname !== '/[moviedetails]' && (
          <div className="bg-[#263F61] flex gap-3 flex-wrap">
            <div className="bg-[#263F61] flex">
              <input
                value={search}
                onChange={onChangeHandeler}
                type="text"
                placeholder="Search movie"
                className="py-1 px-3 border border-solid bg-[#263F61] text-white outline-[#FF7D65] "
              />
              <Image
                onClick={onSearchHandeler}
                src={SearchLogo}
                alt="SearchLogo"
                className="cursor-pointer"
              />
            </div>
            <button
              className="text-white text-base font-normal"
              onClick={onLogoutHandeler}
            >
              Logout
            </button>
          </div>
        )}
    </div>
  );
};

export default Header;
