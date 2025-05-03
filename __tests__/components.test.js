/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { IoCalendarOutline } from 'react-icons/io5'
import { MdAccessTime } from 'react-icons/md'
import { fireEvent, screen, render, waitFor } from '@testing-library/react'

import AnimatedBase from '../src/components/empties/AnimatedBase'
import EmptyBase from '../src/components/empties/EmptyBase'

// Mock window.open
const mockWindowOpen = jest.fn()
global.open = mockWindowOpen

jest.mock('../src/stores/useStoreModals.js', () => ({
  useStoreModals: jest.fn(),
}))

describe('components: [/empties], component AnimatedBase', () => {
  beforeEach(() => {})
  it('[AnimatedBase]: render with Base template', () => {
    render(<AnimatedBase />)
  })
})

describe('components: [/empties], component EmptyBase', () => {
  beforeEach(() => {})
  it('[EmptyBase]: render with Base template', () => {
    render(<EmptyBase />)
  })
  it('[EmptyBase]: render with Empty template', () => {
    render(<EmptyBase text='' />)
  })
  it('[EmptyBase]: render with WithModifiedPaddingStyles template', () => {
    render(<EmptyBase paddingStyles='bal-p-20' />)
  })
  it('[EmptyBase]: render with WithModifiedClasses template', () => {
    render(
      <EmptyBase
        text='This is a test with modified classes'
        className='hover:bal-border-solid hover:bal-border-black'
        bgStyles='bal-bg-blue-100'
        paddingStyles='bal-p-30'
      />,
    )
  })
  it('[EmptyBase]: render with WithIcon template', () => {
    render(
      <EmptyBase
        icon={
          <img
            src='https://compositly.com/_next/static/media/logo.f7ea750c.svg'
            className='bal-h-10 bal-w-10'
          ></img>
        }
      />,
    )
  })
})
