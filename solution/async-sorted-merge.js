'use strict';

const MinHeap = require('./min-heap');

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = async (logSources, printer) => {
  const heap = new MinHeap();

  // Insert/Initialize 20 logs per logSource into the memory (heap)
  for (let i = 0; i < logSources.length; i++) {
    for (let j = 0; j < 20 && logSources[i].drained === false; j++) {
      let log = await logSources[i].popAsync();
      if (log !== false) heap.insert({ ...log });
    }
  }

  while (heap.data.length > 0) {
    // Every time we print a log, we insert more logs into the heap.
    printer.print(heap.extractMin());
    for (let i = 0; i < logSources.length; i++) {
      if (logSources[i].drained === false) {
        let log = await logSources[i].popAsync();
        if (log !== false) heap.insert({ ...log });
      }
    }
  }

  printer.done();
  return new Promise((resolve, reject) => {
    resolve(console.log('Async sort complete.'));
  });
};
