import { useState } from "react";
import { Button, Textarea } from "@mantine/core";

interface QueryEditorProps {
  onQuerySubmit: (query: string) => void;
}

export function QueryEditor(props: QueryEditorProps) {
  const [query, setQuery] = useState("");

  const submitQuery = () => {
    props.onQuerySubmit(query);
  };

  return (
    <>
      <Textarea
        placeholder="Пишите свой SQL-запрос здесь"
        autosize
        minRows={4}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="outline" onClick={submitQuery}>
        Запустить и проверить запрос
      </Button>
    </>
  );
}
