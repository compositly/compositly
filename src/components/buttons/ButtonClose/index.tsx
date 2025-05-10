// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React from "react";
import { ButtonCloseProps } from "interfaces/Buttons";
import { IoClose } from "react-icons/io5";

const ButtonClose = ({
  className = "c-p-1 hover:c-bg-gray-50",
  onClick = () => {},
  size = 32,
}: ButtonCloseProps) => {
  const onBtnClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick();
  };
  return (
    <button
      className={`${className} c-transition-2 c-rounded-full c-cursor-pointer`}
      onClick={onBtnClicked}
    >
      <IoClose className="c-text-gray-500" size={size} />
    </button>
  );
};

export default ButtonClose;
