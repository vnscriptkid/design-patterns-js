// diff btw dependency injection vs dependency inversion
// low-level module vs high-level module?

let Relationship = Object.freeze({
  parent: 0,
  child: 1,
  sibling: 2,
});

class Person {
  constructor(name) {
    this.name = name;
  }
}

// LOW-LEVEL (STORAGE)
class Relationships {
  constructor() {
    // this ds can be changed
    this.data = [];
  }

  addParentAndChild(parent, child) {
    this.data.push({
      from: parent,
      type: Relationship.parent,
      to: child,
    });
    this.data.push({
      from: child,
      type: Relationship.child,
      to: parent,
    });
  }
}

// HIGH-LEVEL (RESEARCH)

class Research {
  constructor(relationships) {
    // problem: direct dependence ↓↓↓↓ on storage mechanic
    let relations = relationships.data;
    for (let rel of relations.filter(
      (r) => r.from.name === "John" && r.type === Relationship.parent
    )) {
      console.log(`John has a child named ${rel.to.name}`);
    }
  }
}

let parent = new Person("John");
let child1 = new Person("Chris");
let child2 = new Person("Matt");

// low-level module
let rels = new Relationships();
rels.addParentAndChild(parent, child1);
rels.addParentAndChild(parent, child2);

new Research(rels);
