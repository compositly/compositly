// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React from "react";
import { MdDangerous, MdOutlineError } from "react-icons/md";
import { FaCircleCheck, FaCircleInfo } from "react-icons/fa6";
import { RiErrorWarningFill } from "react-icons/ri";
import {
  NotificationBaseProps,
  NotificationType,
} from "interfaces/Notification";

const NotificationBase = ({ notification }: NotificationBaseProps) => {
  const getNotificationIconByResult = ({
    type = "success",
  }: {
    type: NotificationType;
  }) => {
    return (
      <div className="c-h-auto c-w-auto c-rounded-full">
        {type === "warning" && (
          <RiErrorWarningFill className="c-text-orange-600" size={34} />
        )}
        {type === "danger" && (
          <MdDangerous className="c-text-red-600" size={34} />
        )}
        {type === "success" && (
          <FaCircleCheck className="c-text-green-600" size={30} />
        )}
        {type === "info" && (
          <FaCircleInfo className="c-text-blue-600" size={30} />
        )}
        {type === "error" && (
          <MdOutlineError className="c-text-red-600" size={34} />
        )}
      </div>
    );
  };
  return (
    <div className="c-relative c-grid c-grid-cols-[36px_1fr] c-h-full c-w-full c-gap-2 c-min-h-[62px]">
      <span
        className="c-relative c-flex c-h-9 c-w-9 c-items-center c-justify-center 
        c-rounded-full c-bg-indigo-100 c-text-[#0077b6]"
      >
        {getNotificationIconByResult({ type: notification.type })}
      </span>
      <div className="c-w-full c-h-full c-flex c-flex-col c-items-start c-justify-start">
        <p className="c-text-gray-900 c-font-semibold">{notification.title}</p>
        <p className="c-text-gray-700 c-font-medium c-text-sm">
          {notification.message}
        </p>
      </div>
    </div>
  );
};

export default NotificationBase;
