class Tag {
  static get indentSize() {
    return 2;
  }

  constructor(name = "", children = "") {
    this.name = name;
    this.children = children;
  }

  toStringImpl(indent) {
    let html = [];
    let spaces = " ".repeat(indent * Tag.indentSize);
    html.push(`${spaces}<${this.name}>\n`);
    if (typeof this.children === "string") {
      html.push(" ".repeat(Tag.indentSize * (indent + 1)));
      html.push(this.text);
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

// just a single paragraph using string concatenation
const hello = "hello";
let html = [];
html.push("<p>");
html.push(hello);
html.push("</p>");
console.log(html.join());

// a list with 2 words in it
const words = ["hello", "world"];
html = [];
html.push("<ul>\n");
for (let word of words) html.push(`  <li>${word}</li>\n`);
html.push("</ul>");
console.log(html.join());

// ordinary non-fluent builder
//let builder = new HtmlBuilder('ul');
let builder = Tag.create("ul");
for (let word of words) builder.addChild("li", word);
//console.log(builder.toString());
let tag = builder.build();
console.log(tag.toString());

// fluent builder
builder.clear();
builder
  .addChildFluent("li", "foo")
  .addChildFluent("li", "bar")
  .addChildFluent("li", "baz");
console.log(builder.toString());
