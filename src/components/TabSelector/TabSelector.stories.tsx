import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TabSelector } from "./TabSelector";

export default {
  title: "Basic/TabSelector",
  component: TabSelector,
  argTypes: {},
  parameters: {
    viewport: {
      defaultViewport: "mobile_small",
    },
  },
} as ComponentMeta<typeof TabSelector>;

const Template: ComponentStory<typeof TabSelector> = (args) => (
  <TabSelector {...args} />
);

export const Default = Template.bind({});
Default.args = {
  tabs: [
    { title: "Левая", value: "left" },
    { title: "Правая", value: "right" },
  ],
  selected: "left",
};

export const LongTextLeft = Template.bind({});
LongTextLeft.args = {
  tabs: [
    { title: "Левая Левая Левая Левая Левая", value: "left" },
    { title: "Правая", value: "right" },
  ],
  selected: "left",
};

export const LongTextRight = Template.bind({});
LongTextRight.args = {
  tabs: [
    { title: "Левая", value: "left" },
    { title: "Правая Правая Правая Правая Правая", value: "right" },
  ],
  selected: "left",
};
