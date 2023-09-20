import { useState } from 'react';

function ComposeSalad(props) {
  const [foundation, setFoundation] = useState('Pasta');
  const [protein, setProtein] = useState('Kycklingfilé');
  const [dressing, setDressing] = useState('Pesto');
  const [extras, setExtra] = useState({ Bacon: true, Fetaost: true });

  function onDressingChange (e) {
    setDressing(e.target.value);
  }
  function onFoundationChange (e) {
    setFoundation(e.target.value);
  }
  function onProteinChange (e) {
    setProtein(e.target.value);
  }

  return (
    <div className="continer col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj bas</h2>
        <MySaladSelect
          options={Object.entries(props.inventory).filter(entry => entry[1]['foundation'])}
          value={foundation}
          onChange={onFoundationChange}
        />

        <h2>Välj protein</h2>
        <MySaladSelect
          options={Object.entries(props.inventory).filter(entry => entry[1]['protein'])}
          value={protein}
          onChange={onProteinChange}
        />

        <h2>Välj innehållet i din sallad</h2>
        <MakeExtras />

        <h2>Välj dressing</h2>
        <MySaladSelect
          options={Object.entries(props.inventory).filter(entry => entry[1]['dressing'])}
          value={dressing}
          onChange={onDressingChange}
        />
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

function MySaladSelect(props) {
  let options = props.options;
  return (
    <select
      value={props.value}
      onChange={props.onChange}
    >
      {
        options.map(option => <option value={option[0]} key={option[0]}> {option[0]}, ({option[1]['price']} kr)</option>)
      }
    </select>
  )
}

function MakeExtras(props) {
  return 
}

export default ComposeSalad;