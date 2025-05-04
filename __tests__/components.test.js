/**
 * @jest-environment jsdom
 */
//
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React from 'react'
import {
  render,
  // fireEvent,
  // screen,
  // waitFor,
} from '@testing-library/react'
import ComponentBase from '../src/components/core/ComponentBase'

describe('components: [/core], component ComponentBase', () => {
  beforeEach(() => {})
  it('[AnimatedBase]: render with Base template', () => {
    render(<ComponentBase id='hello' />)
  })
})
