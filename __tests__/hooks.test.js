/**
 * @jest-environment jsdom
 */
import { describe, it, expect } from '@jest/globals'
import { renderHook } from '@testing-library/react'
import { useMobile } from '../src/hooks/useMobile'

describe('services: [/helperUI], with local document', () => {
  // Mocking window.matchMedia
  function createMatchMedia(width) {
    return function (query) {
      return {
        matches: query.includes(`(min-width: ${width}px)`),
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }
    }
  }
  beforeEach(() => {
    // Set up the mock for window.matchMedia
    window.matchMedia = createMatchMedia(window.innerWidth)
  })
  it('[hook]: useMobile, should return a true', () => {
    window.innerWidth = 500
    const { result } = renderHook(() => useMobile())
    expect(result.current.isMobile).toBe(true)
  })
  it('[hook]: useMobile, should return a false', () => {
    window.innerWidth = 660
    const { result } = renderHook(() => useMobile())
    expect(result.current.isMobile).toBe(false)
  })
  it('[hook]: useMobile, should return a false', () => {
    window.innerWidth = 800
    const { result } = renderHook(() => useMobile(550))
    expect(result.current.isMobile).toBe(false)
  })
  it('[hook]: useMobile, should return a false', () => {
    window.innerWidth = 400
    const { result } = renderHook(() => useMobile(550))
    expect(result.current.isMobile).toBe(true)
  })
})
