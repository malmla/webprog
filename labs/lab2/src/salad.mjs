import { v4 as uuidv4 } from 'uuid';

class Salad {
    ingredients;
    id;
    static #instanceCounter = 0;
    uuid;
  
    constructor(salad, oldID, oldUUID) {
      salad ? this.ingredients = {...salad.ingredients} : this.ingredients = {}; //todo spread ist för this =
      this.id = oldID || `salad_` + Salad.#instanceCounter++;
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
          salads[salad] = new Salad(undefined, inputs[salad].id, inputs[salad].uuid);
          salads[salad]['ingredients'] = {...inputs[salad]['ingredients']};
        }
      } else {
        salads = new Salad(undefined, inputs.id, inputs.uuid);
        salads['ingredients'] = {...inputs['ingredients']};
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
    return Object.values(count.filter((p) => p[prop])).length;
};

class GourmetSalad extends Salad {
  //specify size when add ingredient, default 1 (optional third parameter)
  //if same ingredient added again, add size (new size = old size + added size)
  //getPrize = size * prize
  constructor(salad) {
    super(salad);
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

class Order {
  uuidOrder;
  saladList;
  lastSaladUUID;
  
  constructor(oldUUID, saladList) {
    this.saladList = {...saladList};
    this.uuidOrder = oldUUID || uuidv4();
  };

  addSalad(salad) {
    salad instanceof Salad ? this.saladList[salad.uuid] = salad : console.error("not a salad");
    this.lastSaladUUID = salad.uuid;
    return this;
  };

  removeSalad(saladUUID) {
    delete this.saladList[saladUUID];
    return this;
  };

  
};

Order.prototype.arrayFromOrder = function() {
  let array = [];
  Object.values(this.saladList)
  .forEach( element => {
    array.push(Object.keys(element.ingredients));
  })
  
  return array;
}

Order.prototype.getPrice = function() {
  const salads = Object.values(this.saladList);
  return salads
    .map((s) => s.getPrice())
    .reduce((accum, curr) => accum + curr);
};

Order.prototype.count = function() {
  return Object.values(this.saladList).length;
};
export {Salad, GourmetSalad, Order};