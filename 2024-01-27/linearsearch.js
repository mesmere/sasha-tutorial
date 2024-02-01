function search(arr, value) {
  for (const cur of arr) {
    if (cur == value) {
      return true;
    }
  }
  return false;
}
