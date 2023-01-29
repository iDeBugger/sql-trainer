import {
  ComponentMeta,
  ComponentStory,
  ComponentStoryObj,
  Story,
} from "@storybook/react";
import { Item } from "react-stately";
import { Select, SelectProps } from "./Select";

export default {
  title: "Basic/Select",
  component: Select,
  argTypes: {
    name: {
      type: {
        name: "string",
      },
    },
    label: {
      type: {
        name: "string",
      },
    },
    showLabel: {
      type: {
        name: "boolean",
      },
      defaultValue: false,
    },
    elements: {
      name: "elements",
      description: "The elements to show in select.",
      control: "object",
      type: {
        required: true,
        name: "array",
        value: { name: "object", value: { label: { name: "string" } } },
      },
    },
  },
} as ComponentMeta<typeof Select>;

const Template: Story<SelectProps & { elements: { label: string }[] }> = ({
  elements,
  ...args
}) => {
  return (
    <Select {...args} label={args.label}>
      {elements.map(({ label }: { label: string }) => (
        <Item key={label} aria-label={label}>
          {label}
        </Item>
      ))}
    </Select>
  );
};

export const Default = Template.bind({});
Default.args = {
  elements: [{ label: "Русский" }, { label: "English" }],
};

export const FixedWidth = Template.bind({});
FixedWidth.args = {
  elements: [{ label: "Русский" }, { label: "English" }],
  fill: "fixedWidth",
  buttonClassName: "w-[145px]",
};

export const FillContainer = Template.bind({});
FillContainer.args = {
  elements: [{ label: "Русский" }, { label: "English" }],
  fill: "fillContainer",
};

export const HugContent = Template.bind({});
HugContent.args = {
  elements: [{ label: "Русский" }, { label: "English" }],
  fill: "hugContent",
};
