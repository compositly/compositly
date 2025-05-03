import EmptyBase from './../../../../src/components/empties/EmptyBase'

export default {
  title: 'components/empties/EmptyBase',
  component: EmptyBase,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: {
        type: 'text',
      },
    },
    icon: {
      control: {
        type: 'node',
      },
    },
    className: {
      control: {
        type: 'text',
      },
    },
    bgStyles: {
      control: {
        type: 'text',
      },
    },
    paddingStyles: {
      control: {
        type: 'text',
      },
    },
  },
  // argTypes: {
  //     time: {
  //         control: {
  //             type: 'text',
  //         },
  //     },
  // },
}

const Template = (args) => (
  <div className='bal-mx-auto bal-my-auto bal-flex bal-h-1/2 bal-w-1/2 bal-items-center bal-justify-center'>
    <EmptyBase {...args} />
  </div>
)

export const Base = Template.bind({})
export const Empty = Template.bind({})
export const WithModifiedPaddingStyles = Template.bind({})
export const WithModifiedClasses = Template.bind({})
export const WithIcon = Template.bind({})

Base.args = {}
Empty.args = {
  text: '',
}
WithModifiedPaddingStyles.args = {
  paddingStyles: 'bal-p-5',
}
WithModifiedClasses.args = {
  text: 'This is a test with modified classes',
  className: 'hover:bal-border-solid hover:bal-border-black',
  bgStyles: 'bal-bg-blue-100',
  paddingStyles: 'bal-p-20',
}
WithIcon.args = {
  text: 'This is a test with icon',
  icon: (
    <img
      src='https://compositly.com/_next/static/media/logo.f7ea750c.svg'
      className='bal-h-10 bal-w-10'
    ></img>
  ),
}
