'use strict';

const _ = require('lodash');
const MinHeap = require('./min-heap');

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  const heap = new MinHeap();

  // Insert/Initialize 100 logs per logSource into the memory (heap)
  for (let i = 0; i < logSources.length; i++) {
    for (let j = 0; j < 100 && logSources[i].drained === false; j++) {
      let log = logSources[i].pop();
      if (log !== false) heap.insert({ ...log });
    }
  }

  while (heap.data.length > 0) {
    // Every time we print a log, we insert more logs into the heap.
    printer.print(heap.extractMin());
    for (let i = 0; i < logSources.length; i++) {
      if (logSources[i].drained === false) {
        let log = logSources[i].pop();
        if (log !== false) heap.insert({ ...log });
      }
    }
  }

  printer.done();
  return console.log('Sync sort complete.');
};
