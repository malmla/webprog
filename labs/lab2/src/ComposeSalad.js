import { useState } from 'react';

function ComposeSalad(props) {
  const foundationList = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const [foundation, setFoundation] = useState('Pasta');
  const [extras, setExtra] = useState({ Bacon: true, Fetaost: true });

  return (
    <div className="continer col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj bas</h2>
        <select name="selectedFoundation" value="Pasta">
          {makeOptions(props.inventory, "foundation")}
        </select>
      </div>
    </div>
  );
}

function makeOptions(inv, prop) {
  let options = Object.entries(inv);
  return options
    .filter(option => option[1][prop])
    .map(option => `<option value="${option[0]}" key="${option[0]}"> ${option[0]}, ${option[1]['price']} kr</option>`)
    .reduce((accum, curr) => accum + '\n' + curr);
}

export default ComposeSalad;