import React, { useState } from 'react'
import ComponentBase from '../../../../src/components/core/ComponentBase'

export default {
  title: 'components/core/ComponentBase',
  component: ComponentBase,
  tags: ['autodocs'],
}

const Template = () => {
  return (
    <div
      className='bal-relative bal-flex bal-h-40 bal-w-full  
      bal-items-center bal-justify-center bal-overflow-hidden'
    >
      <ComponentBase />
    </div>
  )
}

export const Base = Template.bind({})
Base.args = {}
