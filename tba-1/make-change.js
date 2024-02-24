class ChangeMaker {
  #minCoins = [0];
  #nextCoin = [0];

  #denominations;

  constructor(denominations) {
    if (!denominations.includes(1)) {
      throw new Error("There must be a 1 coin for the problem to be well-defined.");
    }

    this.#denominations = denominations;
  }

  #populateTable(upTo) {
    // The table may already be partially populated so reuse anything there.
    for (let i = this.#minCoins.length; i <= upTo; i++) {
      let bestCoinSoFar = 1;
      for (const denomination of this.#denominations.filter(d => i >= d)) {
        if (this.#minCoins[i-denomination] < this.#minCoins[i-bestCoinSoFar]) {
          bestCoinSoFar = denomination;
        }
      }
      this.#minCoins[i] = this.#minCoins[i-bestCoinSoFar] + 1;
      this.#nextCoin[i] = bestCoinSoFar;
    }
  }

  makeChangeFor(amount) {
    this.#populateTable(amount);

    const ret = [];
    while (amount > 0) {
      ret.push(this.#nextCoin[amount]);
      amount -= this.#nextCoin[amount];
    }

    return ret;
  }
}

const usChangeMaker = new ChangeMaker([1, 5, 10, 25]);
console.log(`Change for 3: ${usChangeMaker.makeChangeFor(3)}`);
console.log(`Change for 11: ${usChangeMaker.makeChangeFor(11)}`);
console.log(`Change for 78: ${usChangeMaker.makeChangeFor(78)}`);
console.log(`Change for 99: ${usChangeMaker.makeChangeFor(99)}`);
