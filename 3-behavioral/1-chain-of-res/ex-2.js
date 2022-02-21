// pubsub system
class Event {
  constructor() {
    this.handlers = new Map(); // { idx: callback }
    this.count = 0;
  }

  subscribe(handler) {
    // subscribe? just give me your callback, i'll call you when someone fires event
    // todo: store this subscriber
    // return his idx
  }

  unsubscribe(idx) {
    // todo: remove this subscriber
  }

  fire(sender, args) {
    this.handlers.forEach(function (v, k) {
      // notify all subscribers about the sender and args
    });
  }
}

let WhatToQuery = Object.freeze({
  attack: 1,
  defense: 2,
});

class Query {
  constructor(creatureName, whatToQuery, value) {
    this.creatureName = creatureName;
    this.whatToQuery = whatToQuery;
    this.value = value;
  }
}

// broker: owns a event system
class Game {
  constructor() {
    // todo: init event system
  }

  performQuery(sender, query) {
    // todo: hey subscribers, this `sender` performed this `query`
  }
}

class Creature {
  constructor(game, name, attack, defense) {
    this.game = game;
    this.name = name;
    // initial_attack is inital state before one joins the game
    // attack, defense scores of creature will be tracked by `game`
    this.initial_attack = attack;
    this.initial_defense = defense;
  }

  get attack() {
    // todo: create a query
    // perform query
    // return value
  }

  get defense() {
    let q = new Query(this.name, WhatToQuery.defense, this.initial_defense);
    this.game.performQuery(this, q);
    return q.value;
  }

  toString() {
    return `${this.name}: (${this.attack}/${this.defense})`;
  }
}

class CreatureModifier {
  constructor(game, creature) {
    this.game = game;
    this.creature = creature;
    /* if this is called in the context of inheritors, `this` key word here refers to the inheritor */
    /* why to bind this? the `handle` is executed in the context of Event instead */
    this.token = game.queries.subscribe(this.handle.bind(this));
  }

  handle(sender, query) {
    // implement in inheritors
  }

  dispose() {
    // todo: unsub this creatureModifier from the game
  }
}

class DoubleAttackModifier {
  // this is a CreatureModifier
  // it has info about creature and the game

  handle(sender, query) {
    // todo: only update value if query mentions current creature and query type is appropriate
  }
}

class IncreaseDefenseModifier extends CreatureModifier {
  constructor(game, creature) {
    super(game, creature);
  }

  handle(sender, query) {
    // this will be called every time there's a query coming to game (event system)
    // todo: only increment value by 2 if the query mentions current creature, and query type is defense
  }
}

// centralized event system
let game = new Game();

let goblin = new Creature(game, "Strong Goblin", 2, 2);
console.log(goblin.toString());

let dam = new DoubleAttackModifier(game, goblin);
console.log(goblin.toString());

let idm = new IncreaseDefenseModifier(game, goblin);
console.log(goblin.toString());
idm.dispose();

dam.dispose();
console.log(goblin.toString());
