import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Table } from "./Table";

export default {
  title: "Basic/Table",
  component: Table,
  argTypes: {},
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => (
  <Table
    {...args}
    data={[
      ["Строка 1, Колонка 1", "Строка 1, Колонка 2", "Строка 1, Колонка 3"],
      ["Строка 2, Колонка 1", "Строка 2, Колонка 2", "Строка 2, Колонка 3"],
      ["Строка 3, Колонка 1", "Строка 3, Колонка 2", "Строка 3, Колонка 3"],
      ["Строка 4, Колонка 1", "Строка 4, Колонка 2", "Строка 4, Колонка 3"],
      ["Строка 5, Колонка 1", "Строка 5, Колонка 2", "Строка 5, Колонка 3"],
    ]}
  />
);

export const Default = Template.bind({});
Default.args = {};

export const DefaultWithHeader = Template.bind({});
DefaultWithHeader.args = {
  header: ["Заголовок 1", "Заголовок 2", "Заголовок 3"],
};

export const Zebra = Template.bind({});
Zebra.args = {
  style: "zebra",
};

export const ZebraWithHeader = Template.bind({});
ZebraWithHeader.args = {
  style: "zebra",
  header: ["Заголовок 1", "Заголовок 2", "Заголовок 3"],
};
