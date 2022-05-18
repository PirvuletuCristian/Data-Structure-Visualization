import BinaryNode from "./BinaryNode";

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

add(data) {
    const node = this.root;
    if(node === null) {
        this.root = new BinaryNode(data);
        return;
    } else {
        const searchTree = function(node) {
            if(data < node.data) {
                if(node.left === null) {
                    node.left = new BinaryNode(data);
                    return;
                } else if (node.left !== null) {
                    return searchTree(node.left);
                }
            } else if(data > node.data) {
                if(node.right === null) {
                    node.right = new BinaryNode(data);
                    return;
                } else if(node.right !== null) {
                    return searchTree(node.right);
                }
            } else {
                return null;
            }
        };
        return searchTree(node);
        }
    }

findMin() {
    let current = this.root;
    while (current.left !== null) {
        current = current.left;
    }
    return current.data;
}

findMax() {
    let current = this.root;
    while (current.right !== null) {
        current = current.right;
    }
    return current.data;
}

find(data) {
    let current = this.root;
    while (current.data !== data) {
        if (data < current.data) {
            current = current.left;
        } else {
            current = current.right;
        }
        if (current === null) {
            return null;
        }
    }
    return current;
}

remove(data) {
    const removeNode = function (node, data) {
        if (node == null) {
            return null;
        }
        if (data === node.data) {
            if (node.left == null && node.right == null) {
                return null;
            }
            if (node.left == null) {
                return node.right;
            }
            if (node.right == null) {
                return node.left;
            }
            var tempNode = node.right;
            while (tempNode.left !== null) {
                tempNode = tempNode.left;
            }
            node.data = tempNode.data;
            node.right = removeNode(node.right, tempNode.data);
            return node;
        } else {
            node.right = removeNode(node.right, data);
            return node;
        }
    }
    this.root = removeNode(this.root, data);
}

}

export default BinarySearchTree;