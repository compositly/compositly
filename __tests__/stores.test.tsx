/**
 * @jest-environment jsdom
 */

import { act } from '@testing-library/react'
import { useStoreNotifications } from '../src/stores/useStoreNotifications'
import { NewNotification } from 'interfaces/notifications'

// describe('services: [/nofiles], no tests yet...', () => {
//   it('[method]: not tests and no files', () => {
//     // TODO: add tests
//     expect(true).toBe(true)
//   })
// })

describe('stores: [/] store useStoreNotifications', () => {
  afterEach(() => {
    useStoreNotifications.setState({ notifications: [] })
  })

  it('[NotificationItem]: should add a notification', () => {
    const newNotification = {
      title: 'Test',
      message: 'This is a test',
      type: 'info',
    } as NewNotification

    act(() => {
      useStoreNotifications.getState().addNotification(newNotification)
    })

    const notifications = useStoreNotifications.getState().notifications
    expect(notifications).toHaveLength(1)
    expect(notifications[0]).toMatchObject(newNotification)
    expect(notifications[0].id).toBeDefined()
  })

  it('[NotificationItem]: should remove a notification by id', () => {
    const newNotification = {
      title: 'To remove',
      message: 'Remove me',
      type: 'warning',
    } as NewNotification

    let id: string

    act(() => {
      useStoreNotifications.getState().addNotification(newNotification)
      id = useStoreNotifications.getState().notifications[0].id
      useStoreNotifications.getState().removeNotification(id)
    })

    const notifications = useStoreNotifications.getState().notifications
    expect(notifications).toHaveLength(0)
  })
})
