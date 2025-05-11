// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStoreNotifications } from "../../stores/useStoreNotifications";
import { Notification } from "../../interfaces/Notification";
import NotificationsItem from "./NotificationsItem";

const Notifications = () => {
  const notifications = useStoreNotifications((state) => state.notifications);
  return (
    <AnimatePresence>
      {notifications.length > 0 && (
        <motion.ul
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="c-fixed c-z-[150] c-flex c-flex-col c-gap-y-4 c-m-4 lg:c-m-8 
          c-max-w-[384px] c-top-0 c-right-0 c-items-end"
        >
          {notifications.map((notification: Notification) => (
            <NotificationsItem
              key={`notification-item-${notification.id}`}
              notification={notification}
            />
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default Notifications;
