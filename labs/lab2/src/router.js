import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import Confirm from "./Confirm";
import ViewIngredient from "./ViewIngredient";

const baseServerURL = "http://localhost:8080";

async function inventoryLoader() {
  const inventory = { Sallad: { price: 10, foundation: true, vegan: true } };
  await new Promise(resolve => setTimeout(resolve, 500));

  /*let promiseFoundations = safeFetchJson(new URL('foundations', baseServerURL))
    .then(result => {
      console.log(result);
      result.forEach(element => {
        let promiseFoundationDetails = fetchIngredient('foundations', element)
          .then(result => {
            inventory[element] = {...result};
            console.log(inventory);
          });
      });
      return result;
    }); */
  let myPromise = [];
  myPromise.push(fetchIngredientType('foundations', inventory));
  myPromise.push(fetchIngredientType('extras', inventory));
  myPromise.push(fetchIngredientType('proteins', inventory));
  myPromise.push(fetchIngredientType('dressings', inventory));
  
  return Promise.all(myPromise).then(_ => {
    return inventory;
  });
}

async function fetchIngredientType (ingredientType, inventory) {
  let promises = [];
  safeFetchJson(new URL(ingredientType, baseServerURL))
  .then(result => {
    result.forEach(element => {
      let promise = fetchIngredient(ingredientType, element);
      promises.push({[element]: promise});
      promise.then(result => {
        inventory[element] = {...result};
      });
    });
  })

  return Promise.all(promises);
}

async function fetchIngredient(type, ingredient) {
  let resp = safeFetchJson(new URL(type + '/' + ingredient, baseServerURL));
  resp.then(properties => {
    console.log({[ingredient]: {...properties}});
  });
  return resp;
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
        element: <h2>Välkommen!</h2>
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