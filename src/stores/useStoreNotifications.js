import { create } from 'zustand'

const initialState = {
  notifications: [
    //   {
    //     id: number
    //     read: boolean
    //     type: options: [ui, txn]
    //     method: options: [signin, signup, update, delete, create, read, send, receive, transfer]
    //     result: 'options: [warning, danger, success, info, error]
    //     title: text
    //     message: text
    //     sentAt: date
    //   },
    //   {
    //     id: 1,
    //     read: false,
    //     type: 'txn',
    //     method: 'signin',
    //     result: 'success',
    //     title: 'Sign in',
    //     message: 'You have successfully signed in',
    //     sentAt: '2024-01-23T21:00:00.000Z',
    //   },
    //   {
    //     id: 2,
    //     read: false,
    //     type: 'ui',
    //     method: 'signin',
    //     result: 'danger',
    //     title: 'Identity change',
    //     message: 'Changing your ID may have some consecuences!',
    //     sentAt: '2020-08-10T12:00:00.000Z',
    //   },
    //   {
    //     id: 3,
    //     read: false,
    //     type: 'ui',
    //     method: 'signin',
    //     result: 'warning',
    //     title: 'Modules',
    //     message: 'You need to install the module before using it in your app.',
    //     sentAt: '2023-08-10T12:00:00.000Z',
    //   },
    //   {
    //     id: 4,
    //     read: false,
    //     type: 'ui',
    //     method: 'signin',
    //     result: 'info',
    //     title: 'Upgrade plan',
    //     message: 'You will get a 20% discount by upgrading to the premium plan!',
    //     sentAt: '2024-01-24T18:05:00.000Z',
    //   },
    //   {
    //     id: 5,
    //     read: false,
    //     type: 'txn',
    //     method: 'signin',
    //     result: 'error',
    //     title: 'Sign out',
    //     message: 'Error signing out.',
    //     sentAt: '2024-01-23T12:00:00.000Z',
    //   },
    //   {
    //     id: 6,
    //     read: false,
    //     type: 'ui',
    //     method: 'signin',
    //     result: 'error',
    //     title: 'Cancel plan',
    //     message: 'Your plan has not been canceled. Please try again later.',
    //     sentAt: '2024-01-23T20:00:00.000Z',
    //   },
    //   {
    //     id: 7,
    //     read: false,
    //     type: 'ui',
    //     method: 'signin',
    //     result: 'success',
    //     title: 'OnBoard',
    //     message: 'OnBoarding completed successfully.',
    //     sentAt: '2024-01-10T12:00:00.000Z',
    //   },
  ],
  autoHideDuration: 6000,
  showedNotifications: [],
}

export const useStoreNotifications = create((set) => ({
  ...initialState,
  setNotifications: (notifications) => set(() => ({ notifications })),
  setAutoHideDuration: (autoHideDuration) => set(() => ({ autoHideDuration })),
  setShowedNotifications: (showedNotifications) =>
    set(() => ({ showedNotifications })),
  addShowedNotification: (newNotification) => {
    set((state) => ({
      showedNotifications: [...state.showedNotifications, newNotification],
    }))
  },
  removeShowedNotification: (id) => {
    set((state) => ({
      showedNotifications: state.showedNotifications.filter(
        (notification) => notification.id !== id,
      ),
    }))
  },
  clearShowedNotifications: () => {
    set((state) => ({
      ...state,
      showedNotifications: [],
    }))
  },
  addNotification: (newNotification) => {
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
    }))
  },
  addReadNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
      showedNotifications: state.showedNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    }))
  },
}))
