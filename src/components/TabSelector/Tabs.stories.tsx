import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Item } from "react-stately";
import { Tabs } from "./Tabs";

export default {
  title: "Basic/Tabs",
  component: Tabs,
  argTypes: {},
  parameters: {
    viewport: {
      defaultViewport: "mobile_small",
    },
  },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args}>
    <Item key="left" title="Left">
      Left Content
    </Item>
    <Item key="right" title="Right">
      Right Content
    </Item>
  </Tabs>
);

export const Default = Template.bind({});
Default.args = {};
