import React from "react";

interface Props {
  children: React.ReactNode | React.ReactElement;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  className?:string;
}
export const Button: React.FC<Props> = ({ onClick, children, className='' }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 text-white text-sm sm:text-base font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-purple-500 hover:cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};
