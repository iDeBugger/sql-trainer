import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // Tomporarily dosable StrictMode due to issue in react-spectrum
  // https://github.com/adobe/react-spectrum/issues/779
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
