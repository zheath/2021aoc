const top = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;

class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }
  size() {
    return this._heap.length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  peek() {
    return this._heap[top];
  }
  push(...values) {
    values.forEach(value => {
      this._heap.push(value);
      this.siftUp();
    });
    return this.size();
  }
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > top) {
      this._swap(top, bottom);
    }
    this._heap.pop();
    this.siftDown();
    return poppedValue;
  }
  replace(value) {
    const replacedValue = this.peek();
    this._heap[top] = value;
    this.siftDown();
    return replacedValue;
  }
  _compare(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
  siftUp() {
    let node = this.size() - 1;
    while (node > top && this._compare(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }
  siftDown() {
    let node = top;
    while (
      (left(node) < this.size() && this._compare(left(node), node)) ||
      (right(node) < this.size() && this._compare(right(node), node))
    ) {
      let maxChild = (right(node) < this.size() && this._compare(right(node), left(node))) ? right(node) : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
  fullSort(comp) { this._heap.sort((a, b) => comp(a, b)) }
  getTopN(n) { return this._heap.slice(0,n) }
}

module.exports = PriorityQueue