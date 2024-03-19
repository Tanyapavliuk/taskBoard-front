import React from "react";

interface Props {
  type?: "text";
  value: string;
  name: string;
  placeholder: string;
  pattern?: RegExp;
  onInput: (inputName: string, value: string) => void;
}
export const Input: React.FC<Props> = ({
  type = "text",
  value,
  name,
  placeholder,
  onInput,
}) => {
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInput(name, e.target.value);
  };
  return (
    <div className="relative rounded-lg w-full overflow-hidden ">
      <input
        value={value}
        name={name}
        placeholder={placeholder}
        className="w-full bg-transparent text-white font-mono border-2 border-zinc-400 outline-none duration-300 placeholder:text-zinc-100 placeholder:opacity-50 rounded-full px-4 py-2 focus:border-rose-400"
        type={type}
        onChange={handleChangeInput}
      />
    </div>
  );
};
