import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "compose-salad",
        element: <ComposeSalad />
      },
      {
        path: "view-order",
        element: <ViewOrder />,
        children: [
          {
            path: "confirm/:uuid",
            element: <p>vad ska in här egentligen?</p>
          }
        ]
      },
      {
        path: "*",
        element: <h2>Sidan du letar efter kan ej hittas.</h2>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default router