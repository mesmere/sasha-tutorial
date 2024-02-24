// Cute syntax for indicating no edge.
const X = Number.POSITIVE_INFINITY;

// |V| by |V| array with each entry i,j holding the weight of the edge from V_i to V_j.
const table = [
  [ 0, X, X, 1, 5 ],
  [ 1, 0, 9, X, X ],
  [ 3, 1, 0, X, X ],
  [ X, X, X, 0, 3 ],
  [ X, X, 2, X, 0 ],
];

// Number of vertices in the graph.
const n = table.length;

// Repeatedly overwrite the table for k=0, k=1, ... k=n-1.
for (let k=0; k<n; k++) {
  for (let i=0; i<n; i++) {
    for (let j=0; j<n; j++) {
      table[i][j] = Math.min(table[i][j], table[i][k] + table[k][j]);
    }
  }
}

console.log(`Shortest path length from v_1 to v_2 = ${table[1][2]}`);

