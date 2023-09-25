import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.mjs';
import ComposeSalad from './ComposeSalad'
import { Order, Salad } from './salad.mjs'
import { useState } from 'react';
import ViewOrder from './ViewOrder';


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
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>

      <ViewOrder saladOrders={order} removeSaladOrder={removeSaladOrder} />
      <ComposeSalad inventory={inventory} addSaladOrder={addSaladOrder}/>

      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

export default App;
