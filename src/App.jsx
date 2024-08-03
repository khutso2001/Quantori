import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./router";
function App() {
  return (
    <div>
      <RouterProvider router={createBrowserRouter(router)} />
    </div>
  );
}

export default App;
