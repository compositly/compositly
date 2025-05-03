// eslint-disable-next-line no-unused-vars
import React from 'react'
import 'animate.css'

export default function AnimatedBase({
  children,
  id = '',
  cssClasses = '',
  animation = '',
  animatedBaseRef = null,
  ...props
}) {
  return (
    <div
      id={`${id}`}
      className={`${cssClasses} animate__animated ${animation}`}
      ref={animatedBaseRef}
      {...props}
    >
      {children}
    </div>
  )
}
