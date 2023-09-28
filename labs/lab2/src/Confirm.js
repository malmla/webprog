import { useOutletContext, useParams } from "react-router-dom";


function Confirm(props) {

  const params = useParams();
  const uuid = params.uuid;
  const order = useOutletContext()['order'];

  return (
    order.saladList[uuid] ?
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      Salad {uuid} tillagd!
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    : 
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      Fel uppstod: Salad {uuid} finns ej!
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  );
}

export default Confirm;
