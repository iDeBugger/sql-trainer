import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "./Button";

export default {
  title: "Basic/Button",
  component: Button,
  argTypes: {
    isDisabled: {},
    variant: {},
    size: {},
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Button</Button>
);

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
};

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
  isDisabled: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  variant: "tertiary",
};

export const Text = Template.bind({});
Text.args = {
  variant: "text",
};

export const Link = Template.bind({});
Link.args = {
  variant: "link",
};
