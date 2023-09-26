import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.mjs';
import ComposeSalad from './ComposeSalad'
import { Order, Salad } from './salad.mjs'
import { useState } from 'react';
import ViewOrder from './ViewOrder';
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

function App() {
  const [order, setOrder] = useState(new Order());

  function addSaladOrder(saladForm) {
    const salad = new Salad();

    for (const item of saladForm.keys()) {
      salad.add(item, inventory[item]);
    }

    if (salad.count('foundation') && salad.count('protein') && salad.count('dressing')) {
      const newOrder = new Order(order.uuidOrder, order.saladList);
      newOrder.addSalad(salad);
      setOrder(newOrder);
    } else {
      console.log('saladen behöver ha en bas, en protein, och en dressing')
    }
  }

  function removeSaladOrder(e) {
    const newOrder = new Order(order.uuidOrder, order.saladList);
    newOrder.removeSalad(e.target.value);
    setOrder(newOrder);
  }

  return (
    <div className="container py-4">
      <Header />
      <NavBar />

      <ViewOrder saladOrders={order} removeSaladOrder={removeSaladOrder} />
      <ComposeSalad inventory={inventory} addSaladOrder={addSaladOrder} />

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">Min egen salladsbar</span>
    </header>
  );
}

function Footer() {
  return (
    <footer className="pt-3 mt-4 text-muted border-top">
      EDAF90 - webprogrammering
    </footer>
  );
}

function NavBar() {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link className="nav-link" to="/compose-salad">
          Komponera en sallad
        </Link>
      </li>
    {/* more links */}
    </ul>);
  
}

export default App;
