function selectionSort(arr) {
  // Grow the sorted range by 1 with each iteration.
  for (let sortedUpToIdx = 0; sortedUpToIdx < arr.length - 1; sortedUpToIdx++) {
    // Find the smallest item in the remaining unsorted range.
    let smallestSoFarIdx = sortedUpToIdx;
    for (let candidateIdx = sortedUpToIdx + 1; candidateIdx < arr.length; candidateIdx++) {
      if (arr[candidateIdx] < arr[smallestSoFarIdx]) {
        smallestSoFarIdx = candidateIdx;
      }
    }

    // Swap that smallest item to the end of the sorted range.
    const old = arr[sortedUpToIdx];
    arr[sortedUpToIdx] = arr[smallestSoFarIdx];
    arr[smallestSoFarIdx] = old;
  }
}
