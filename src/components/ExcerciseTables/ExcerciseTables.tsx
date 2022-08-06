import { Grid, Paper, ScrollArea, Table, Title } from "@mantine/core";
import { useExcerciseStore } from "../../stores/excercisesStore";
import { useSQLStore } from "../../stores/sqlStore";

export function ExcerciseTables() {
  const runQuery = useSQLStore((store) => store.runQuery);
  const { excercises, selectedExcercise } = useExcerciseStore(
    ({ excercises, selectedExcercise }) => ({
      excercises,
      selectedExcercise,
    })
  );
  const { tablesOfInterest } = excercises[selectedExcercise];
  const tablesDescription = tablesOfInterest.map((tableName) => {
    const tableDescription = runQuery(`PRAGMA table_info('${tableName}')`);
    return {
      name: tableName,
      description: tableDescription,
    };
  });

  console.log("tablesDescription", tablesDescription);

  return (
    <Grid>
      {tablesDescription.map(
        (table, i) =>
          table.description.result && (
            <Grid.Col key={i} span={4}>
              <Title order={4} mb={8}>
                Таблица {table.name}
              </Title>
              <Paper shadow="sm" withBorder>
                <ScrollArea>
                  <Table>
                    <thead>
                      <tr>
                        <th>Имя</th>
                        <th>Тип</th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.description.result[0].values.map((row, id) => (
                        <tr key={id}>
                          <td>{row[1]}</td>
                          <td>{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </ScrollArea>
              </Paper>
            </Grid.Col>
          )
      )}
    </Grid>
  );
}
