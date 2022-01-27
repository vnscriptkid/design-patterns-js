// Problem? state explosion, modify old class.
// Solution? specification
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
  static filterByColor(products, color) {
    return products.filter((p) => p.color === color);
  }

  static filterBySize(products, size) {
    return products.filter((p) => p.size === size);
  }

  static filterByPredicate(products, predicate, value) {
    return products.filter((p) => p[predicate] === value);
  }

  static filterBySizeAndColor(products, size, color) {
    return products.filter((p) => p.size === size && p.color === color);
  }

  static filterMultipleAnd(products = [], conditions = []) {
    const matchAllConditions = (product) =>
      conditions.every(({ predicate, value }) => product[predicate] === value);

    return products.filter(matchAllConditions);
  }

  static filterMultipleAtLeast(products = [], conditions = []) {
    const matchAtLeastOne = (product) =>
      conditions.some(({ predicate, value }) => product[predicate] === value);

    return products.filter(matchAtLeastOne);
  }
}

const p1 = new Product("pen", Color.blue, Size.small);
const p2 = new Product("laptop", Color.red, Size.large);
const p3 = new Product("jacket", Color.blue, Size.large);
const p4 = new Product("keyboard", Color.red, Size.yuge);

const list = [p1, p2, p3, p4];

// console.log(
//   ProductFilter.filterMultipleAtLeast(list, [
//     { predicate: "size", value: Size.yuge },
//     { predicate: "color", value: Color.blue },
//   ])
// );

// console.log(
//   ProductFilter.filterMultipleAnd(list, [
//     { predicate: "color", value: Color.red },
//     { predicate: "size", value: Size.large },
//   ])
// );

// console.log(`
//     Products with color blue:
//     ${JSON.stringify(
//       ProductFilter.filterByPredicate(list, "color", Color.blue),
//       null,
//       2
//     )}
// `);

// console.log(`
//     Products with size large:
//     ${JSON.stringify(
//       ProductFilter.filterByPredicate(list, "size", Size.large),
//       null,
//       2
//     )}
// `);

class Specification {
  isSatisfiedBy(item) {
    throw new Error("Do no run this");
  }
}

class ColorSpecification extends Specification {
  constructor(color) {
    super();
    this.color = color;
  }

  isSatisfiedBy(item) {
    return item.color === this.color;
  }
}

class SizeSpecification extends Specification {
  constructor(size) {
    super();
    this.size = size;
  }

  isSatisfiedBy(item) {
    return item.size === this.size;
  }
}

class AndSpecification extends Specification {
  constructor(...specifications) {
    super();
    this.specifications = specifications;
  }

  isSatisfiedBy(item) {
    return this.specifications.every((s) => s.isSatisfiedBy(item));
  }
}

console.log(new ColorSpecification(Color.blue).isSatisfiedBy(p1));

console.log(
  new AndSpecification(
    new ColorSpecification(Color.blue),
    new SizeSpecification(Size.large)
  ).isSatisfiedBy(p3)
);

// console.log(new AndSpecification([new ColorSpecification()]).isSatisfied(list));
