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
        element: <ComposeSalad inventory={inventory} addSaladOrder={addSaladOrder} />
      },
      {
        path: "view-order",
        element: <ViewOrder saladOrders={order} removeSaladOrder={removeSaladOrder} />
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