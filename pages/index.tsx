import { Inter } from 'next/font/google';
import LoginCard from '@/components/logincard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ data }) {
  const router = useRouter();
  const [value, setValue] = useState({
    username: '',
    password: '',
  });


  const onChangeHandeler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onLoginHandeler = async () => {
    const checkToken = data;
    localStorage.setItem('token', data);
    const userdata = {
      username: value.username,
      password: value.password,
      request_token: checkToken,
    };
    const res = await fetch(
      'https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=36f92e051d1f7b92dd147302b1b51f81',
      {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userdata),
      }
    );

    if (res.status === 200) {
      setValue({
        username: '',
        password: '',
      });
      router.push({ pathname: '/home', query: { pageNum: 1 } });
    }
  };

  return (
    <div className="flex justify-center h-[70vh] items-center">
      <LoginCard
        onChangeHandeler={onChangeHandeler}
        value={value}
        onLoginHandeler={onLoginHandeler}
      />
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    'https://api.themoviedb.org/3/authentication/token/new?api_key=36f92e051d1f7b92dd147302b1b51f81'
  );
  const data = await res.json();

  return {
    props: {
      data: data?.request_token,
    },
  };
}
