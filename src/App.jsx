import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Staff/Login";
import Presence from "./components/Staff/Presence";
import AdminDashboard from "./components/Admin/AdminDashboard";
import UserManagement from "./components/Admin/UserManagement";
import PresenceAdmin from "./components/Admin/PresenceAdmin";
import TotalLeave from "./components/Admin/TotalLeave";
import LoginAdmin from "./components/Admin/LoginAdmin";
import Infoleave from "./components/Admin/InfoLeave";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/presence", element: <Presence /> },
  { path: "/admin", element: <LoginAdmin /> },
  { path: "/admin/dashboard", element: <AdminDashboard /> },
  { path: "/admin/users", element: <UserManagement /> },
  { path: "/admin/presence", element: <PresenceAdmin /> },
  { path: "/admin/total-leave", element: <TotalLeave /> },
  { path: "/admin/info-leave", element: <Infoleave /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
