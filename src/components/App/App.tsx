import { Container } from "@mantine/core";
import { useEffect } from "react";
import { useSQLStore } from "../../stores/sqlStore";
import { AppContent } from "./AppContent";
import { AppSkeleton } from "./AppSkeleton";

export default function App() {
  const { init, initStatus } = useSQLStore(({ init, initStatus }) => ({
    init,
    initStatus,
  }));

  useEffect(() => {
    init();
  }, []);

  return (
    <Container size="xl" mt={24}>
      {initStatus !== "READY" && <AppSkeleton />}
      {initStatus === "READY" && <AppContent />}
    </Container>
  );
}
