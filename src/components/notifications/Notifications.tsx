// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  useStoreNotifications,
  NotificationState,
} from '../../stores/useStoreNotifications'
import { INotification } from '../../interfaces/notifications'
import NotificationItem from './NotificationItem'

export default function Notifications() {
  const notifications = useStoreNotifications(
    (state: NotificationState) => state.notifications,
  )
  return (
    <AnimatePresence>
      {notifications.length > 0 && (
        <motion.ul
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className='c-fixed c-right-0 c-top-0 c-z-[150] c-m-4 c-flex c-max-w-[384px] 
          c-flex-col c-items-end c-gap-y-4 lg:c-m-8'
        >
          {notifications.map((notification: INotification) => (
            <NotificationItem
              key={`notification-item-${notification.id}`}
              notification={notification}
            />
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  )
}
