function subsetSum(items, limit) {
  const table = [[]];
  for (let b = 0; b <= limit; b++) {
    table[0][b] = 0;
  }

  for (let i = 1; i <= items.length; i++) {
    table[i] = [0];
    for (let b = 1; b <= limit; b++) {
      if (b < items[i-1]) {
        table[i][b] = table[i-1][b];
      } else {
        table[i][b] = Math.max(table[i-1][b-items[i-1]]+items[i-1], table[i-1][b]);
      }
    }
  }

  for (let row of table) {
    console.log(row.join(' '));
  }
}

subsetSum([5, 8, 9, 10, 11, 12, 13, 14], 20);
