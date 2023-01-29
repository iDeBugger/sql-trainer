import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChevronDown } from "../../assets/icons/ChevronDown";
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

const TemplateSimpleText: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Button</Button>
);

const TemplateTextWithRightIcon: ComponentStory<typeof Button> = (args) => (
  <Button {...args} rightIcon={<ChevronDown />}>
    Button
  </Button>
);

export const Primary = TemplateSimpleText.bind({});
Primary.args = {
  variant: "primary",
};

export const Secondary = TemplateSimpleText.bind({});
Secondary.args = {
  variant: "secondary",
};

export const Tertiary = TemplateSimpleText.bind({});
Tertiary.args = {
  variant: "tertiary",
};

export const Text = TemplateSimpleText.bind({});
Text.args = {
  variant: "text",
};

export const Link = TemplateSimpleText.bind({});
Link.args = {
  variant: "link",
};

export const PrimaryDisabled = TemplateSimpleText.bind({});
PrimaryDisabled.args = {
  isDisabled: true,
};

export const FixedWidthWithOneElement = TemplateSimpleText.bind({});
FixedWidthWithOneElement.args = {
  fill: "fixedWidth",
  className: "w-[250px]",
};

export const FixedWidthWithIcon = TemplateTextWithRightIcon.bind({});
FixedWidthWithIcon.args = {
  fill: "fixedWidth",
  className: "w-[250px]",
};

export const HugContentWithOneElement = TemplateSimpleText.bind({});
HugContentWithOneElement.args = {
  fill: "hugContent",
};

export const HugContentWithIcon = TemplateTextWithRightIcon.bind({});
HugContentWithIcon.args = {
  fill: "hugContent",
};

export const FillContainerWithOneElement = TemplateSimpleText.bind({});
FillContainerWithOneElement.args = {
  fill: "fillContainer",
};

export const FillContainerWithIcon = TemplateTextWithRightIcon.bind({});
FillContainerWithIcon.args = {
  fill: "fillContainer",
};
