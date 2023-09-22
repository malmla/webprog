import { useState } from 'react';

function ComposeSalad(props) {
  const [foundation, setFoundation] = useState('None');
  const [protein, setProtein] = useState('None');
  const [dressing, setDressing] = useState('None');
  const [extras, setExtra] = useState(new Set());
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
        <span 
          className={'container m-1'} 
          key={e[0] + ' box'}
        >

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
        </span>
      )
    )
  }
  
  function startValues() {
    setDressing('None');
    setFoundation('None');
    setProtein('None');
    setExtra(new Set());
  }

  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Skapa din salad</h2>
        <form method="post" onSubmit={(e) => {props.handleSubmit(e);startValues();}} key={"form"}>

          <span className='container row row-cols-auto'>
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

          <MySaladSelect
            options={Object.entries(props.inventory).filter(entry => entry[1]['dressing'])}
            value={dressing}
            onChange={onDressingChange}
            name={'selectedDressing'}
            titel={'Välj dressing'}
          />

          </span>

          <h3 className='m-3'>Välj innehållet i din sallad</h3>
          <span className='row row-cols-4'>
            <MakeCheckboxes extras={extras} />
          </span>

          <button type="submit" className='m-3 btn btn-primary'>Lägg i varukorg</button>
          <button type="button" className='m-3 btn btn-primary' onClick={makeCaesarSalad}>Snabbval: Caesarsalad</button>

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
    <div className='col m-3'>
      <h3>{props.titel}</h3>
      <select
        value={props.value}
        onChange={props.onChange}
        name={props.value}
      >
        <option disabled={true} value={'None'}>None</option>
        {
          options.map(option => <option value={option[0]} key={option[0]}> {option[0]}, ({option[1]['price']} kr)</option>)
        }
      </select>
    </div>
  )
}


export default ComposeSalad;