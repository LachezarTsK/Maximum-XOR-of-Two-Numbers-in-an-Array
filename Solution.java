
public class Solution {

    static final int MAX_BIT = 32;
    static final int BINARY_STATES = 2;

    class TrieNode {
        TrieNode[] bits = new TrieNode[BINARY_STATES];
    }

    public int findMaximumXOR(int[] nums) {

        TrieNode root = new TrieNode();
        fillTrie(root, nums);
        return findMaximumXorOfTwoIntegers(root, nums);
    }

    public int findMaximumXorOfTwoIntegers(TrieNode root, int[] nums) {

        int maximumXor = 0;
        for (int integer : nums) {
            maximumXor = Math.max(maximumXor, checkXor(root, integer));
        }
        return maximumXor;
    }

    public int checkXor(TrieNode root, int integer) {

        int xorValue = 0;
        TrieNode current = root;

        for (int i = MAX_BIT - 1; i >= 0; i--) {

            int indexBit = (integer >> i) & 1;
            int indexOppositeBit = (indexBit == 0) ? 1 : 0;

            if (current.bits[indexOppositeBit] != null) {
                xorValue = (xorValue << 1) | 1;
                current = current.bits[indexOppositeBit];
            } else {
                xorValue = xorValue << 1;
                current = current.bits[indexBit];
            }
        }
        return xorValue;
    }

    public void fillTrie(TrieNode root, int[] nums) {
        for (int integer : nums) {
            addIntegerToTrie(root, integer);
        }
    }

    public void addIntegerToTrie(TrieNode root, int integer) {

        TrieNode current = root;

        for (int i = MAX_BIT - 1; i >= 0; i--) {
            int indexBit = (integer >> i) & 1;
            if (current.bits[indexBit] == null) {
                current.bits[indexBit] = new TrieNode();
            }
            current = current.bits[indexBit];
        }
    }
}
