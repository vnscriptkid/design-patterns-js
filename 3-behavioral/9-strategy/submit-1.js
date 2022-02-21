// 2 types of format
// markdown
// html
let OutputFormat = Object.freeze({
  markdown: 0,
  html: 1,
});

class ListStrategy {
  constructor() {
    if (this.constructor === ListStrategy) throw new Error("abstract class.");
  }
  // all list strategy must follow this interface
  // common methods that help to build list using an array (buffer)
  start(buffer) {}
  end(buffer) {}
  addListItem(buffer, item) {}
}

class MarkdownListStrategy extends ListStrategy {
  // todo: implement addListItem
  // * item 1
  // * item 2
  addListItem(buffer, item) {
    buffer.push(`* ${item}`);
  }
}

class HtmlListStrategy extends ListStrategy {
  // todo: implement start, end, addListItem
  // <ul><li>item</li></ul>
  start(buffer) {
    buffer.push("<ul>");
  }

  addListItem(buffer, item) {
    buffer.push(`   <li>${item}</li>`);
  }

  end(buffer) {
    buffer.push("</ul>");
  }
}

// requirement: process list in diff ways dependings on props passed in, in the run time
class TextProcessor {
  constructor(outputFormat) {
    this.buffer = [];
    // todo: set initial formatter
    this.setOutputFormat(outputFormat);
  }

  setOutputFormat(format) {
    // todo: depending on format
    // switch to the corresponding listStrategy
    switch (format) {
      case OutputFormat.markdown:
        this.listStrategy = new MarkdownListStrategy();
        break;
      case OutputFormat.html:
        this.listStrategy = new HtmlListStrategy();
        break;
    }
  }

  appendList(items) {
    this.listStrategy.start(this.buffer);
    for (let item of items) this.listStrategy.addListItem(this.buffer, item);
    this.listStrategy.end(this.buffer);
    // todo: build list using the ListStrategy interface
  }

  clear() {
    this.buffer = [];
  }

  toString() {
    // todo: join buffer saparated by \n
    return this.buffer.join("\n");
  }
}

let tp = new TextProcessor();
tp.setOutputFormat(OutputFormat.markdown);
tp.appendList(["foo", "bar", "baz"]);
console.log(tp.toString());

tp.clear();
tp.setOutputFormat(OutputFormat.html);
tp.appendList(["alpha", "beta", "gamma"]);
console.log(tp.toString());
