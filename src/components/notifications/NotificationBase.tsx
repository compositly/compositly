// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React from 'react'
import { MdDangerous, MdOutlineError } from 'react-icons/md'
import { FaCircleCheck, FaCircleInfo } from 'react-icons/fa6'
import { RiErrorWarningFill } from 'react-icons/ri'
import { INotification, NotificationType } from 'interfaces/notifications'
import ComponentBase from '../core/ComponentBase'

export interface NotificationBaseProps {
  notification: INotification
}

export default function NotificationBase({
  notification,
}: NotificationBaseProps) {
  const getNotificationIconByResult = ({
    type = 'success',
  }: {
    type: NotificationType
  }) => {
    return (
      <div className='c-flex c-h-auto c-w-auto c-items-center c-justify-center c-rounded-full'>
        {type === 'warning' && (
          <RiErrorWarningFill className='c-text-orange-600' size={34} />
        )}
        {type === 'danger' && (
          <MdDangerous className='c-text-red-600' size={34} />
        )}
        {type === 'success' && (
          <FaCircleCheck className='c-text-green-600' size={30} />
        )}
        {type === 'info' && (
          <FaCircleInfo className='c-text-blue-600' size={30} />
        )}
        {type === 'error' && (
          <MdOutlineError className='c-text-red-600' size={34} />
        )}
      </div>
    )
  }
  return (
    <ComponentBase
      id={`notification-base-${notification.id}`}
      className='c-relative c-grid c-h-full c-min-h-[62px] c-w-full c-grid-cols-[36px_1fr] c-gap-2'
    >
      <span
        className='c-relative c-flex c-h-9 c-w-9 c-items-center c-justify-center 
        c-rounded-full c-bg-indigo-100 c-text-[#0077b6]'
      >
        {getNotificationIconByResult({ type: notification.type })}
      </span>
      <div className='c-flex c-h-full c-w-full c-flex-col c-items-start c-justify-start c-gap-y-1.5'>
        <p className='c-m-0 c-font-semibold c-text-gray-900'>
          {notification.title}
        </p>
        <p className='c-m-0 c-text-sm c-font-medium c-text-gray-700'>
          {notification.message}
        </p>
      </div>
    </ComponentBase>
  )
}
