import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import inventory from './inventory.mjs';
import { Order, Salad } from './salad.mjs'
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Spinner from './Spinner';
//import ComposeSalad from './ComposeSalad'
//import ViewOrder from './ViewOrder';


function App() {
  const [order, setOrder] = useState(initOrder);// till skilnad från init() (langa funktionen ist för värdet -> körs en gång)

  function initOrder() {
    let jsonOrder = window.localStorage.getItem('order');
    if (jsonOrder === null) {
      return new Order();
    }
    let sallads = Salad.parse(jsonOrder);
    let salladList = {};
    sallads.forEach( e => {
      e = new Salad(e, undefined, e.uuid);
      salladList[e.uuid] = e;
    });

    return new Order(null, salladList);
  }

  /* function addSaladOrder(saladForm) {
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
  } */

  function removeSaladOrder(e) {
    const newOrder = new Order(order.uuidOrder, order.saladList);
    newOrder.removeSalad(e.target.value);
    setOrderWrapper(newOrder);
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
  
  function Navbar() {
    return (
      <nav>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink className="nav-link" to={'/'}>
              Start
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to={'/compose-salad'}>
              Skapa salad
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to={'/view-order'}>
              Se order  
            </NavLink>
          </li>
        </ul>
      </nav>);    
  }

  function setOrderWrapper(newOrder) {
    let orderToStore = new Order(newOrder.uuidOrder, newOrder.saladList);
    //window.localStorage.clear(); //undvik om jag har flera nycklar, varje skrivning till en nyckel skriver ändå över
    window.localStorage.setItem('order', JSON.stringify(Object.values(orderToStore.saladList)));
    return setOrder(orderToStore); //glömde först att returnera detta, fick to many re-render?
  }

  return (
    <div className="container py-4">
      <Header />
      <Navbar />
      <Spinner />

      <Outlet context={{order, setOrderWrapper, removeSaladOrder}}/>

      {/**<ViewOrder saladOrders={order} removeSaladOrder={removeSaladOrder} />
      <ComposeSalad inventory={inventory} addSaladOrder={addSaladOrder} /> **/}

      <Footer />
    </div>
  );
}

export default App;
