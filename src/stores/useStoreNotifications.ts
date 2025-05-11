import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { NewNotification, Notification } from 'interfaces/Notification'

/**
 * Zustand store for managing notifications.
 */
export interface NotificationState {
  notifications: Notification[]
  addNotification: (notification: NewNotification) => void
  removeNotification: (id: string) => void
}

export const useStoreNotifications = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (notification: NewNotification) =>
    set((state: NotificationState) => ({
      notifications: [
        ...state.notifications,
        { id: uuidv4(), ...notification },
      ],
    })),
  removeNotification: (id: string) =>
    set((state: NotificationState) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}))
