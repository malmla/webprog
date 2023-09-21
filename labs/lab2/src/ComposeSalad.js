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
    const newExtras = new Set();
    props.extras.forEach(element => {
      newExtras.add(element)
    });
    return (
      extrasList.map(e =>
        <div className={'extra-box'} key={e[0] + ' box'}>
        <input
          type="checkbox"
          key={e[0]}
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
        </div>
      )
    )
  }
  
  function startValues() {
    setDressing('Pesto');
    setFoundation('Pasta');
    setProtein('Kycklingfilé');
    setExtra(new Set().add('Bacon').add('Fetaost'));
  }

  return (
    <div className="continer col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Skapa din salad</h2>
        <form method="post" onSubmit={(e) => {props.handleSubmit(e);startValues();}} key={"form"}>
          <h3>Välj bas</h3>
          <MySaladSelect
            options={Object.entries(props.inventory).filter(entry => entry[1]['foundation'])}
            value={foundation}
            onChange={onFoundationChange}
            name={'selectedFoundation'}
          />

          <h3>Välj protein</h3>
          <MySaladSelect
            options={Object.entries(props.inventory).filter(entry => entry[1]['protein'])}
            value={protein}
            onChange={onProteinChange}
            name={'selectedProtein'}
          />

          <h3>Välj innehållet i din sallad</h3> {/** <p>{e[0]} ({e[1]['price']} kr)</p> */}
          <MakeCheckboxes extras={extras}/>

          <h3>Välj dressing</h3>
          <MySaladSelect
            options={Object.entries(props.inventory).filter(entry => entry[1]['dressing'])}
            value={dressing}
            onChange={onDressingChange}
            name={'selectedDressing'}
          />

          <button type="submit">Lägg i varukorg</button>

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


function MySaladSelect(props) {
  let options = props.options;
  return (
    <div>
    <select
      value={props.value}
      onChange={props.onChange}
      name={props.value}
    >
      {
        options.map(option => <option value={option[0]} key={option[0]}> {option[0]}, ({option[1]['price']} kr)</option>)
      }
    </select>
    </div>
  )
}


export default ComposeSalad;