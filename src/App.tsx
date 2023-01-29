import { useRef, useState } from "react";
import { Header } from "./blocks/Header/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Header />
    </div>
  );
}

export default App;
