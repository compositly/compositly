// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import React from 'react'
import ComponentBase from '../../../../src/components/core/ComponentBase'

export default {
  title: 'components/core/ComponentBase',
  component: ComponentBase,
  tags: ['autodocs'],
}

const Template = () => {
  return (
    <div
      className='c-relative c-flex c-h-40 c-w-full  
      c-items-center c-justify-center c-overflow-hidden'
    >
      <ComponentBase id='hello' />
    </div>
  )
}

export const Base = Template.bind({})
Base.args = {}
