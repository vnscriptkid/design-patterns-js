// Problem? should not modify existing class directly, state explosion
// Solution? specification pattern
let Color = Object.freeze({
  red: "red",
  green: "green",
  blue: "blue",
});

let Size = Object.freeze({
  small: "small",
  medium: "medium",
  large: "large",
  yuge: "yuge",
});

class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

class ProductFilter {
  filterByColor(products, color) {
    return products.filter((p) => p.color === color);
  }

  filterBySize(products, size) {
    return products.filter((p) => p.size === size);
  }

  filterBySizeAndColor(products, size, color) {
    return products.filter((p) => p.size === size && p.color === color);
  }
}

class ColorSpec {
  constructor(color) {
    this.color = color;
  }

  isSatisfied(p) {
    return p.color === this.color;
  }
}

class SizeSpec {
  constructor(size) {
    this.size = size;
  }

  isSatisfied(p) {
    return this.size === p.size;
  }
}

class AndSpec {
  constructor(...specs) {
    // boxing
    this.specs = specs;
  }

  isSatisfied(p) {
    return this.specs.every((s) => s.isSatisfied(p));
  }
}

const list = [
  new Product("apple", Color.red, Size.medium),
  new Product("orange", Color.green, Size.small),
  new Product("carrot", Color.red, Size.medium),
];

// find green color item
// const greenColorItems = [];
// const greenSpec = new ColorSpec(Color.green);
// list.forEach((x) => {
//   if (greenSpec.isSatisfied(x)) {
//     greenColorItems.push(x);
//   }
// });

const redMediumItems = [];
const redMediumSpec = new AndSpec(
  new ColorSpec(Color.red),
  new SizeSpec(Size.medium)
);

list.forEach((x) => {
  if (redMediumSpec.isSatisfied(x)) {
    redMediumItems.push(x);
  }
});
console.log(redMediumItems);
