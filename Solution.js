
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaximumXOR = function (nums) {

    this.MAX_BIT = 32;
    this.BINARY_STATES = 2;
    const root = new TrieNode();
    fillTrie(root, nums);
    return findMaximumXorOfTwoIntegers(root, nums);
};

function TrieNode() {
    this.bits = new Array(this.BINARY_STATES);
}

/**
 * @param {TrieNode} root
 * @param {number[]} nums
 * @return {number}
 */
function findMaximumXorOfTwoIntegers(root, nums) {
    let maximumXor = 0;
    for (let integer of nums) {
        maximumXor = Math.max(maximumXor, checkXor(root, integer));
    }
    return maximumXor;
}

/**
 * @param {TrieNode} root
 * @param {number} integer
 * @return {number}
 */
function checkXor(root, integer) {

    let xorValue = 0;
    let current = root;

    for (let i = this.MAX_BIT - 1; i >= 0; i--) {
        let indexBit = (integer >> i) & 1;
        let indexOppositeBit = (indexBit === 0) ? 1 : 0;

        if (current.bits[indexOppositeBit] !== undefined) {
            xorValue = (xorValue << 1) | 1;
            current = current.bits[indexOppositeBit];
        } else {
            xorValue = xorValue << 1;
            current = current.bits[indexBit];
        }
    }
    return xorValue;
}

/**
 * @param {TrieNode} root
 * @param {number[]} nums
 */
function fillTrie(root, nums) {
    for (let integer of nums) {
        addIntegerToTrie(root, integer);
    }
}

/**
 * @param {TrieNode} root
 * @param {number} integer
 */
function addIntegerToTrie(root, integer) {

    let current = root;
    for (let i = this.MAX_BIT - 1; i >= 0; i--) {
        let indexBit = (integer >> i) & 1;
        if (current.bits[indexBit] === undefined) {
            current.bits[indexBit] = new TrieNode();
        }
        current = current.bits[indexBit];
    }
}
