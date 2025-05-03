/**
 * @jest-environment jsdom
 */

import { render, fireEvent, act } from '@testing-library/react'
import { useStoreNotifications } from '../src/stores/useStoreNotifications'
import { useStoreModals } from '../src/stores/useStoreModals'

// Componente de prueba que utilizará el store
function NotificationTestComponent() {
  const {
    notifications,
    setNotifications,
    showedNotifications,
    setShowedNotifications,
    addNotification,
    addShowedNotification,
    removeShowedNotification,
    clearShowedNotifications,
    addReadNotification,
    autoHideDuration,
    setAutoHideDuration,
  } = useStoreNotifications()
  return (
    <div>
      {/* Acciones para interactuar en las pruebas */}
      <button
        data-testid='add-notification-1'
        onClick={() =>
          addNotification({
            id: 1,
            read: false,
            message: 'Test Notification 1 ',
          })
        }
      >
        Add Notification 1
      </button>
      <button
        data-testid='add-notification-setShowedNotifications'
        onClick={() => {
          setNotifications([
            {
              id: 1,
              read: false,
              message: 'Test Notification 1',
            },
            {
              id: 2,
              read: false,
              message: 'Test Notification 2',
            },
          ])
          setShowedNotifications([
            {
              id: 1,
              message: 'Test Notification 1',
            },
            {
              id: 2,
              message: 'Test Notification 2',
            },
          ])
        }}
      >
        Set Notifications
      </button>
      <button
        data-testid='clear-showed'
        onClick={() => clearShowedNotifications()}
      >
        Clear Showed Notifications
      </button>

      <button
        data-testid='add-notification-2'
        onClick={() =>
          addNotification({
            id: 2,
            read: false,
            message: 'Test Notification 2',
          })
        }
      >
        Add Notification 2
      </button>
      <button data-testid='mark-read' onClick={() => addReadNotification(2)}>
        Mark as Read
      </button>
      <button
        data-testid='add-showed'
        onClick={() =>
          addShowedNotification({ id: 3, message: 'Showed Notification' })
        }
      >
        Add Showed Notification
      </button>
      <button
        data-testid='remove-showed'
        onClick={() => removeShowedNotification(3)}
      >
        Remove Showed Notification
      </button>
      <button
        data-testid='set-duration'
        onClick={() => setAutoHideDuration(5000)}
      >
        Set Duration
      </button>

      {/* Display de información para verificar en las pruebas */}
      <div data-testid='notifications-count'>
        Notifications Count: {notifications.length}
      </div>
      <div data-testid='showed-count'>
        Showed Notifications Count: {showedNotifications.length}
      </div>
      <div data-testid='auto-hide-duration'>
        AutoHide Duration: {autoHideDuration}
      </div>
    </div>
  )
}

describe('stores: [/useStoreNotifications], with local NotificationTestComponent', () => {
  it('[useStoreNotifications]: adds a notification and updates the count', () => {
    const { getByTestId } = render(<NotificationTestComponent />)
    fireEvent.click(getByTestId('add-notification-1'))
    fireEvent.click(getByTestId('add-notification-2'))
    expect(getByTestId('notifications-count').textContent).toBe(
      'Notifications Count: 2',
    )
  })

  it('[useStoreNotifications]: marks a notification as read', () => {
    const { getByTestId } = render(<NotificationTestComponent />)
    // add and mark as read
    act(() => {
      fireEvent.click(getByTestId('add-notification-1'))
      fireEvent.click(getByTestId('add-showed'))
    })
    fireEvent.click(getByTestId('mark-read'))
  })

  it('[useStoreNotifications]: sets auto-hide duration', () => {
    const { getByTestId } = render(<NotificationTestComponent />)
    fireEvent.click(getByTestId('set-duration'))
    expect(getByTestId('auto-hide-duration').textContent).toBe(
      'AutoHide Duration: 5000',
    )
  })

  // TODO: CHECK IF WORKS AND DELETE THIS COMMENT
  it('[useStoreNotifications]: adds multiple notifications and updates the count accordingly', () => {
    const { getByTestId } = render(<NotificationTestComponent />)
    act(() => {
      fireEvent.click(getByTestId('add-notification-1')) // Añade la primera notificación
      fireEvent.click(getByTestId('add-notification-2')) // Intenta añadir otra; necesitarías ajustar para que no sea idéntica
    })
    expect(getByTestId('notifications-count').textContent).toBe(
      'Notifications Count: 5',
    )
  })

  it('[useStoreNotifications]: removes a showed notification and updates the count', () => {
    const { getByTestId } = render(<NotificationTestComponent />)
    act(() => {
      fireEvent.click(getByTestId('add-showed'))
      fireEvent.click(getByTestId('remove-showed'))
    })
    expect(getByTestId('showed-count').textContent).toBe(
      'Showed Notifications Count: 0',
    )
  })

  it('[useStoreNotifications]: attempts to remove a non-existent showed notification', () => {
    const { getByTestId } = render(<NotificationTestComponent />)
    act(() => {
      fireEvent.click(getByTestId('remove-showed'))
    })
    expect(getByTestId('showed-count').textContent).toBe(
      'Showed Notifications Count: 0',
    )
  })

  it('[useStoreNotifications]: marks a non-existent notification as read', () => {
    const { getByTestId } = render(<NotificationTestComponent />)
    act(() => {
      fireEvent.click(getByTestId('mark-read'))
    })
  })

  it('[useStoreNotifications]: checks initial state of the notifications store', () => {
    const { getByTestId } = render(<NotificationTestComponent />)
    expect(getByTestId('notifications-count').textContent).toBe(
      'Notifications Count: 5',
    )
    expect(getByTestId('showed-count').textContent).toBe(
      'Showed Notifications Count: 0',
    )
    expect(getByTestId('auto-hide-duration').textContent).toBe(
      'AutoHide Duration: 5000',
    )
  })

  it('[useStoreNotifications]: sets showed notifications and updates the count', () => {
    const { getByTestId } = render(<NotificationTestComponent />)
    fireEvent.click(getByTestId('add-notification-setShowedNotifications'))
    expect(getByTestId('notifications-count').textContent).toBe(
      'Notifications Count: 2',
    )
  })

  it('[useStoreNotifications]: clears showed notifications and updates the count', () => {
    const { getByTestId } = render(<NotificationTestComponent />)
    act(() => {
      fireEvent.click(getByTestId('add-showed'))
      fireEvent.click(getByTestId('clear-showed'))
    })
    expect(getByTestId('showed-count').textContent).toBe(
      'Showed Notifications Count: 0',
    )
  })
})

function UseStoreModalsTestComponent() {
  const modals = useStoreModals((state) => state.modals)
  const setModal = useStoreModals((state) => state.setModal)
  const openModal = useStoreModals((state) => state.openModal)
  const closeModal = useStoreModals((state) => state.closeModal)

  return (
    <div>
      <button
        data-testid='openTestModal'
        onClick={() => openModal('testModal')}
      >
        Open Profile Summary Edit Photo Modal
      </button>
      <button
        data-testid='closeTestModal'
        onClick={() => closeModal('testModal')}
      >
        Close Profile Summary Edit Photo Modal
      </button>
      <button
        data-testid='setTestModal'
        onClick={() =>
          setModal('testModal', {
            show: true,
            extraInfo: 'test',
          })
        }
      >
        Set Profile Summary Edit Photo Modal
      </button>
      <div data-testid='modalStatus'>
        {modals.testModal.show ? 'Modal is open' : 'Modal is closed'}
      </div>
      <div data-testid='modalExtraInfo'>
        {modals.testModal.extraInfo || 'No extra info'}
      </div>
    </div>
  )
}

describe('stores: [/useStoreModals], with local TestComponent', () => {
  it('should handle opening, closing, and setting modals', () => {
    const { getByTestId } = render(<UseStoreModalsTestComponent />)

    // Initial state check
    expect(getByTestId('modalStatus')).toHaveTextContent('Modal is closed')
    expect(getByTestId('modalExtraInfo')).toHaveTextContent('No extra info')

    // Test opening the modal
    fireEvent.click(getByTestId('openTestModal'))
    expect(getByTestId('modalStatus')).toHaveTextContent('Modal is open')
    expect(getByTestId('modalExtraInfo')).toHaveTextContent('No extra info')

    // Test setting the modal with extra info
    fireEvent.click(getByTestId('setTestModal'))
    expect(getByTestId('modalStatus')).toHaveTextContent('Modal is open')
    expect(getByTestId('modalExtraInfo')).toHaveTextContent('test')

    // Test closing the modal
    fireEvent.click(getByTestId('closeTestModal'))
    expect(getByTestId('modalStatus')).toHaveTextContent('Modal is closed')
    expect(getByTestId('modalExtraInfo')).toHaveTextContent('No extra info')
  })
})
