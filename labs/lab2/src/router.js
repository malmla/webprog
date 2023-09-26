import { createBrowserRouter, useRouteError } from "react-router-dom";
import App from './App';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "compose-salad",
        element: <p>replace with compose salad component</p>
      },
      {
        path: "view-order",
        element: <p>replace with vieworder</p>
      }
    ]
  },
]);
export default router