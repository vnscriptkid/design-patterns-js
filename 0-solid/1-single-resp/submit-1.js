// Problem: mixing responsibilities
// Solution: break down into classes, each responsible for one job

const fs = require("fs");
const path = require("path");

class Journal {
  static count = 0;

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
}

class Persistence {
  save(journal, filename) {
    fs.writeFileSync(path.join(__dirname, filename), journal.toString());
  }

  load(filename) {
    fs.readFileSync(filename);
  }
}

const j = new Journal();
j.addEntry("first line");
j.addEntry("second line");

new Persistence().save(j, "./journal.txt");
