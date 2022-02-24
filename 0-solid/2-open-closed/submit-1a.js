// Problem? state explosion
// Solution?
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

class ColorSpecification {
  constructor(color) {
    this.color = color;
  }

  isSatisfiedBy(product) {
    return product.color === this.color;
  }
}

class SizeSpecification {
  constructor(size) {
    this.size = size;
  }

  isSatisfiedBy(product) {
    return product.size === this.size;
  }
}

class AndSpecification {
  constructor(...specs) {
    this.specs = specs;
  }

  isSatisfiedBy(product) {
    return this.specs.every((s) => s.isSatisfiedBy(product));
  }
}

const products = [
  new Product("pen", Color.blue, Size.medium),
  new Product("laptop", Color.red, Size.large),
  new Product("phone", Color.green, Size.large),
  new Product("book", Color.blue, Size.medium),
];

const blueMediumProds = [];

for (let p of products) {
  const blueAndMediumSpec = new AndSpecification(
    new ColorSpecification(Color.blue),
    new SizeSpecification(Size.medium)
  );

  if (blueAndMediumSpec.isSatisfiedBy(p)) {
    blueMediumProds.push(p);
  }
}

console.log(blueMediumProds);
