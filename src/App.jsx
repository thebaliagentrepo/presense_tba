import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Presence from "./components/Presence";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/presence", element: <Presence /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
