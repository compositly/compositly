// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React from 'react'
import { ComponentBaseProps } from '../../interfaces/ComponentBaseProps'

export default function ComponentBase({
  id,
  children,
  className,
}: ComponentBaseProps) {
  // This is a base component that can be extended by other components.
  // It can contain common logic, styles, or any other shared functionality.
  // The idea is to provide a base structure that can be reused across different components.
  return (
    <div
      id={id}
      className={`
      c-flex c-h-full c-w-full c-items-center c-justify-center 
      ${className || ''}
    `}
    >
      {children}
    </div>
  )
}
