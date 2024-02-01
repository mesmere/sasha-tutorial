class PriorityQueue {
  items = [];

  #parentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  #leftChildIndex(index) {
    return (index * 2) + 1;
  }

  #rightChildIndex(index) {
    return (index * 2) + 2;
  }

  insert(item, priority) {
    let index = this.items.push({
      item: item,
      priority: priority
    }) - 1;
    while (index > 0
          && this.items[this.#parentIndex(index)].priority > this.items[index].priority) {
      // Swap this node with its parent.
      const oldParent = this.items[this.#parentIndex(index)];
      this.items[this.#parentIndex(index)] = this.items[index];
      this.items[index] = oldParent;

      index = this.#parentIndex(index);
    }
  }

  remove() {
    if (this.items.length === 0) {
      return undefined;
    }

    if (this.items.length === 1) {
      return this.items.pop();
    }

    // Replace the root.
    const oldRoot = this.items[0];
    this.items[0] = this.items.pop();

    // Bubble down.
    let index = 0;
    while ((this.#leftChildIndex(index) < this.items.length 
        && this.items[this.#leftChildIndex(index)].priority < this.items[index].priority
        ) || (
        this.#rightChildIndex(index) < this.items.length
        && this.items[this.#rightChildIndex(index)].priority < this.items[index].priority)) {
      // Figure out which child is the smallest.
      let indexToSwap = -1;
      if (this.#leftChildIndex(index) >= this.items.length) {
        indexToSwap = this.#rightChildIndex(index);
      } else if (this.#rightChildIndex(index) >= this.items.length) {
        indexToSwap = this.#leftChildIndex(index);
      } else {
        indexToSwap = (this.items[this.#leftChildIndex(index)].priority 
          < this.items[this.#rightChildIndex(index)].priority) 
          ? this.#leftChildIndex(index) : this.#rightChildIndex(index);
      }

      // Swap with the smallest child.
      const temp = this.items[index];
      this.items[index] = this.items[indexToSwap];
      this.items[indexToSwap] = temp;

      index = indexToSwap;
    }

    return oldRoot;
  }
}

const pq = new PriorityQueue();
pq.insert("one", 1);
pq.insert("five", 5);
pq.insert("three", 3);
pq.insert("four", 4);
pq.insert("two", 2);

const sorted = [];
while (pq.items.length > 0) {
  sorted.push(pq.remove().item);
}
console.log(sorted);
