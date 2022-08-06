import { Center, Grid, Skeleton } from "@mantine/core";

export function AppSkeleton() {
  return (
    <Grid>
      <Grid.Col span={6}>
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} width="70%" mt={6} radius="xl" />
      </Grid.Col>
      <Grid.Col span={6}></Grid.Col>
      <Grid.Col span={6}>
        <Skeleton height={100} />
        <Skeleton height={25} mt={6} />
        <Center mt={6}>
          <Skeleton height={25} width={25} mr={6} />
          <Skeleton height={25} width={25} mr={6} />
          <Skeleton height={25} width={25} mr={6} />
          <Skeleton height={25} width={25} mr={6} />
          <Skeleton height={25} width={25} mr={6} />
          <Skeleton height={25} width={25} mr={6} />
          <Skeleton height={25} width={25} mr={6} />
          <Skeleton height={25} width={25} mr={6} />
        </Center>
      </Grid.Col>
      <Grid.Col span={6}>
        <Grid>
          <Grid.Col span={6}>
            <Skeleton height={150} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={150} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={150} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={150} />
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  );
}
