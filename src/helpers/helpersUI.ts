export const notificationMotionVariants = {
  initial: {
    opacity: 0,
    x: 500,
  },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    x: 500,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
}
