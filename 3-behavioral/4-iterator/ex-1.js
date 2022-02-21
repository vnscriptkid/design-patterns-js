class Creature {
  constructor() {
    // todo: convert this into array backed props
    this.strength = this.agility = this.intelligence = 10;
  }

  // todo: implement getters and setters for props
  // creature.strength
  // creature.agility
  // creature.intelligence

  /***** */
  // todo: convert these methods to use array backed props
  get sumOfStats() {
    return this.strength + this.agility + this.intelligence;
  }

  get averageStat() {
    return this.sumOfStats / 3.0; // magic number
  }

  get maxStat() {
    return Math.max(this.strength, this.agility, this.intelligence);
  }
}

let creature = new Creature();
creature.strength = 10;
creature.agility = 11;
creature.intelligence = 15;
console.log(
  `Creature has average stat ${creature.averageStat}, ` +
    `max stat = ${creature.maxStat}, ` +
    `sum of stats = ${creature.sumOfStats}.`
);
