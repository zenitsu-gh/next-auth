import React from "react";

type InputsProps = {
    type: string,
    placeholder: string,
    name: string,
    change: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Inputs = ({ type, placeholder, name, change }: InputsProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={change}
      required
      className="px-6 py-2 w-[350px] ouline-none text-sm border-[1px] border-slate-200 outline-none focus:border-[#24FF00]"
    />
  );
};

export default Inputs;
