// create a minimum heap for monitoring the log sources
function MinHeap() {
  this.data = [];
}

MinHeap.prototype.insert = function (val) {
  this.data.push(val);
  this.bubbleUp(this.data.length - 1);
};

MinHeap.prototype.bubbleUp = function (index) {
  while (index > 0) {
    // get the parent
    let parent = Math.floor((index + 1) / 2) - 1;

    // if parent is greater than child
    if (this.data[parent]?.date > this.data[index]?.date) {
      // swap
      let temp = { ...this.data[parent] };
      this.data[parent] = { ...this.data[index] };
      this.data[index] = { ...temp };
    }

    index = parent;
  }
};

MinHeap.prototype.extractMin = function () {
  if (this.data.length === 1) {
    return this.data.pop();
  }
  let min = { ...this.data[0] };
  // set first element to last element
  this.data[0] = { ...this.data.pop() };

  // call bubble down
  this.bubbleDown(0);
  return min;
};

MinHeap.prototype.bubbleDown = function (index) {
  while (true) {
    let child = (index + 1) * 2;
    let sibling = child - 1;
    let toSwap = null;

    // if current is greater than child
    if (this.data[index]?.date > this.data[child]?.date) {
      toSwap = child;
    }

    // if sibling is smaller than child, but also smaller than current
    if (
      this.data[index]?.date > this.data[sibling]?.date &&
      (this.data[child] === undefined ||
        (this.data[child] !== undefined &&
          this.data[sibling]?.date < this.data[child]?.date))
    ) {
      toSwap = sibling;
    }

    // if we don't need to swap, then break.
    if (toSwap === null) {
      break;
    }

    let temp = { ...this.data[toSwap] };
    this.data[toSwap] = { ...this.data[index] };
    this.data[index] = { ...temp };

    index = toSwap;
  }
};

module.exports = MinHeap;
