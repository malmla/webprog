import { useState } from 'react';
import { useOutletContext, useNavigate, Outlet, NavLink } from 'react-router-dom';
import { Salad, Order } from './salad.mjs';
//import inventory from './inventory.mjs';

function ComposeSalad(props) {
  const [foundation, setFoundation] = useState("");
  const [protein, setProtein] = useState("");
  const [dressing, setDressing] = useState("");
  const [extras, setExtra] = useState(new Set());
  const order = useOutletContext()['order'];
  const setOrder = useOutletContext()['setOrder'];
  const inventory = useOutletContext()['inventory'];
  const navigate = useNavigate();

  const extrasList = Object.entries(inventory).filter(entry => entry[1]['extra']);

  function onDressingChange (e) {
    setDressing(e.target.value);
  }
  function onFoundationChange (e) {
    setFoundation(e.target.value);
  }
  function onProteinChange (e) {
    setProtein(e.target.value);
  }

  function makeCaesarSalad () {
    setDressing('Ceasardressing');
    setFoundation('Sallad');
    setProtein('Kycklingfilé');
    setExtra(new Set().add('Gurka').add('Parmesan').add('Krutonger').add('Bacon'));
  }

  function MakeCheckboxes(props) {
    const newExtras = new Set();
    props.extras.forEach(element => {
      newExtras.add(element)
    });
    return (
      extrasList.map(e =>
        <NavLink className="nav-link justify-content" to={'/compose-salad/view-ingredient/' + e[0]}>
        <span 
          className={'container m-1'} 
          key={e[0] + ' box'}
        >

        <input
          type="checkbox"
          name={e[0]}
          defaultChecked={newExtras.has(e[0])}
          onChange={p =>
            {
              (p.target.checked ? newExtras.add(p.target.name) : newExtras.delete(p.target.name))
              setExtra(newExtras);
            }
          }
        />
        {` ${e[0]}, (${e[1]['price']} kr)`}
        </span>
        </NavLink>
      )
    )
  }
  
  function setToStartValues() {
    setDressing("");
    setFoundation("");
    setProtein("");
    setExtra(new Set());
  }

  function addSaladOrder(saladForm) {
    const salad = new Salad();

    for (const item of saladForm.keys()) {
      salad.add(item, inventory[item]);
    }

    if (salad.count('foundation') && salad.count('protein') && salad.count('dressing')) {
      const newOrder = new Order(order.uuidOrder, order.saladList);
      newOrder.addSalad(salad);
      setOrder(newOrder);
      navigate('/view-order/confirm/' + salad.uuid);
    } else {
      console.log('saladen behöver ha en bas, en protein, och en dressing')
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.target.classList.add("was-validated");

    // only make a salad if valid form
    if (e.target.checkValidity()) {
      const formSalad = new FormData(e.target);
      addSaladOrder(formSalad);
      setToStartValues();
      e.target.classList.remove("was-validated");
    }

  }

  function MySaladSelect(props) {
    let options = props.options;
    return (
      <div className='m-3'>
        <h3>Välj {props.titel}</h3>
        <select
          value={props.value}
          onChange={props.onChange}
          name={props.value}
          className='form-select m-3'
          required
        >
          <option value={""}></option>
          {
            options.map(option => <option value={option[0]} key={option[0]}> {option[0]}, ({option[1]['price']} kr)</option>)
          }
        </select>
  
        <span>
          <NavLink to={'view-ingredient/' + props.value}>
            <button type="button" className='m-3 btn btn-secondary'>View details</button>
          </NavLink>
        </span>
  
        <div className='invalid-feedback'>
          Din salad måste innehålla en {props.titel}.
        </div>
      </div>
    )
  }

  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2 className='m-3'>Skapa din salad</h2>
        <form 
          onSubmit={(e) => {handleSubmit(e)}}
          noValidate        
        >

          <span className='container row row-cols-auto justify-content-center'>
          <MySaladSelect
            options={Object.entries(inventory).filter(entry => entry[1]['foundation'])}
            value={foundation}
            onChange={onFoundationChange}
            name={'selectedFoundation'}
            titel={'bas'}
          />

          <MySaladSelect
            options={Object.entries(inventory).filter(entry => entry[1]['protein'])}
            value={protein}
            onChange={onProteinChange}
            name={'selectedProtein'}
            titel={'protein'}
          />

          <MySaladSelect
            options={Object.entries(inventory).filter(entry => entry[1]['dressing'])}
            value={dressing}
            onChange={onDressingChange}
            name={'selectedDressing'}
            titel={'dressing'}
          />

          </span>

          <div>

            <h3 className='m-3'>Välj tillägg till din sallad</h3>
            <span className='row row-cols-4 justify-content-start'>
              <MakeCheckboxes extras={extras} />
            </span>

            <Outlet />

          </div>

          <div className='col justify-content-end'>
            <button type="submit" className='m-3 btn btn-primary'>Lägg i varukorg</button>
            <button type="button" className='m-3 btn btn-primary' onClick={makeCaesarSalad}>Snabbval: Caesarsalad</button>
          </div>

        </form>
      </div>

      
    </div>
  );

}

/* 
function makeOptions(inv, prop) {
  let options = Object.entries(inv);

  return options
    .filter(option => option[1][prop])
    .map(option => <option value={option[0]} key={option[0]}> {option[0]}, ({option[1]['price']} kr)</option>);
} 
*/





export default ComposeSalad;