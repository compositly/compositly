// eslint-disable-next-line no-unused-vars
import React from 'react'

export default function EmptyBase({
  className = '',
  text = 'This feature is not available yet',
  icon = <></>,
  onClick = () => {},
  paddingStyles = 'bal-p-12',
  bgStyles = 'bal-bg-transparent',
}) {
  return (
    <button
      type='button'
      className={`
        bal-ba-transition-2 bal-relative bal-flex bal-h-full bal-w-full
        bal-flex-col bal-items-center bal-justify-center bal-rounded-lg
        bal-border-2 bal-border-dashed bal-border-gray-300
        bal-text-center hover:bal-border-gray-400
        ${className} ${paddingStyles} ${bgStyles}
      `}
      onClick={onClick}
    >
      {icon}
      <span className='bal-mt-2 bal-block bal-text-sm bal-text-gray-900'>
        {text}
      </span>
    </button>
  )
}
