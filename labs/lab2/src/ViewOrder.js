
function ViewOrder (props) {
  //const orders = Object.assign(props.saladOrders);
  return (
  <div className="container col-12">
    <div className="row h-200 p-5 bg-light border rounded-3">
      <h2>Varukorg</h2>
      Order-id: {props.saladOrders.uuidOrder}
      <ul className="list-group row-cols-auto">
        {
          Object.entries(props.saladOrders.saladList).map(salad => 
            <div key={'div-item-' + salad[0]} className="row border border-1">
              <li key={'list-item-' + salad[0]} className="col list-group-item m">
                {`${Object.keys(salad[1]['ingredients']).map(ing => ` ${ing}`)}: ${salad[1].getPrice()} kr`}
              </li>

              <button key={'remove-item-' + salad[0]} 
                value={salad[0]} type="button" 
                className='m col-2 btn btn-sm btn-secondary ' 
                onClick={(e) => props.handleRemoveOrder(e)}
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