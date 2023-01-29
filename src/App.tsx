import { useRef, useState } from "react";
import { Item } from "react-stately";
import { Button } from "./components/Button/Button";
import { Select } from "./components/Select/Select";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Button>Привет как дела</Button>
      <Select name="color" label="Test select">
        <Item>Red</Item>
        <Item>Orange</Item>
        <Item>Yellow</Item>
        <Item>Green</Item>
        <Item>Blue</Item>
        <Item>Purple</Item>
        <Item>Black</Item>
        <Item>White</Item>
        <Item>Lime</Item>
        <Item>Fushsia</Item>
      </Select>
      <h1 className="bg-orange-200 font-bold p-4">Vite + React + Tailwind</h1>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank"></a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
