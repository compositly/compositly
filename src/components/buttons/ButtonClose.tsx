// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React from 'react'
import { IoClose } from 'react-icons/io5'

export interface ButtonCloseProps {
  className?: string
  onClick?: () => void
  size?: number
}

export default function ButtonClose({
  className = 'c-p-1 hover:c-bg-gray-50',
  onClick = () => {},
  size = 32,
}: ButtonCloseProps) {
  const onBtnClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onClick()
  }
  return (
    <button
      className={`${className} c-transition-2 c-flex c-cursor-pointer 
      c-items-center c-justify-center c-rounded-full c-border-none c-bg-transparent c-outline-none`}
      onClick={onBtnClicked}
    >
      <IoClose className='c-text-gray-500' size={size} />
    </button>
  )
}
