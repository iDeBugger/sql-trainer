import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Chip } from "./Chip";

export default {
  title: "Basic/Chip",
  component: Chip,
  argTypes: {},
} as ComponentMeta<typeof Chip>;

const Template: ComponentStory<typeof Chip> = (args) => <Chip {...args} />;

export const Default = Template.bind({});
Default.args = {
  "aria-label": "Some random chip",
  children: "4",
};
