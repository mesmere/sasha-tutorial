class BinaryTree {
  labels;

  constructor(labels = []) {
    this.labels = labels;
  }

  parentIndex(index) {
    if (index === 0) {
      throw "Already at the root.";
    }
    return Math.floor((index - 1) / 2);
  }

  leftChildIndex(index) {
    return (index * 2) + 1;
  }

  rightChildIndex(index) {
    return (index * 2) + 2;
  }
}

// Invert a binary tree (annoying answer).
function invert(tree) {
  const initialLength = tree.labels.length;
  for (let i=0; i<initialLength; i++) {
    const tmp = tree.labels[tree.leftChildIndex(i)];
    tree.labels[tree.leftChildIndex(i)] = tree.labels[tree.rightChildIndex(i)];
    tree.labels[tree.rightChildIndex(i)] = tmp;
  }
}
const tree = new BinaryTree(["0", "1", "2", "3", "4"]);
invert(tree);
console.log(tree.labels.filter((cur) => cur !== undefined));
