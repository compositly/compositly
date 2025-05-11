import { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import Notifications from '../../../../src/components/notifications'
import { useStoreNotifications } from '../../../../src/stores/useStoreNotifications'
import { NewNotification } from '../../../../src/interfaces/Notification'

const meta: Meta<typeof Notifications> = {
  title: 'components/notifications/Notifications',
  component: Notifications,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`<Notifications />\` component renders floating messages in the top-right corner of the screen. It supports different types like \`success\`, \`error\`, \`warning\`, \`info\`, and \`danger\`, with smooth entrance and exit animations using Framer Motion.

It uses **Zustand** for state management and exposes a global store:

\`\`\`ts
import { useStoreNotifications } from 'stores/useStoreNotifications';

const addNotification = useStoreNotifications(state => state.addNotification);

addNotification({
  title: "Success",
  message: "The operation was completed successfully.",
  type: "success"
});
\`\`\`

### How to use it:

1. **Render the component once globally**, ideally inside \`App.tsx\` or your main layout file:

\`\`\`tsx
import Notifications from 'compositly/components/notifications';

function App() {
  return (
    <>
      <YourRoutesOrLayout />
      <Notifications />
    </>
  );
}
\`\`\`

2. **Trigger notifications from anywhere** using the Zustand store.

This component is meant to be mounted only once. It automatically handles auto-dismiss behavior with a hover pause, and renders each notification with consistent UI.
      `,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Notifications>

const notificationVariants: NewNotification[] = [
  {
    title: 'Success',
    message: 'The operation was completed successfully.',
    type: 'success',
  },
  {
    title: 'Warning',
    message:
      'There might be an issue. Please check your configuration. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.',
    type: 'warning',
  },
  {
    title: 'Error',
    message: 'There was an error processing your request.',
    type: 'error',
  },
  {
    title: 'Info',
    message: 'This is an informational message.',
    type: 'info',
  },
  {
    title: 'Danger',
    message: 'This action is dangerous. Proceed with caution.',
    type: 'danger',
  },
]

const Template = () => {
  const addNotification = useStoreNotifications(
    (state) => state.addNotification,
  )
  const [index, setIndex] = useState(0)

  const handleClick = () => {
    addNotification(notificationVariants[index])
    setIndex((prev) => (prev + 1) % notificationVariants.length)
  }

  return (
    <div className='c-relative c-flex c-h-40 c-w-full c-items-center c-justify-start c-overflow-hidden'>
      <button
        onClick={handleClick}
        className='c-cursor-pointer c-rounded-md c-border-none c-bg-blue-600 c-px-4 
        c-py-2 c-text-white c-transition hover:c-bg-blue-700'
      >
        Show Notification
      </button>
      <Notifications />
    </div>
  )
}

export const Interactive: Story = {
  // name: "Interactive",
  render: Template,
}
