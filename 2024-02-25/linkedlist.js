class Node {
  data;
  next = undefined;

  constructor(data) {
    this.data = data;
  }
}

class LinkedList {
  head = undefined;

  constructor(items = []) {
    for (const item of items.reverse()) {
      this.insertAtHead(item);
    }
  }

  get(k) {
    if (this.head === undefined) {
      throw "Out of range.";
    }

    let cur = this.head;
    while (--k >= 0) {
      if (cur.next === undefined) {
        throw "Out of range.";
      }
      cur = cur.next;
    }
    return cur.data;
  }

  getRecursive(k) {
    function helper(node, k) {
      if (node === undefined) {
        throw "Out of range.";
      } 
      if (k === 0) {
        return node.data;
      }
      return helper(node.next, k-1);
    }

    return helper(this.head, k);
  }

  insertAtHead(data) {
    const oldHead = this.head;
    this.head = new Node(data);
    this.head.next = oldHead;
  }

  insert(k, data) {
    // Special case to update head
    if (k === 0) {
      this.insertAtHead(data);
      return;
    }

    if (this.head === undefined) {
      throw "Out of range.";
    }

    let cur = this.head;
    while (--k >= 1) { // Stop short!
      if (cur.next === undefined) {
        throw "Out of range.";
      }
      cur = cur.next;
    }

    const oldNext = cur.next;
    cur.next = new Node(data);
    cur.next.next = oldNext;
  }

  removeAtHead() {
    if (this.head === undefined) {
      throw "Out of range.";
    }
    this.head = this.head.next;
  }

  remove(k) {
    // Special case to update head
    if (k === 0) {
      this.removeAtHead();
      return;
    }

    if (this.head === undefined) {
      throw "Out of range.";
    }

    let cur = this.head;
    while (--k >= 1) { // Stop short!
      if (cur.next === undefined) {
        throw "Out of range.";
      }
      cur = cur.next;
    }

    cur.next = cur.next.next;
  }

  reverse() {
    if (this.head === undefined) {
      return; // Nothing to do.
    }

    let prev = this.head;
    let cur = this.head.next;
    while (cur !== undefined) {
      const next = cur.next;
      cur.next = prev;
      prev = cur;
      cur = next;
    }
    this.head.next = undefined;
    this.head = prev;
 }

  *[Symbol.iterator]() {
    let cur = this.head;
    while (cur !== undefined) {
      yield cur.data;
      cur = cur.next;
    }
  }
}

const list = new LinkedList(["zero", "one"]);
list.insert(2, "two");
list.insert(3, "three");
list.remove(2);
console.log(`Head is ${list.get(0)}.`);
list.reverse();
for (let cur of list) {
  console.log(cur);
}
