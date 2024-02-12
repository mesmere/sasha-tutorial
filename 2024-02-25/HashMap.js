const murmurhash = require('./murmurhash.js');

class HashMap {
  static #INITIAL_TABLE_SIZE = 10;
  static #MAX_LOAD_FACTOR =  0.75;
  static #MURMURHASH_SEED = Math.random() * 2**52;

  // Main hash table storing [effectiveKey, value] pairs.
  #table = new Array(HashMap.#INITIAL_TABLE_SIZE).fill();

  // All current [key, value] pairs, sorted by insertion order.
  #entries = [];

  // Function used to hash effective keys.
  #hash = str => murmurhash(str, HashMap.#MURMURHASH_SEED);

  // Function used to extract effective (string) keys from keys in the table.
  #extractEffectiveKey;

  /**
   * Provide a function which can extract an effective key from each key passed
   * into this HashMap. Keys can be of any type, but the effective key must be a
   * string.
   */
  constructor(extractEffectiveKey = key => key) {
    this.#extractEffectiveKey = (obj) => {
      try {
        var effectiveKey = extractEffectiveKey(obj);
      } catch (e) {
        throw new Error(`Failed to extract effective key from ${obj}.`, { cause: e });
      }
      if (typeof effectiveKey !== "string") {
        throw new Error(`Effective keys must be strings but ${effectiveKey} is a ${typeof effectiveKey}.`);
      }
      return effectiveKey;
    }
  }

  /** Set the value of the given key to the given value. */
  set(key, value) {
    const effectiveKey = this.#extractEffectiveKey(key);

    // Update entries.
    const index = this.#entries.findIndex(([k, _]) => 
        this.#extractEffectiveKey(k) === effectiveKey);
    if (index !== -1) {
      this.#entries[index][1] = value;
    } else {
      this.#entries.push([key, value]);
    }

    // Update the table.
    if (this.#entries.length / this.#table.length > HashMap.#MAX_LOAD_FACTOR
        || this.#table.length - this.#entries.length === 0) {
      this.#grow();
    } else {
      const spot = this.#findSpot(effectiveKey);
      this.#table[spot] = [effectiveKey, value]; 
    }

    return this;
  }

  /** Retrieve the value for the given key, or undefined if none. */
  get(key) {
    const spot = this.#findSpot(this.#extractEffectiveKey(key));
    return this.#table[spot] && this.#table[spot][1];
  }

  /** Returns true iff the hash table contains the given key. */
  has(key) {
    return this.get(key) !== undefined;
  }

  /** Remove the key and value associated with the given key, if any. */
  remove(key) {
    const effectiveKey = this.#extractEffectiveKey(key);

    // Convenience function to map any index i onto 0...table.length
    const n = this.#table.length;
    function wrap(i) {
      return ((i % n) + n) % n; // Negative i wraps around from the end.
    }

    // Remove the key/value pair from the entries array.
    const index = this.#entries.findIndex(([k, _]) => 
        this.#extractEffectiveKey(k) === effectiveKey);
    if (index === -1) {
      return this; // The given key isn't in the table anyway.
    }
    this.#entries.splice(index, 1);

    // Remove the effectiveKey/value pair from the table.
    const originalSpot = this.#findSpot(effectiveKey);
    this.#table[originalSpot] = undefined;

    // Backfill the empty spot so that future lookups still work.
    for (var lastHole = wrap(originalSpot - 1);
        this.#table[lastHole] !== undefined && lastHole !== originalSpot;
        lastHole = wrap(lastHole - 1));
    let hole = originalSpot;
    let cur = wrap(originalSpot + 1);
    while (this.#table[cur] !== undefined && cur !== lastHole) {
      const curTrueHash = wrap(this.#hash(this.#table[cur][0]));
      if (wrap(curTrueHash - lastHole) <= wrap(hole - lastHole)) {
        this.#table[hole] = this.#table[cur];
        this.#table[cur] = undefined;
        hole = cur;
      }
      cur = wrap(cur + 1);
    }

    return this;
  }

  /** Returns an iterator over all keys in the table, in insertion order. */
  *keys() {
    for (const [key, _] of this.#entries) {
      yield key;
    }
  }

  /** Returns an iterator over all values in the table, in insertion order. */
  *values() {
    for (const [_, value] of this.#entries) {
      yield value;
    }
  }

  /** Returns an iterator over all key/value pairs in the table, in insertion order. */
  [Symbol.iterator]() {
    return this.#entries[Symbol.iterator]();
  }

  /** Find where in {@link table} an effective key would be inserted. */
  #findSpot(effectiveKey) {
    let spot = this.#hash(effectiveKey) % this.#table.length;
    while (this.#table[spot] !== undefined && this.#table[spot][0] !== effectiveKey) {
      spot = (spot + 1) % this.#table.length;
    }
    return spot;
  }

  /** Rehash the table. */
  #grow() {
    this.#table = new Array(this.#table.length * 2).fill();
    for (const [key, value] of this.#entries) {
      const spot = this.#findSpot(this.#extractEffectiveKey(key));
      this.#table[spot] = [key, value];
    }
  }
}

module.exports = HashMap
