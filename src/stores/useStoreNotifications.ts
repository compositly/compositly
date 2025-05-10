import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

/**
 * Defines the allowed types of notifications.
 * This type is used to determine the visual appearance and meaning of the notification.
 *
 * @type {('warning' | 'danger' | 'success' | 'info' | 'error')}
 */
export type NotificationType =
  | "warning"
  | "danger"
  | "success"
  | "info"
  | "error";

/**
 * Interface representing a single notification object.
 *
 * @interface Notification
 * @property {string} id - Unique identifier.
 * @property {string} title - Title of the notification.
 * @property {string} message - Message content.
 * @property {NotificationType} type - Type of the notification.
 */
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
}

/**
 * Props needed to create a new notification (without id).
 */
export type NewNotification = Omit<Notification, "id">;

/**
 * Zustand store for managing notifications.
 */
interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: NewNotification) => void;
  removeNotification: (id: string) => void;
}

export const useStoreNotifications = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (notification: NewNotification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: uuidv4(), ...notification },
      ],
    })),
  removeNotification: (id: string) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
