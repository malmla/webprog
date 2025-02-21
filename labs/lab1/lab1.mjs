'use strict';
/** R1
 * Reflection question 1
 * your answer goes here
 * truthy/falsy - in this case undefined = falsy (falsy if undefined, null, "", 0, -0, NaN, false)
 */

import inventory from './inventory.mjs';
import {Salad as Salad, GourmetSalad as GourmetSalad, Order as Order} from './salad.mjs';
console.log('\n=== beginning of printout ================================');
/* console.log('inventory:', inventory);

console.log('\n--- Object.keys() ---------------------------------------');
const names = Object.keys(inventory);
names
  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
  .forEach((name) => console.log(name));

console.log('\n--- for ... in ---------------------------------------');
for (const name in inventory) {
  console.log(name);
} */

/** R2
 * Reflection question 2
 * when will 'in' and 'forEach' give different outputs?
 * 'in' looks at inherited enumerable properties wheras 'forEach' does not,
 * if 'inventory' had a prototype with more enumerable properties there would be different outputs
 * Object.defineProperty(obj, "nonEnum", {enumerable: false,}); to set enumerable t/f
 * why are inherited functions not printed?
 * functions are not enumerable by default
 */

console.log('\n--- Assignment 1 ---------------------------------------');

function makeOptions(inv, prop) {
  let options = Object.entries(inv);
  return options
    .filter(option => option[1][prop])
    .map(option => `<option value="${option[0]}" key="${option[0]}"> ${option[0]}, ${option[1]['price']} kr</option>`)
    .reduce((accum, curr) => accum + '\n' + curr);
}

console.log(makeOptions(inventory, 'dressing'));

console.log('\n--- Assignment 2 ---------------------------------------');

let myCaesarSalad = new Salad()
  .add('Sallad', inventory['Sallad'])
  .add('Kycklingfilé', inventory['Kycklingfilé'])
  .add('Bacon', inventory['Bacon'])
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'])
  .add('Ceasardressing', inventory['Ceasardressing'])
  .add('Gurka', inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');

console.log('\n--- Assignment 3 ---------------------------------------')



console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
// En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('lactose') + ' ingredienser med laktos');
// En ceasarsallad har 2 ingredienser med laktos
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
// En ceasarsallad har 3 tillbehör


console.log('\n--- reflection question 3 ---------------------------------------')
{
  console.log('typeof Salad: ' + typeof Salad);
  console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
  console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
  console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
  console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
  console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(Salad)));
  console.log('check 2: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
  console.log('check 3: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));
}
//console.log('check 4: ' + (Salad.prototype + ' ' + Object.getPrototypeOf(Salad)));

/** Refl3
  * How are classes and inherited properties represented in JavaScript?
  *
  * classes are functions, inherited properties 'up' prototype chain
  *
  * What is the difference between an object’s prototype chain and having a prototype
property?
  *
  * Not sure
  *
  * Which objects have a prototype property? How do you get the next object in
the prototype chain?
  * chaining through until null,
  *
  */

console.log('\n--- Assignment 4 ---------------------------------------')


const singleText = JSON.stringify(myCaesarSalad);
const arrayText = JSON.stringify([myCaesarSalad, myCaesarSalad]);

const objectCopy = new Salad(myCaesarSalad);
const singleCopy = Salad.parse(singleText);
const arrayCopy = Salad.parse(arrayText);

console.log('original myCaesarSalad\n' + JSON.stringify(myCaesarSalad));
console.log('new(myCaesarSalad)\n' + JSON.stringify(objectCopy));
console.log('Salad.parse(singleText)\n' + JSON.stringify(singleCopy));
console.log('Salad.parse(arrayText)\n' + JSON.stringify(arrayCopy));

singleCopy.add('Gurka', inventory['Gurka']);
console.log('originalet kostar ' + myCaesarSalad.getPrice() + ' kr');
console.log('kopian med gurka kostar ' + singleCopy.getPrice() + ' kr');



console.log('\n--- Assignment 5 ---------------------------------------')



let myGourmetSalad = new GourmetSalad()
  .add('Sallad', inventory['Sallad'], 0.5)
  .add('Kycklingfilé', inventory['Kycklingfilé'], 2)
  .add('Bacon', inventory['Bacon'], 0.5)
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'], 2)
  .add('Ceasardressing', inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');


console.log('\n--- Assignment 6 ---------------------------------------')
//myGourmetSalad.id = 1;

console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);

/**
 * Reflection question 4
 * se block
 */
/**
 * Reflection question 5
 * kommentera ur under ass6 för felmeddelande, blir bara felmeddelande i strict mode
 */
/**
 * Reflection question 6
 * ja det går att ha private fields
 */

console.log('\n--- Order ----------------------------------------------')
let myOrder = new Order();
myOrder.addSalad(myCaesarSalad);
myOrder.addSalad(myGourmetSalad);
myOrder.addSalad(objectCopy);

console.log('orders myOrder\n' + JSON.stringify(myOrder) + '\nlength: ' + myOrder.count());

myOrder.removeSalad(myCaesarSalad.uuid);

console.log('remove orders myOrder\n' + JSON.stringify(myOrder) + '\nlength: ' + myOrder.count());



console.log('Total kostnad: ' + myOrder.getPrice());
// expected gourmet 60 + objectcopy 45 = 105