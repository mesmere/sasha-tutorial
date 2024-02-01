class Node {
  label;
  children;

  constructor(label, children = []) {
    this.label = label;
    this.children = children;
  }
}

const root = new Node("1", [
    new Node("2", [
        new Node("5"),
        new Node("6")
    ]),
    new Node("3"),
    new Node("4", [
        new Node("7")
    ])
]);
console.log(root.children);
