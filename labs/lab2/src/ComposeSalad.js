import { useState } from 'react';

function ComposeSalad(props) {
  const [foundation, setFoundation] = useState('Pasta');
  const [protein, setProtein] = useState('Kycklingfilé');
  const [dressing, setDressing] = useState('Pesto');
  const [extras, setExtra] = useState(new Set().add('Bacon').add('Fetaost'));
  const extrasList = Object.entries(props.inventory).filter(entry => entry[1]['extra']);

  function onDressingChange (e) {
    setDressing(e.target.value);
  }
  function onFoundationChange (e) {
    setFoundation(e.target.value);
  }
  function onProteinChange (e) {
    setProtein(e.target.value);
  }

  function MakeCheckboxes(props) {
    return (
      extrasList.map(e =>
        <input
          type="checkbox"
          key={e[0]}
          name={e[0]}
          defaultChecked={props.extras.has(e[0])}
          onChange={p =>
            {
              (p.target.checked ? props.extras.add(p.target.name) : props.extras.delete(p.target.name))
              setExtra(props.extras);
            }
          }
        />
      )
    )
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

        <h2>Välj innehållet i din sallad</h2> {/** <p>{e[0]} ({e[1]['price']} kr)</p> */}
        <MakeCheckboxes extras={extras}/>

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


export default ComposeSalad;