import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Header } from "./Header";

export default {
  title: "Blocks/Header",
  component: Header,
  argTypes: {
    isDisabled: {},
    variant: {},
    size: {},
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header />;

export const Default = Template.bind({});
Default.args = {};
