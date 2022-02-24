// Problem: too much responsibility for one class
// Solution: delegate job to another class

const fs = require("fs");
const path = require("path");

class Journal {
  constructor() {
    this.entries = {};
  }

  addEntry(text) {
    let c = ++Journal.count;
    let entry = `${c}: ${text}`;
    this.entries[c] = entry;
    return c;
  }

  removeEntry(index) {
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join("\n");
  }

  static count = 0;
}

class Persistence {
  constructor(journal) {
    this.journal = journal;
  }

  save(filename) {
    console.log(`Writing to file ${filename}`);
    fs.writeFileSync(path.join(__dirname, filename), this.journal.toString());
  }

  load(filename) {
    console.log(`Loading from file ${filename}`);
    fs.readFileSync(path.join(__dirname, filename), this.journal.toString());
  }

  loadFromUrl() {
    console.log("load from url...");
  }
}

const journal = new Journal();
journal.addEntry("line 1");
journal.addEntry("line 2");

const store = new Persistence(journal);
store.save("hello.txt");
store.load("hello.txt");
store.loadFromUrl();
