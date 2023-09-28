import { Outlet, useNavigate, useOutletContext } from "react-router-dom";

function ViewOrder (props) {
  const removeSaladOrder = useOutletContext()['removeSaladOrder'];
  const order = useOutletContext()['order'];
  const navigate = useNavigate();

  function handleRemoveOrder(e) {
    removeSaladOrder(e);
    navigate('../view-order')
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
                Remove
              </button>
            </div>
          )
        }                            
      </ul>

    </div>
  </div>
  );
}
export default ViewOrder;