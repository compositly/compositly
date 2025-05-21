/**
 * @jest-environment jsdom
 */
//

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React from 'react'
import {
  // act,
  fireEvent,
  render,
  // fireEvent,
  // screen,
  // waitFor,
} from '@testing-library/react'
import { ComponentBase } from '../src/components/core/index'
import { ButtonClose } from '../src/components/buttons/index'
import {
  NotificationBase,
  NotificationItem,
  Notifications,
} from '../src/components/notifications/index'
import { useStoreNotifications } from '../src/stores/useStoreNotifications'
import * as framerMotion from 'framer-motion'
import { INotification } from 'interfaces/notifications'

// Mock useStoreNotifications
const mockRemoveNotification = jest.fn()

jest.mock('../src/stores/useStoreNotifications', () => ({
  useStoreNotifications: jest.fn(() => ({
    removeNotification: mockRemoveNotification,
  })),
}))

// Mock useIsPresent to simulate presence or exit
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  useIsPresent: jest.fn(),
}))

describe('components: [/core], component ComponentBase', () => {
  beforeEach(() => {})
  it('[AnimatedBase]: render with Base template', () => {
    render(<ComponentBase id='hello' />)
  })
})

describe('components: [/buttons], component ButtonClose', () => {
  beforeEach(() => {})
  it('[ButtonClose]: render with Base template', () => {
    render(
      <ButtonClose
        className='c-p-0.5 hover:c-bg-gray-200'
        onClick={() => {}}
        size={24}
      />,
    )
  })
})

describe('components: [/notifications], component NotificationBase', () => {
  beforeEach(() => {})
  it('[NotificationBase]: render with Base template', () => {
    const notification = {
      id: 'hello',
      title: 'Hello',
      message: 'Hello World',
      type: 'info',
      duration: 5000,
    } as INotification
    render(<NotificationBase notification={notification} />)
  })
})

describe('components: [/notifications], component NotificationItem', () => {
  const mockRemoveNotification = jest.fn()
  const notification = {
    id: 'test-id',
    title: 'Title',
    message: 'This is a message',
    type: 'info',
    duration: 4000,
  } as INotification
  jest.useFakeTimers()

  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('[NotificationItem]: render with Base template', () => {
    render(
      <NotificationItem
        key={`notification-item-${notification.id}`}
        notification={notification}
      />,
    )
  })

  it('[NotificationItem]: does NOT call removeNotification if not present', () => {
    ;(useStoreNotifications as unknown as jest.Mock).mockReturnValue({
      removeNotification: mockRemoveNotification,
    })
    ;(framerMotion.useIsPresent as jest.Mock).mockReturnValue(false)

    const { getByRole } = render(
      <NotificationItem notification={notification} />,
    )

    const button = getByRole('button')
    fireEvent.click(button)

    jest.runAllTimers() // Fast-forward until all timers have been executed

    expect(mockRemoveNotification).not.toHaveBeenCalled()
  })
})

describe('components: [/notifications], component Notifications', () => {
  beforeEach(() => {})
  it('[Notifications]: render with Base template', () => {
    jest.mock('../src/stores/useStoreNotifications', () => ({
      useStoreNotifications: () => ({
        notifications: [
          {
            id: 'hello',
            title: 'Hello',
            message: 'Hello World',
            type: 'info',
            duration: 5000,
          },
        ],
        addNotification: jest.fn(),
        removeNotification: jest.fn(),
      }),
    }))
    render(<Notifications />)
  })
})
