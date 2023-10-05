import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { useState } from 'react';
import { Order } from "./salad.mjs";
import Toaster from "./Toaster";

function ViewOrder (props) {
  const removeSaladOrder = useOutletContext()['removeSaladOrder'];
  const order = useOutletContext()['order'];
  const setOrder = useOutletContext()['setOrder'];
  //const order = new Order(orderContext.uuidOrder, orderContext.saladList);
  const navigate = useNavigate();
  const [confirmations, setConfirmations] = useState([]);

  async function postJSON(data) {
    try {
      const response = await fetch("http://localhost:8080/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Success:", result);
      setConfirmations(confirmations.push(result));
      console.log(confirmations);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handleRemoveOrder(e) {
    removeSaladOrder(e);
    navigate('../view-order')
  }

  function handlePlaceOrder(event) {
    event.preventDefault();
    let sallads = order.arrayFromOrder();
    postJSON(sallads);
    setOrder(new Order());
    navigate('../view-order');
    //trigga toaster
  }

  return (
  <div className="container col-12">
    <div className="row h-200 p-5 bg-light border rounded-3">

      <Outlet context={{order}}/>

      <h2>Varukorg</h2>
      Order-id: {order.uuidOrder}
      <ul className="list-group row-cols-auto">
        {
          Object.entries(order.saladList).map(salad => 
            <div key={'div-item-' + salad[0]} className="row border border-1">
              <li className="col list-group-item m">
                {`${Object.keys(salad[1]['ingredients']).map(ing => ` ${ing}`)}: ${salad[1].getPrice()} kr`}
              </li>

              <button 
                value={salad[0]} type="button" 
                className='m col-2 btn btn-sm btn-secondary ' 
                onClick={(e) => handleRemoveOrder(e)}
              >
                Ta bort
              </button>
            </div>
          )
        }                            
      </ul>

      <button 
        value={'confirm'} type="button" 
        className='justify-content btn btn-sm btn-primary ' 
        onClick={(e) => handlePlaceOrder(e)}
      >
        Beställ
      </button>

      <Toaster />
    </div>
  </div>
  );
}
export default ViewOrder;