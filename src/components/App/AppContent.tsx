import { Center, Grid, Pagination, Stack, Title } from "@mantine/core";
import { useState } from "react";
import { useExcerciseStore } from "../../stores/excercisesStore";
import { QueryResult, useSQLStore } from "../../stores/sqlStore";
import { ExcerciseTables } from "../ExcerciseTables/ExcerciseTables";
import { ProblemDescription } from "../ProblemDescription/ProblemDescription";
import { QueryEditor } from "../QueryEditor/QueryEditor";
import { QueryResultTable } from "../QueryResultTable/QueryResultTable";

export function AppContent() {
  const { runQuery } = useSQLStore(({ runQuery }) => ({
    runQuery,
  }));
  const { excercises, selectedExcercise } = useExcerciseStore(
    ({ excercises, selectedExcercise }) => ({
      excercises,
      selectedExcercise,
    })
  );
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);

  const checkQuery = (query: string) => {
    const queryResult = runQuery(query);
    setQueryResult(queryResult);
  };

  const referenceceQueryResult = runQuery(
    excercises[selectedExcercise].referenceQuery
  );

  return (
    <Grid>
      <Grid.Col span={6}>
        <ProblemDescription />
      </Grid.Col>
      <Grid.Col span={6}></Grid.Col>
      <Grid.Col span={6}>
        <Stack>
          <QueryEditor onQuerySubmit={checkQuery} />
          <Center>
            <Pagination total={excercises.length} withEdges />
          </Center>
        </Stack>
      </Grid.Col>
      <Grid.Col span={6}>
        <ExcerciseTables />
      </Grid.Col>
      <Grid.Col span={6}>
        <Stack>
          <Title order={4}>Результат вашего запроса</Title>
          {queryResult && <QueryResultTable queryResult={queryResult} />}
        </Stack>
      </Grid.Col>
      <Grid.Col span={6}>
        <Stack>
          <Title order={4}>Ожидаемый результат</Title>
          {referenceceQueryResult && (
            <QueryResultTable queryResult={referenceceQueryResult} />
          )}
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
