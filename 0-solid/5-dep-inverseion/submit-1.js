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

// ABSTRACTION
class RelationshipBrowser {
  constructor() {
    if (this.constructor.name === "RelationshipBrowser")
      throw new Error(`${this.constructor.name} is abstract`);
  }

  browseChildrenOf() {}
}

// LOW-LEVEL (STORAGE)
class Relationships extends RelationshipBrowser {
  constructor() {
    super();
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

  findChildrenOf(parentName) {
    return this.data
      .filter(
        (rel) =>
          rel.type === Relationship.parent && rel.from.name === parentName
      )
      .map((rel) => rel.to);
  }
}

// HIGH-LEVEL (RESEARCH)

class Research {
  constructor(browser) {
    // problem: direct dependence ↓↓↓↓ on storage mechanic
    // let relations = relationships.data;
    // for (let rel of relations.filter(
    //   (r) => r.from.name === "John" && r.type === Relationship.parent
    // )) {
    //   console.log(`John has a child named ${rel.to.name}`);
    // }
    const children = browser.findChildrenOf("John");
    for (let child of children) {
      console.log(`John has a child named ${child.name}`);
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
