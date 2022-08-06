import { Text } from "@mantine/core";
import { useExcerciseStore } from "../../stores/excercisesStore";

export function ProblemDescription() {
  const { excercises, selectedExcercise } = useExcerciseStore(
    ({ excercises, selectedExcercise }) => ({
      excercises,
      selectedExcercise,
    })
  );
  const description = excercises[selectedExcercise].description;

  return (
    <>
      <Text size="md">{description}</Text>
    </>
  );
}
