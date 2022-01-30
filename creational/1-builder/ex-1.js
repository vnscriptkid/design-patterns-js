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
    if (typeof this.children === "string") {
      html.push(" ".repeat(Tag.indentSize * (indent + 1)));
      html.push(this.children);
      html.push("\n");
    } else if (Array.isArray(this.children)) {
      for (let child of this.children)
        html.push(child.toStringImpl(indent + 1));
    } else {
      throw new Error(`Type of children should be string or array.`);
    }

    html.push(`${spaces}</${this.name}>\n`);
    return html.join();
  }

  toString() {
    return this.toStringImpl(0);
  }

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
    let child = new Tag(childName, childText);
    this.root.children.push(child);
    return this;
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

div.addChildTag(p1).addChildTag(innerDiv.build());

console.log(div.toString());
