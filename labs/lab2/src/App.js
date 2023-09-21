import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.mjs';
import ComposeSalad from './ComposeSalad'
import { Order, Salad } from './salad.mjs'
import { useState } from 'react';
import ViewOrder from './ViewOrder';


function App() {
  const [order, setOrder] = useState(new Order());

  function handleSubmit(e) {
    e.preventDefault();
    const formSalad = new FormData(e.target);
    const salad = new Salad();

    for (const item of formSalad.keys()) {
      salad.add(item, inventory[item]);
    }

    const newOrder = Object.assign(order);
    newOrder.addSalad(salad);
    setOrder(newOrder);
  }

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>

      <ViewOrder saladOrders={order} />
      <ComposeSalad inventory={inventory} handleSubmit={handleSubmit}/>

      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

export default App;
