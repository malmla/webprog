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
        <div className={'container m-1'} key={e[0] + ' box'}>
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
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Skapa din salad</h2>
        <form method="post" onSubmit={(e) => {props.handleSubmit(e);startValues();}} key={"form"}>
          <MySaladSelect
            options={Object.entries(props.inventory).filter(entry => entry[1]['foundation'])}
            value={foundation}
            onChange={onFoundationChange}
            name={'selectedFoundation'}
            titel={'Välj bas'}
          />

          <MySaladSelect
            options={Object.entries(props.inventory).filter(entry => entry[1]['protein'])}
            value={protein}
            onChange={onProteinChange}
            name={'selectedProtein'}
            titel={'Välj protein'}
          />

          <h3 className='m-3'>Välj innehållet i din sallad</h3>
          <span className='row container row-cols-4'>
            <MakeCheckboxes extras={extras} />
          </span>

          <MySaladSelect
            options={Object.entries(props.inventory).filter(entry => entry[1]['dressing'])}
            value={dressing}
            onChange={onDressingChange}
            name={'selectedDressing'}
            titel={'Välj dressing'}
          />

          <button type="submit" className='m-3 btn btn-primary'>Lägg i varukorg</button>

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
    <div className='m-3'>
      <h3>{props.titel}</h3>
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