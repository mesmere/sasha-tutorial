function binarySearch(arr, needle) {
  // Base case - no elements.
  if (arr.length === 0) {
    return false;
  }

  // Base case - one element.
  if (arr.length === 1) {
    return arr[0] == needle;
  }

  // Recursion case - multiple elements.
  const midpoint = Math.floor(arr.length / 2);
  if (needle < arr[midpoint]) {
    return binarySearch(arr.slice(0, midpoint), needle);
  } else {
    return binarySearch(arr.slice(midpoint, arr.length), needle);
  }
}
