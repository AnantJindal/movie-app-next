import React, { FC } from 'react';
import Input from '../input';

interface LoginCardProps {
  onChangeHandeler: React.ChangeEventHandler<HTMLInputElement>;
  value: {
    username: string;
    password: string;
  };
  onLoginHandeler: React.MouseEventHandler<HTMLButtonElement>;
}

const LoginCard: FC<LoginCardProps> = ({
  onChangeHandeler,
  value,
  onLoginHandeler,
}: LoginCardProps) => {
  return (
    <div className="bg-white z-50 p-8 w-3/6 rounded-2xl">
      <h1 className="bg-white font-medium text-3xl text-black">Sign in</h1>
      <p className="bg-white text-black font-normal text-sm pt-[10px]">
        Sign in to your Self Service Portal
      </p>
      <Input
        type="text"
        placeholder="Username"
        onChangeHandeler={onChangeHandeler}
        value={value.username}
        name="username"
      />
      <Input
        type="password"
        placeholder="Password"
        onChangeHandeler={onChangeHandeler}
        value={value.password}
        name="password"
      />
      <div className="flex justify-center w-full bg-white mt-8">
        <button
          className="w-full bg-[#FF7D65] text-white rounded-2xl p-2"
          onClick={onLoginHandeler}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default LoginCard;
