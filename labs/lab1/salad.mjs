'use strict';

import inventory from './inventory.mjs';
import { v4 as uuidv4 } from 'uuid';

class Salad {
    ingredients;
    id;
    static instanceCounter = 0;
    #secretProperty = `hidden`;
    uuid;
  
    constructor(salad, oldID, oldUUID) {
      salad instanceof Salad ? this.ingredients = salad.ingredients : this.ingredients = {};
      // Object.defineProperty(this, 'id', {
      //   value: oldID || `salad_` + Salad.instanceCounter++,
      //   writable: false,
      // });
      this.id = oldID || `salad_` + Salad.instanceCounter++;
      const uuid = oldUUID || uuidv4();
      this.uuid = uuid;
    }
  
    add(name, properties) {
      this.ingredients[name] = properties;
      return this;
    }
  
    remove(name) {
      delete this.ingredients[name];
      return this;
    }
  
    static parse(json) {
      let inputs = JSON.parse(json);
      let salads;
      if (Array.isArray(inputs)) {
        salads = [];
        for (const salad in inputs) {
          salads = salads.concat(this.parse(JSON.stringify(inputs[salad]))); //måste finnas ett bättre sätt att göra detta på
        }
      } else {
        salads = new Salad(this.salad = undefined, this.oldID = inputs.id, this.oldUUID = inputs.uuid);
        for(const name in inputs.ingredients) {
          salads.add(name, inputs.ingredients[name]);
        }
      }
      return salads;
    }
};

Salad.prototype.getPrice = function() {
    let total = Object.values(this.ingredients);
    return total
      .map((x) => x.price)
      .reduce((accum, price) => accum + price);
};
  
Salad.prototype.count = function(prop) {
    let count = Object.values(this.ingredients);
    return Object.values(count.filter(p => p[prop])).length;
};

class GourmetSalad extends Salad {
  //specify size when add ingredient, default 1 (optional third parameter)
  //if same ingredient added again, add size (new size = old size + added size)
  //getPrize = size * prize
  constructor(salad) {
    super(salad);
    this.ingredients = {...super.ingredients};
    return this;
  }
  
  add(name, properties, addSize = 1) {
    let propertiesWithSize = this.ingredients[name] || {...properties};
    propertiesWithSize['size'] = propertiesWithSize['size'] + addSize || addSize;
    super.add(name, propertiesWithSize);
    return this;
  }
}
  
GourmetSalad.prototype.getPrice = function() {
  let total = Object.values(this.ingredients);
  return total
    .map((x) => x.price * x.size)
    .reduce((accum, price) => accum + price);
};

export {Salad, GourmetSalad};