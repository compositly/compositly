/**
 * Defines the allowed types of notifications.
 * This type is used to determine the visual appearance and meaning of the notification.
 *
 * @type {('warning' | 'danger' | 'success' | 'info' | 'error')}
 * @description Defines the allowed types of notifications.
 * Used to indicate the severity or category of the message being displayed.
 *
 * @example
 * const notificationType: NotificationType = 'success'
 */
export type NotificationType =
  | "warning"
  | "danger"
  | "success"
  | "info"
  | "error";

/**
 * Interface representing a single notification object.
 * This is used for rendering and managing notifications in the UI.
 *
 * @interface Notification
 * @description Represents a notification message with an identifier, title, message, and type.
 *
 * @property {string} id - The unique identifier of the notification.
 * @property {string} title - The title of the notification.
 * @property {string} message - The main content or description of the notification.
 * @property {NotificationType} type - The type of the notification (e.g., 'success', 'error').
 *
 * @example
 * const notification: Notification = {
 *   id: '1',
 *   title: 'Success!',
 *   message: 'Your operation completed successfully.',
 *   type: 'success',
 * }
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

export interface NotificationsItemProps {
  notification: Notification;
}

export interface NotificationBaseProps {
  notification: Notification;
}
