class Tag {
  static get indentSize() {
    return 2;
  }

  constructor(name = "", children = null) {
    this.name = name;
    this.children = children || [];
  }

  toStringImpl(indent) {
    let html = [];
    let spaces = " ".repeat(indent * Tag.indentSize);
    html.push(`${spaces}<${this.name}>\n`);

    // todo: if children is string
    // todo: if children is an array of tags => recurse over children

    html.push(`${spaces}</${this.name}>\n`);
    return html.join();
  }

  toString() {
    // todo: recursive call
  }

  // temptation: include tag building ops on same class
  // idea: Tag should not know to to build
  static create(name) {
    return new HtmlBuilder(name);
  }
}

class HtmlBuilder {
  constructor(rootName) {
    this.root = new Tag(rootName);
    this.rootName = rootName;
  }

  // non-fluent
  addChild(childName, childText) {
    let child = new Tag(childName, childText);
    this.root.children.push(child);
  }

  // fluent
  addChildFluent(childName, childText) {
    // same as addChild but with fluent interface
  }

  addChildTag(tag) {
    this.root.children.push(tag);
    return this;
  }

  toString() {
    return this.root.toString();
  }

  clear() {
    this.root = new Tag(this.rootName);
  }

  build() {
    return this.root;
  }
}

`
<div>
  <p>line one</p>
  <div>
    <p>inside 1<p>
    <p>inside 2</p>
  </div>
</div>
`;

const div = Tag.create("div");

const p1 = new Tag("p", "line one");

const innerDiv = Tag.create("div");

const p2 = new Tag("p", "inside 1");
const p3 = new Tag("p", "inside 2");
innerDiv.addChildTag(p2).addChildTag(p3);

// todo: fix this, expect innerDiv is a tag object instead
div.addChildTag(p1).addChildTag(innerDiv);

console.log(div.toString());
