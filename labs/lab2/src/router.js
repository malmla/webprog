import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import Confirm from "./Confirm";
import ViewIngredient from "./ViewIngredient";
//import Spinner from "./Spinner";

const baseServerURL = "http://localhost:8080";

async function inventoryLoader() {
  const inventory = { Sallad: { price: 10, foundation: true, vegan: true } };
  //await new Promise(resolve => setTimeout(resolve, 500));

  async function fetchIngredient(type, ingredient) {
    return await safeFetchJson(new URL(type + '/' + ingredient, baseServerURL));
  }

  async function fetchIngredientType (ingredientType, inventory) {
    let promises = [];// anv map ist för for each
    await safeFetchJson(new URL(ingredientType, baseServerURL))
    .then(result => {
      result.forEach(element => {
        let promise = fetchIngredient(ingredientType, element)
        .then(details => {
          inventory[element] = {...details};
        });
        promises.push(promise);
      });
    })
    //console.log(promises);
    return await Promise.all(promises);
  }

  let myPromises = [
  fetchIngredientType('foundations', inventory),
  fetchIngredientType('extras', inventory),
  fetchIngredientType('proteins', inventory),
  fetchIngredientType('dressings', inventory)
  ];
  await Promise.all(myPromises);

  return inventory;
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
        <div className="m">
          <h2>Välkommen!</h2>
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