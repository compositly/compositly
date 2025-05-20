// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React, { useEffect } from 'react'
import { motion, useIsPresent } from 'framer-motion'
import { useTimeoutFn } from 'react-use'
import { INotification } from '../../interfaces/notifications'
import { useStoreNotifications } from '../../stores/useStoreNotifications'
import { notificationMotionVariants } from '../../helpers/helpersUI'
import ButtonClose from '../buttons/ButtonClose'
import NotificationBase from './NotificationBase'

export interface NotificationsItemProps {
  notification: INotification
}

export default function NotificationItem({
  notification,
}: NotificationsItemProps) {
  const removeNotification = useStoreNotifications(
    (state) => state.removeNotification,
  )
  const isPresent = useIsPresent()
  const handleRemoveNotification = () => {
    if (!isPresent) return
    removeNotification(notification.id)
  }
  const [, cancel, reset] = useTimeoutFn(() => handleRemoveNotification(), 4000)
  useEffect(() => {
    reset()
  }, [notification, reset])
  return (
    <motion.li
      key={`motion-notification-${notification.id}`}
      id={`motion-notification-${notification.id}-id`}
      initial='initial'
      animate='animate'
      exit='exit'
      variants={notificationMotionVariants}
      layout
      onMouseEnter={cancel}
      onMouseLeave={reset}
      className='c-transition-2 c-relative c-h-auto c-min-w-[270px] c-max-w-[370px] 
      c-cursor-default c-list-none c-rounded-md c-border-2 c-border-gray-200 c-bg-white c-pb-1.5 c-pl-2  
      c-pr-6 c-pt-3 c-shadow-md hover:c-bg-gray-50 hover:c-shadow-lg'
    >
      <ButtonClose
        className='c-absolute c-right-1 c-top-1 c-z-10 c-p-0.5 hover:c-bg-gray-200'
        onClick={handleRemoveNotification}
        size={24}
      />
      <NotificationBase notification={notification} />
    </motion.li>
  )
}
