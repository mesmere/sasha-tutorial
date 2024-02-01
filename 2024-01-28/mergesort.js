function mergeSort(ary) {
  // Base case - zero or one elements
  if (ary.length <= 1) {
    return ary;
  }

  // Recursively sort each half.
  const midpoint = Math.floor(ary.length / 2);
  const left = mergeSort(ary.slice(0, midpoint));
  const right = mergeSort(ary.slice(midpoint, ary.length));

  // Merge the two sorted halves into a single sorted array.
  let leftIdx = 0, rightIdx = 0;
  let result = [];
  while (leftIdx + rightIdx < ary.length) {
    if (leftIdx === left.length) {                 // If we're out of elements on the left...
      result.push(right[rightIdx++]);              // ...take from the right.
    } else if (rightIdx == right.length) {         // If we're out of elements on the right...
      result.push(left[leftIdx++]);                // ...take from the left.
    } else if (left[leftIdx] <= right[rightIdx]) { // If next in line on left <= in right...
      result.push(left[leftIdx++]);                // ...take from the left.
    } else {                                       // If next in line on left > on right...
      result.push(right[rightIdx++]);              // ...take from the right.
    }
  }
  return result;
}
