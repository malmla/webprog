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

  function handleSubmit (e) {
    e.preventDefault();

    const saladForm = e.target;
    const salad = new FormData(saladForm);
    console.log(salad);
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
  

  return (
    <div className="continer col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <form method="post" onSubmit={handleSubmit} key={"form"}>
          <h2>Välj bas</h2>
          <MySaladSelect
            options={Object.entries(props.inventory).filter(entry => entry[1]['foundation'])}
            value={foundation}
            onChange={onFoundationChange}
            name={'selectedFoundation'}
          />

          <h2>Välj protein</h2>
          <MySaladSelect
            options={Object.entries(props.inventory).filter(entry => entry[1]['protein'])}
            value={protein}
            onChange={onProteinChange}
            name={'selectedProtein'}
          />

          <h2>Välj innehållet i din sallad</h2> {/** <p>{e[0]} ({e[1]['price']} kr)</p> */}
          <MakeCheckboxes extras={extras}/>

          <h2>Välj dressing</h2>
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
      name={props.name}
    >
      {
        options.map(option => <option value={option[0]} key={option[0]}> {option[0]}, ({option[1]['price']} kr)</option>)
      }
    </select>
    </div>
  )
}


export default ComposeSalad;