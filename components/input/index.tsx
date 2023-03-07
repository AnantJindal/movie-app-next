import React from 'react';

interface InputProps {
  type: string;
  placeholder: string;
  onChangeHandeler: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  name: string;
}

const Input = ({
  type,
  placeholder,
  onChangeHandeler,
  name,
  value,
}: InputProps) => {
  return (
    <div className=" mt-6 bg-white">
      <input
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChangeHandeler}
        className="w-full rounded-2xl bg-white border border-solid outline-[#FF7D65] p-4 font-normal text-base text-[#546E7A]"
      />
    </div>
  );
};

export default Input;
