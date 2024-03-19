import React, { useEffect, useState } from "react";

import { useDebounce } from "../hooks/debounce";
import { useGetBoardByIdQuery } from "../redux/api";

interface Props {
  onFindBoard: (id: string) => void;
  onAddClick:()=>void;
}

export const SearchBoard: React.FC<Props> = ({ onFindBoard, onAddClick }) => {
  const [value, setValue] = useState<string>("");
  const debounsed: string = useDebounce(value);
  const { data, error } = useGetBoardByIdQuery(debounsed, {
    skip: debounsed.length < 1,
    refetchOnFocus: true,
  });

  useEffect(() => {
    if (data) {
      onFindBoard(data._id);
    }
    if(error){
      onFindBoard('')
    }
    if(!debounsed)  {
      onFindBoard('')
    }
  }, [debounsed, data]);
  return (
    <div className="container flex items-center justify-between">
      <div className="w-1/2 flex gap-3 items-center">
        <p className="text-white text-nowrap">Search board by ID</p>
        <input
          type="text"
          name="board-search"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          placeholder="#ID"
          className="w-full bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-rose-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-rose-400"
        />
      </div>
      <button onClick={onAddClick} className="rounded-lg relative w-40 h-10 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500 overflow-hidden">
        <span className="text-gray-200 font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300">
          Add board
        </span>
        <span className="absolute right-0 h-full w-10 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
          <svg
            className="svg w-8 text-white"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="12" x2="12" y1="5" y2="19"></line>
            <line x1="5" x2="19" y1="12" y2="12"></line>
          </svg>
        </span>
      </button>
    </div>
  );
};
