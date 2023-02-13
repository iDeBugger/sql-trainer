import { DatabaseId } from "../databases/databases";

export type TaskTopic = "select" | "orderBy" | "join";

export interface Task {
  id: string;
  topic: TaskTopic;
  database: DatabaseId;
  referenceSql: string;
  tables: string[];
}

export const tasksList: Task[] = [
  {
    id: "select_all_invoices",
    topic: "select",
    database: "accounting",
    referenceSql: "SELECT * FROM invoices;",
    tables: ["invoices"],
  },
  {
    id: "select_first_and_last_name_of_employees",
    topic: "select",
    database: "accounting",
    referenceSql: "SELECT first_name, last_name FROM employees;",
    tables: ["employees"],
  },
  {
    id: "select_employees_sorted_by_hire_date_desc",
    topic: "orderBy",
    database: "accounting",
    referenceSql: "SELECT * FROM employees ORDER BY hire_date DESC;",
    tables: ["employees"],
  },
  {
    id: "join_customers_and_employees",
    topic: "join",
    database: "accounting",
    referenceSql: "SELECT * FROM employees ORDER BY hire_date DESC;",
    tables: ["customers", "employees"],
  },
];
