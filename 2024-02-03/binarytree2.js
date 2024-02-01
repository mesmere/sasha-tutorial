class Node {
  label;
  left;
  right;

  constructor(label, left, right) {
    this.label = label;
    this.left = left;
    this.right = right;
  }
}

function invert(node) {
  if (node.left !== undefined) {
    invert(node.left);
  }

  if (node.right !== undefined) {
    invert(node.right);
  }

  const tmp = node.left;
  node.left = node.right;
  node.right = tmp;
}

const root = new Node("2", 
  new Node("7",
    new Node("8"),
    new Node("10")
  ),
  new Node("3",
    new Node("6"),
    new Node("5")
  )
);
invert(root);
console.log(root);
