import { createBrowserRouter, Navigate } from "react-router-dom";
import QuizesList from "./pages/QuizesList";
import QuizForm from "./pages/QuizForm";

const Routers = createBrowserRouter([
  { path: "/", element: <QuizesList /> },
  { path: "/quiz", element: <QuizForm /> },
  { path: "/quiz/:id", element: <QuizForm /> },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]);

export default Routers;
