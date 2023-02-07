import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TextArea } from "./TextArea";

export default {
  title: "Basic/TextArea",
  component: TextArea,
  parameters: {
    viewport: {
      defaultViewport: "tablet_vertical_small",
    },
  },
  argTypes: {
    status: {},
    statusDescription: {
      type: "string",
    },
  },
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => (
  <TextArea
    placeholder="Enter your SQL query here..."
    label="Solution text area"
    {...args}
  ></TextArea>
);

export const Empty = Template.bind({});
Empty.args = {};

export const WithText = Template.bind({});
WithText.args = {
  value: "SELECT * FROM invoices;",
};

export const SuccessEmpty = Template.bind({});
SuccessEmpty.args = {
  status: "SUCCESS",
};

export const SuccessWithText = Template.bind({});
SuccessWithText.args = {
  status: "SUCCESS",
  defaultValue: "SELECT * FROM invoices;",
};

export const SuccessWithTextAndDescription = Template.bind({});
SuccessWithTextAndDescription.args = {
  status: "SUCCESS",
  statusDescription: "Правильный запрос",
  defaultValue: "SELECT * FROM invoices;",
};

export const FailedEmpty = Template.bind({});
FailedEmpty.args = {
  status: "FAIL",
};

export const FailedWithText = Template.bind({});
FailedWithText.args = {
  status: "FAIL",
  defaultValue: "SELECT id FROM invoices;",
};

export const FailedWithTextAndDescription = Template.bind({});
FailedWithTextAndDescription.args = {
  status: "FAIL",
  statusDescription: "Неверный запрос",
  defaultValue: "SELECT id FROM invoices;",
};
