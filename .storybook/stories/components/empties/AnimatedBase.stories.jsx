import { useState } from 'react'
import AnimatedBase from '../../../../src/components/empties/AnimatedBase'
import 'animate.css'

export default {
  title: 'components/empties/AnimatedBase',
  component: AnimatedBase,
  tags: ['autodocs'],
  argTypes: {
    id: {
      description: 'The id of the element',
      control: {
        type: 'text',
      },
    },
    cssClasses: {
      description: 'The css classes to apply to the element',
      control: {
        type: 'text',
      },
    },
    animation: {
      description: 'The animation to apply',
      control: {
        type: 'text',
      },
    },
    animatedBaseRef: {
      description: 'The reference to the animated base',
      control: {
        type: 'object',
      },
    },
    children: {
      description: 'The children to render',
      control: {
        type: 'React.ReactNode',
      },
    },
  },
}

const Template = () => {
  const [show, setShow] = useState(false)
  const onBtnClicked = () => setShow(!show)
  return (
    <div
      className='bal-relative bal-flex bal-h-40 bal-w-full  
      bal-items-center bal-justify-center bal-overflow-hidden'
    >
      <button
        onClick={onBtnClicked}
        className='bal-absolute bal-top-6 bal-cursor-pointer bal-rounded-lg 
          bal-border-none bal-bg-blue-600 bal-p-2 bal-text-lg bal-font-medium 
          bal-text-white'
      >
        {show ? 'HIDE AnimatedBase' : 'SHOW AnimatedBase'}
      </button>
      {show && (
        <AnimatedBase
          cssClasses='bal-absolute bal-bottom-0 bal-flex bal-h-14 bal-w-full 
          bal-items-center bal-justify-center bal-bg-[var(--bal-primary-500)] 
          bal-text-lg bal-font-medium bal-text-white'
          animation='animate__fadeIn'
        >
          <p>DIV AnimatedBase</p>
        </AnimatedBase>
      )}
    </div>
  )
}

export const Base = Template.bind({})
Base.args = {}
