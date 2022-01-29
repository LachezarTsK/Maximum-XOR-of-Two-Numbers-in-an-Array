
#include<vector>
using namespace std;

class Solution {
    
    static const int MAX_BIT = 32;
    static const size_t BINARY_STATES = 2;

    struct TrieNode {
        TrieNode* bits[BINARY_STATES] = {nullptr, nullptr};
    };


public:

    int findMaximumXOR(vector<int>& nums) {

        TrieNode* root = new TrieNode();
        fillTrie(root, nums);
        return findMaximumXorOfTwoIntegers(root, nums);
    }

    int findMaximumXorOfTwoIntegers(TrieNode* root, const vector<int>& nums) {

        int maximumXor = 0;
        for (const auto& integer : nums) {
            maximumXor = max(maximumXor, checkXor(root, integer));
        }
        return maximumXor;
    }

    int checkXor(TrieNode* root, int integer) {

        int xorValue = 0;
        TrieNode* current = root;

        for (int i = MAX_BIT - 1; i >= 0; i--) {

            int indexBit = (integer >> i) & 1;
            int indexOppositeBit = (indexBit == 0) ? 1 : 0;

            if (current->bits[indexOppositeBit] != nullptr) {
                xorValue = (xorValue << 1) | 1;
                current = current->bits[indexOppositeBit];
            } else {
                xorValue = xorValue << 1;
                current = current->bits[indexBit];
            }
        }

        current = nullptr;
        delete current;

        return xorValue;
    }

    void fillTrie(TrieNode* root, const vector<int>& nums) {
        for (const auto& integer : nums) {
            addIntegerToTrie(root, integer);
        }
    }

    void addIntegerToTrie(TrieNode* root, int integer) {

        TrieNode* current = root;

        for (int i = MAX_BIT - 1; i >= 0; i--) {

            int indexBit = (integer >> i) & 1;
            if (current->bits[indexBit] == nullptr) {
                current->bits[indexBit] = new TrieNode();
            }
            current = current->bits[indexBit];
        }
        current = nullptr;
        delete current;
    }
};
