class Creature {
  constructor(name, attack, defense) {
    this.name = name;
    this.attack = attack;
    this.defense = defense;
  }

  toString() {
    return `${this.name} (${this.attack}/${this.defense})`;
  }
}

class CreatureModifier {
  constructor(creature) {
    this.creature = creature;
    this.next = null;
  }

  add(modifier) {
    // todo: add modifier to the last of linkedlist (recursion)
  }

  handle() {
    // todo: call handle of next
  }
}

class NoBonusesModifier extends CreatureModifier {
  constructor(creature) {
    super(creature);
  }

  handle() {
    console.log("No bonuses for you!");
  }
}

class DoubleAttackModifier extends CreatureModifier {
  constructor(creature) {
    super(creature);
  }

  handle() {
    console.log(`Doubling ${this.creature.name}'s attack`);
    // todo: add logic
    // call handle of next node (through parent)
  }
}

class IncreaseDefenseModifier {
  // todo: make this a creatureModifier

  handle() {
    console.log(`Increasing ${this.creature.name}'s defense`);
    // todo: only increase defense if attack <= 2
    // call next handle in the chain
  }
}

let goblin = new Creature("Goblin", 1, 1);
console.log(goblin.toString());
let root = new CreatureModifier(goblin);

//root.add(new NoBonusesModifier(goblin));

root.add(new DoubleAttackModifier(goblin));
//root.add(new DoubleAttackModifier(goblin));

root.add(new IncreaseDefenseModifier(goblin));

// eventually...
// iterate through each node in the chain, execute handle() on node
root.handle();
console.log(goblin.toString());
