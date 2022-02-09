// why? when? optimize disk space
class FormattedText {
  constructor(plainText) {
    this.plainText = plainText;
    // naive approach: storing capitalization state for each character
    this.caps = new Array(plainText.length).map(function () {
      return false;
    });
  }

  capitalize(start, end) {
    for (let i = start; i <= end; ++i) this.caps[i] = true;
  }

  toString() {
    let buffer = [];
    for (let i in this.plainText) {
      let c = this.plainText[i];
      buffer.push(this.caps[i] ? c.toUpperCase() : c);
    }
    return buffer.join("");
  }
}

// this would work better as a nested class

class TextRange {
  // todo: implement this flight-weight class
  // 2 info:
  // - text range
  // - formatting rule
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.cap = true;
  }

  // todo: helper method check if this range contains a pos
  covers(idx) {
    return idx >= this.start && idx <= this.end;
  }
}

class BetterFormattedText {
  constructor(plainText) {
    this.plainText = plainText;
    this.formatting = [];
  }

  getRange(start, end) {
    // todo: create new range, store in formatting, return
    const range = new TextRange(start, end);
    this.formatting.push(range);
    return range;
  }

  toString() {
    let buffer = [];
    for (let i in this.plainText) {
      let c = this.plainText[i];
      // todo: run through each range, check range covers this idx, apply rule
      for (let range of this.formatting) {
        if (range.covers(i) && range.cap) {
          c = c.toUpperCase();
        }
      }

      buffer.push(c);
    }
    return buffer.join("");
  }
}

// const text = "This is a brave new world";
// let ft = new FormattedText(text);
// ft.capitalize(10, 15);
// console.log(ft.toString());

// todo: call new api
const text = "This is a brave new world";
let ft = new BetterFormattedText(text);
ft.getRange(10, 15);
console.log(ft.toString());
