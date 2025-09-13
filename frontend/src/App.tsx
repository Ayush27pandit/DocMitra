// App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./component/landing/LandingPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./component/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
