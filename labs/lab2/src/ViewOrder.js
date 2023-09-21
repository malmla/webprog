
function ViewOrder (props) {
  const orders = Object.assign(props.saladOrders);
    return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Varukorg</h2>
        Order-id: {orders.uuidOrder}
        <ul>
          {console.log(orders['saladList'])}
          {
            Object.entries(orders.saladList).map(salad => 
              <li key={salad[0]}>{`${Object.keys(salad[1]['ingredients'])} ${salad[1].getPrice()} kr`}</li>
            )
          }                            
        </ul>

      </div>
    </div>
    );
}
export default ViewOrder;