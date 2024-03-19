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
        className="relative bg-transparent ring-0 outline-none border border-neutral-500 text-white placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5"
        type={type}
        onChange={handleChangeInput}
      />
    </div>
  );
};
