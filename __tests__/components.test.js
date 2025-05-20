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
import { ComponentBase } from '../src/components/core/index'
import { ButtonClose } from '../src/components/buttons/index'
import {
  NotificationBase,
  NotificationItem,
  Notifications,
} from '../src/components/notifications/index'

describe('components: [/core], component ComponentBase', () => {
  beforeEach(() => {})
  it('[AnimatedBase]: render with Base template', () => {
    render(<ComponentBase id='hello' />)
  })
})

describe('components: [/buttons], component ButtonClose', () => {
  beforeEach(() => {})
  it('[ButtonClose]: render with Base template', () => {
    render(<ButtonClose id='hello' />)
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
    }
    render(<NotificationBase notification={notification} />)
  })
})

describe('components: [/notifications], component NotificationItem', () => {
  beforeEach(() => {})
  it('[NotificationItem]: render with Base template', () => {
    const notification = {
      id: 'hello',
      title: 'Hello',
      message: 'Hello World',
      type: 'info',
      duration: 5000,
    }
    render(
      <NotificationItem
        key={`notification-item-${notification.id}`}
        notification={notification}
      />,
    )
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
    render(<Notifications id='hello' />)
  })
})
