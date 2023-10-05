import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import Confirm from "./Confirm";
import ViewIngredient from "./ViewIngredient";
import Spinner from "./Spinner";

const baseServerURL = "http://localhost:8080";

async function inventoryLoader() {
  const inventory = { Sallad: { price: 10, foundation: true, vegan: true } };
  await new Promise(resolve => setTimeout(resolve, 500));

  let myPromises = [];
  myPromises.push(fetchIngredientType('foundations', inventory));
  myPromises.push(fetchIngredientType('extras', inventory));
  myPromises.push(fetchIngredientType('proteins', inventory));
  myPromises.push(fetchIngredientType('dressings', inventory));

  return await Promise.all(myPromises).then( _ => {
    return inventory;
  });
}

function fetchIngredientType (ingredientType, inventory) {
  let promises = [];
  safeFetchJson(new URL(ingredientType, baseServerURL))
  .then(result => {
    result.forEach(element => {
      let promise = fetchIngredient(ingredientType, element);
      promise.then(details => {
        inventory[element] = {...details};
      });

      promises.push({[element]: promise});
    });
  })

  return Promise.all(promises);
}

async function fetchIngredient(type, ingredient) {
  return await safeFetchJson(new URL(type + '/' + ingredient, baseServerURL));
}

function safeFetchJson(url) {
  return fetch(url)
    .then(response => {
      if(!response.ok) {
        throw new Error(`${url} returned status ${response.status}`);
      }
      return response.json();
    });
}


const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        element:
        <div>
          <h2>Välkommen!</h2>
          <Spinner />
        </div>
      },
      {
        path: "compose-salad",
        loader: inventoryLoader,
        element: <ComposeSalad />,
        children: [
          {
            path: "view-ingredient/:name",
            element: <ViewIngredient />
          }
        ]
      },
      {
        path: "view-order",
        element: <ViewOrder />,
        children: [
          {
            path: "confirm/:uuid",
            element: <Confirm />
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