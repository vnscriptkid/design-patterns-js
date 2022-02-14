class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.parent = null;

    if (this.left) left.parent = this;
    if (this.right) right.parent = this;
  }
}

function makeInOrderIterator(root) {
  // go to leftmost
  let current = root;
  while (current.left) {
    current = current.left;
  }
  let yieldedStart = false;

  return {
    next: function () {
      if (!yieldedStart) {
        yieldedStart = true;
        return {
          value: current,
          done: false,
        };
      }
      if (current.right) {
        current = current.right;
        while (current.left) {
          current = current.left;
        }
        return {
          value: current,
          done: false,
        };
      } else {
        let p = current.parent;
        while (p && current === p.right) {
          current = p;
          p = p.parent;
        }
        current = p;
        return {
          value: current,
          done: current == null,
        };
      }
    }, // next

    // this makes the iterator iterable
    [Symbol.iterator]: function () {
      return this;
    },
  };
}

class BinaryTree {
  constructor(rootNode) {
    this.rootNode = rootNode;
  }

  // assuming only one form of iteration
  [Symbol.iterator]() {
    return makeInOrderIterator(this.rootNode);
  }

  *betterInOrder() {
    // todo1: define generator function that yield nodes in-order
    function* traverse(root) {
      if (root.left) {
        for (let node of traverse(root.left)) yield node;
      }
      yield root;
      if (root.right) {
        for (let node of traverse(root.right)) yield node;
      }
    }
    // todo2: iterate through generator func using for-of, yield each value
    for (let node of traverse(this.rootNode)) yield node;
  }

  // todo3: implement pre-order
  // todo4: implement post-order

  get inOrder() {
    return makeInOrderIterator(this.rootNode);
  }
}

//   1
//  / \
// 2   3

// in-order:  213
// preorder:  123
// postorder: 231

let root = new Node(1, new Node(2), new Node(3));

// c++ style
// let it = makeInOrderIterator(root);
// let result = it.next();
// while (!result.done) {
//   console.log(result.value.value);
//   result = it.next();
// }

let tree = new BinaryTree(root);

// for (let x of tree) console.log(x.value);

// console.log([...tree].map((x) => x.value));

// console.log([...tree.inOrder].map((x) => x.value));

// a generator is both an iterator and iterable
// console.log("using a generator...");
// console.log([...tree.betterInOrder()].map((x) => x.value));

for (let x of tree.betterInOrder()) console.log(x.value);
