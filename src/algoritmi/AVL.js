import React, { useEffect, useState } from 'react';
import * as d3 from "d3";

const AVL = () => {
    const [svg, setSvg] = useState(null)
    const [g, setG] = useState(null)
    var oldPos = {};

    var gLinks,
        gNodes;
    useEffect(() => {
        if (svg === null) {
            const svg1=d3.select('svg')
            setSvg(svg1)
            setG(svg1.append('g').attr('transform', 'translate(40,40)'));
            svg1.attr('width', '100%')
                .attr('height', '720');
            
        }
    })
    useEffect(()=>{
        if(g){

            // eslint-disable-next-line
            g.attr('class',"gLink")
            gLinks = g.append('g');
            gNodes = g.append('g');
        }
    },[g])
    var id = 1;

    var data = {
        id: id++,
        data: null,
        parent: null,
        children: []
    };
    var duration = 400;

    var tree = d3.tree().separation(function () { return 40; });
    

    var changeRoot = false;

    // Find tree's height
    var findHeight = function (node) {
        if (node.data === null || !node) return 0;
        else {
            var left = node.children[0] ? findHeight(node.children[0]) : 0;
            var right = node.children[1] ? findHeight(node.children[1]) : 0;
            return 1 + ((left > right) ? left : right);
        }
    };

    var findNode = function (n) {
        //console.log("yoyo");
        // if (!n || !Number.isInteger(n)) return false;
        // if (!data.data) {
        //     console.log("not found");
        //     return false;
        // }
        //console.log('searching');

        var walker = data;

        var found = true;
        while (found === true) {
            if (n == walker.data) {
                break;
            } else if (n < walker.data) {
                if (walker.children.length === 0) { // No child
                    found = false;
                } else if (walker.children[0].data === null) { // Already have right child, left child is empty
                    found = false;
                } else { // Move left
                    walker = walker.children[0];
                }
            } else {
                if (walker.children.length === 0) { // No child
                    found = false;
                } else if (walker.children[1].data === null) { // Already have left child, right child is empty
                    found = false;
                } else { // Move left
                    walker = walker.children[1];
                }
            }
        }
        //console.log(found);
        return found;
    };


    var inorder = function () {
        var traversal = [];
        var walker = data;
        inorderUtil(walker, traversal);
        var i = traversal.toString();
        i = 'Parcurgere inordine: ' + i;
        document.getElementById("state").innerHTML = i;
        // confirm(i);
    }

    var inorderUtil = function (walker, traversal) {
        if (walker.children.length !== 0) {
            if (walker.children[0].data !== null) {
                inorderUtil(walker.children[0], traversal);
            }
        }
        // console.log(walker.data);
        traversal.push(walker.data);
        if (walker.children.length !== 0) {
            if (walker.children[1].data !== null) {
                inorderUtil(walker.children[1], traversal);
            }
        }
    }


    var preorder = function () {
        var traversal = [];
        var walker = data;
        preorderUtil(walker, traversal);
        var p = traversal.toString();
        p = 'Parcurgere preordine: ' + p;
        document.getElementById("state").innerHTML = p;
        // confirm(p);
    }

    var preorderUtil = function (walker, traversal) {
        traversal.push(walker.data);
        if (walker.children.length === 0) {
            return;
        }
        if (walker.children[0].data !== null) {
            preorderUtil(walker.children[0], traversal);
        }
        if (walker.children[1].data !== null) {
            preorderUtil(walker.children[1], traversal);
        }
    }


    var postorder = function () {
        var traversal = [];
        var walker = data;
        postorderUtil(walker, traversal);
        var s = traversal.toString();
        s = 'Parcurgere postordine: ' + s;
        document.getElementById("state").innerHTML = s;
        // confirm(s);
    }

    var postorderUtil = function (walker, traversal) {
        if (walker.children.length !== 0) {
            if (walker.children[0].data !== null) {
                postorderUtil(walker.children[0], traversal);
            }
        }
        if (walker.children.length !== 0) {
            if (walker.children[1].data !== null) {
                postorderUtil(walker.children[1], traversal);
            }
        }
        traversal.push(walker.data);
    }
    // Binary Search Tree rotation
    var rotateLeft = function (node, callback) {
        var parent = node.parent,
            rightChild = node.children[1];

        if (rightChild.children.length === 0) {
            rightChild.children.push({ id: id++, data: null, parent: rightChild, children: [] });
            rightChild.children.push({ id: id++, data: null, parent: rightChild, children: [] });
        }

        if (parent === null) { // Root node
            rightChild.children[0].parent = node;
            node.children[1] = rightChild.children[0];

            node.parent = rightChild;
            rightChild.children[0] = node;

            rightChild.parent = parent;
            data = rightChild;

            gLinks.selectAll('path').filter(function (d) { // Update root node
                return d.data.id === node.parent.id;
            }).datum(d3.hierarchy(node).descendants()[0]);
            changeRoot = true;

        } else if (node === parent.children[0]) { // Left child of parent
            rightChild.children[0].parent = node;
            node.children[1] = rightChild.children[0];

            node.parent = rightChild;
            rightChild.children[0] = node;

            rightChild.parent = parent;
            parent.children[0] = rightChild;

            changeRoot = false;

        } else if (node === parent.children[1]) { // Right child of parent
            rightChild.children[0].parent = node;
            node.children[1] = rightChild.children[0];

            node.parent = rightChild;
            rightChild.children[0] = node;

            rightChild.parent = parent;
            parent.children[1] = rightChild;

            changeRoot = false;
        }

        if (node.children.length !== 0 && node.children[0].data === null && node.children[1].data === null) node.children = [];

        setTimeout(function () {
            if (callback instanceof Function) {
                callback();
            }
        }, duration);

    };

    var rotateRight = function (node, callback) {
        var parent = node.parent,
            leftChild = node.children[0];

        if (leftChild.children.length === 0) {
            leftChild.children.push({ id: id++, data: null, parent: leftChild, children: [] });
            leftChild.children.push({ id: id++, data: null, parent: leftChild, children: [] });
        }

        if (parent === null) { // Root node
            leftChild.children[1].parent = node;
            node.children[0] = leftChild.children[1];

            node.parent = leftChild;
            leftChild.children[1] = node;

            leftChild.parent = parent;
            data = leftChild;

            gLinks.selectAll('path').filter(function (d) { // Update root node's link
                return d.data.id === node.parent.id;
            }).datum(d3.hierarchy(node).descendants()[0]);
            changeRoot = true;

        } else if (node === parent.children[0]) { // Left child of parent
            leftChild.children[1].parent = node;
            node.children[0] = leftChild.children[1];

            node.parent = leftChild;
            leftChild.children[1] = node;

            leftChild.parent = parent;
            parent.children[0] = leftChild;

            changeRoot = false;

        } else if (node === parent.children[1]) { // Left child of parent
            leftChild.children[1].parent = node;
            node.children[0] = leftChild.children[1];

            node.parent = leftChild;
            leftChild.children[1] = node;

            leftChild.parent = parent;
            parent.children[1] = leftChild;

            changeRoot = false;
        }

        if (node.children.length !== 0 && node.children[0].data === null && node.children[1].data === null) node.children = [];

        setTimeout(function () {
            if (callback instanceof Function) {
                callback();
            }
        }, duration);
    };

    // Node highlight for better visualization
    var highlight = function (node) {
        var hlNode = gNodes.selectAll('circle').filter(function (d) {
            return d.data.id === node.id;
        });
        hlNode.transition()
            .duration(duration / 3)
            .style('stroke', '#e74c3c')
            .style('stroke-width', '3.5px');
    };

    var removeHighlight = function (node) {
        var hlNode = gNodes.selectAll('circle').filter(function (d) {
            return d.data.id === node.id;
        });
        hlNode.transition()
            .duration(duration / 3)
            .style('stroke', '#247d24')
            .style('stroke-width', '2.5px');
    };

    // AVL Tree balancing
    var balance = function (node, callback) {
        highlight(node);
        var hLeft = node.children[0] ? findHeight(node.children[0]) : 0;
        var hRight = node.children[1] ? findHeight(node.children[1]) : 0;
        var hl, hr,
            defer = 0.5;
        if (hLeft - hRight >= 2) { // Left unbalance
            var leftChild = node.children[0];
            hl = leftChild.children[0] ? findHeight(leftChild.children[0]) : 0;
            hr = leftChild.children[1] ? findHeight(leftChild.children[1]) : 0;
            if (hl >= hr) { // Left of left
                rotateRight(node, updateTree);
                defer = 1;
            } else { // Right of left
                defer = 3;
                rotateLeft(leftChild, function () {
                    updateTree();
                    setTimeout(function () {
                        rotateRight(node, updateTree);
                    }, duration);
                });
            }
        } else if (hRight - hLeft >= 2) { // Right unbalance
            // rotated = false;
            // isChanged = true;
            var rightChild = node.children[1];
            hl = rightChild.children[0] ? findHeight(rightChild.children[0]) : 0;
            hr = rightChild.children[1] ? findHeight(rightChild.children[1]) : 0;
            if (hr >= hl) { // Right of right
                rotateLeft(node, updateTree);
                defer = 1;
            } else { // Left of right
                defer = 3;
                rotateRight(rightChild, function () {
                    updateTree();
                    setTimeout(function () {
                        rotateLeft(node, updateTree);
                    }, duration);
                });
            }
        }
        setTimeout(function () {
            removeHighlight(node);
            if (!node.parent) { // End balancing
                if (callback instanceof Function) callback();
            } else balance(node.parent, callback);
        }, duration * defer);
    };

    // Tree insertion
    var insert = function (n, callback) {
        if (!n || !Number.isInteger(n)) return;
        if (!data.data) {
            data.data = n;
            updateTree();
            callback();
            return;
        }

        var walker = data,
            newNode;

        while (!newNode) {
            if (n <= walker.data) {
                if (walker.children.length === 0) { // No child
                    walker.children.push({ id: id++, data: n, parent: walker, children: [] }); // Left child
                    walker.children.push({ id: id++, data: null, parent: walker, children: [] }); // Empty right child
                    newNode = walker.children[0];
                } else if (walker.children[0].data === null) { // Already have right child, left child is empty
                    walker.children[0].data = n;
                    newNode = walker.children[0];
                } else { // Move left
                    walker = walker.children[0];
                }
            } else {
                if (walker.children.length === 0) { // No child
                    walker.children.push({ id: id++, data: null, parent: walker, children: [] }); // Empty left child
                    walker.children.push({ id: id++, data: n, parent: walker, children: [] }); // Right child
                    newNode = walker.children[1];
                } else if (walker.children[1].data === null) { // Already have left child, right child is empty
                    walker.children[1].data = n;
                    newNode = walker.children[1];
                } else { // Move left
                    walker = walker.children[1];
                }
            }
        }
        updateTree();
        setTimeout(function () {
            balance(newNode, callback);
            //callback();
        }, duration);
    };

    // Tree deletion
    var deleteTree = function (n, callback) {
        if (!data.data) return false;
        var walker = data,
            nodeDelete = null, // Node to be deleted
            nodeReplace = null, // Node to replace deleted node
            nodeBalance = null, // After deleting, perform balance on this node to root
            parent;

        // Find node
        if (n === walker.data) { // Deleting root
            nodeDelete = walker;
            if (nodeDelete.children.length === 0) nodeDelete.data = null; // Tree only has root node
            else {
                if (nodeDelete.children[0].data === null) { // Root does not have left subtree
                    data = data.children[1]; // Right subtree becomes new tree
                    data.parent = null;

                    gLinks.selectAll('path').filter(function (d) {
                        return d.data.id === data.id;
                    }).remove();
                } else {
                    nodeReplace = nodeDelete.children[0];
                    // In-order predecessor, largest child of left subtree
                    while (nodeReplace) {
                        if (!nodeReplace.children[1] || !nodeReplace.children[1].data) break;
                        nodeReplace = nodeReplace.children[1];
                    }

                    parent = nodeReplace.parent;
                    nodeBalance = parent; // Will start balacing from this node

                    if (parent.children[0] === nodeReplace) {
                        if (nodeReplace.children[0]) {
                            nodeReplace.children[0].parent = parent;
                            parent.children[0] = nodeReplace.children[0]
                        } else {
                            parent.children[0] = { id: id++, data: null, parent: parent, children: [] };
                        }
                    } else if (parent.children[1] === nodeReplace) {
                        if (nodeReplace.children[0]) {
                            nodeReplace.children[0].parent = parent;
                            parent.children[1] = nodeReplace.children[0]
                        } else {
                            parent.children[1] = { id: id++, data: null, parent: parent, children: [] };
                        }
                    }
                    // After moving, if nodeReplace's parent has 2 empty children
                    if (parent.children.length !== 0 && parent.children[0].data === null && parent.children[1].data === null) parent.children = [];

                    // Add 2 subtrees of old root to new root
                    if (nodeDelete.children[0]) {
                        nodeDelete.children[0].parent = nodeReplace;
                        nodeReplace.children[0] = nodeDelete.children[0];
                    }
                    if (nodeDelete.children[1]) {
                        nodeDelete.children[1].parent = nodeReplace;
                        nodeReplace.children[1] = nodeDelete.children[1];
                    }

                    // Replace deleted root node by largest node of left subtree (in-order predecessor)
                    nodeReplace.parent = null;
                    data = nodeReplace;

                    gLinks.selectAll('path').filter(function (d) {
                        return d.data.id === nodeReplace.id;
                    }).remove();
                }
            }

            updateTree();
            setTimeout(function () {
                if (nodeBalance) balance(nodeBalance, callback);
                else if (callback instanceof Function) callback();
            }, duration);
            return true;
        }

        // Finding node
        while (walker.data) {
            if (n < walker.data) walker = walker.children[0]; // Move left
            else if (n > walker.data) walker = walker.children[1]; // Move right
            else if (n === walker.data) {
                nodeDelete = walker;
                break;
            }
        }

        if (!nodeDelete) return false;

        // Deletion
        if (nodeDelete.children.length === 0) { // Node to be deleted is leaf node
            parent = nodeDelete.parent;
            nodeBalance = parent; // Will start balacing from this node

            if (parent.children[0] === nodeDelete) { // Remove left child
                parent.children[0] = { id: id++, data: null, parent: parent, children: [] }; // Empty child
            } else if (parent.children[1] === nodeDelete) { // Remove right child
                parent.children[1] = { id: id++, data: null, parent: parent, children: [] };
            }

            if (parent.children.length !== 0 && parent.children[0].data === null && parent.children[1].data === null) parent.children = [];

        } else { // Node to be deleted is internal node
            nodeReplace = nodeDelete.children[0].data ? nodeDelete.children[0] : null;
            // In-order predecessor, largest child of left subtree
            while (nodeReplace) {
                if (!nodeReplace.children[1] || !nodeReplace.children[1].data) break;
                nodeReplace = nodeReplace.children[1];
            }

            if (!nodeReplace) { // No left child, right child of nodeDelete replace its position
                parent = nodeDelete.parent;
                nodeBalance = parent; // Will start balacing from this node

                nodeDelete.children[1].parent = parent;
                if (parent.children[0] === nodeDelete) parent.children[0] = nodeDelete.children[1]; // Left child of parent
                else if (parent.children[1] === nodeDelete) parent.children[1] = nodeDelete.children[1]; // Right child of parent
            } else {
                // Update nodeReplace's parent
                parent = nodeReplace.parent;
                nodeBalance = parent; // Will start balacing from this node

                if (parent.children[0] === nodeReplace) {
                    if (nodeReplace.children[0]) {
                        nodeReplace.children[0].parent = parent;
                        parent.children[0] = nodeReplace.children[0]
                    } else {
                        parent.children[0] = { id: id++, data: null, parent: parent, children: [] };
                    }
                } else if (parent.children[1] === nodeReplace) {
                    if (nodeReplace.children[0]) {
                        nodeReplace.children[0].parent = parent;
                        parent.children[1] = nodeReplace.children[0]
                    } else {
                        parent.children[1] = { id: id++, data: null, parent: parent, children: [] };
                    }
                }
                // After moving, if nodeReplace's parent has 2 empty children
                if (parent.children.length !== 0 && parent.children[0].data === null && parent.children[1].data === null) parent.children = [];

                // Replace deleted node by largest node of left subtree (in-order predecessor)
                parent = nodeDelete.parent;
                nodeReplace.parent = parent;
                if (parent.children[0] === nodeDelete) parent.children[0] = nodeReplace; // Left child of parent
                else if (parent.children[1] === nodeDelete) parent.children[1] = nodeReplace; // Right child of parent

                if (nodeDelete.children[0]) {
                    nodeDelete.children[0].parent = nodeReplace;
                    nodeReplace.children[0] = nodeDelete.children[0];
                }
                if (nodeDelete.children[1]) {
                    nodeDelete.children[1].parent = nodeReplace;
                    nodeReplace.children[1] = nodeDelete.children[1];
                }
            }
        }

        updateTree();
        setTimeout(function () {
            if (nodeBalance) balance(nodeBalance, callback);
            else if (callback instanceof Function) callback();
        }, duration);
        return true;
    };
    /*************Binary Search Tree Visualization using D3JS *************/


    var updateTree = function () {
        var root = d3.hierarchy(data);

        var newTreeSize = [root.descendants().length * 40, ((root.height + 1) * 2 - 1) * 30];

        if (tree.size()[0] !== newTreeSize[0] || tree.size()[1] !== newTreeSize[1]) {
            tree.size(newTreeSize);
            // const center  = svg.attr('width') / 2 - tree.size()[0] / 2;
            g.attr('style',`--treeSize:${tree.size()[0] / 2}px`)
        }
        tree(root);

        var nodes = root.descendants().filter(function (d) {
            return d.data.data === null ? false : true;
        });

        var link = gLinks.selectAll('path')
            .data(nodes, function (d) { return d.data.id; });

        link.exit().remove();

        link.transition() // Update new position of old links
            .duration(duration)
            .attrTween('d', function (d) {

                var oldDraw = d3.select(this).attr('d');
                if (oldDraw) {
                    oldDraw = oldDraw.match(/(M.*)(L.*)/);
                    var oldMoveto = oldDraw[1].slice(1).split(',').map(Number),
                        oldLineto = oldDraw[2].slice(1).split(',').map(Number);
                    // If root is changed, reverse to correctly animated if rotate left
                    if (changeRoot && oldMoveto[1] === 0) { // Old root node
                        oldMoveto = oldDraw[2].slice(1).split(',').map(Number);
                        oldLineto = oldDraw[1].slice(1).split(',').map(Number);
                        changeRoot = false;
                    }
                    if ((oldLineto !== [d.x, d.y]) && (oldMoveto !== [d.parent.x, d.parent.y])) {
                        /*console.log(d.data.data, oldMoveto, oldLineto);
                        console.log(d.data.data, [d.parent.x, d.parent.y], [d.x, d.y]);*/
                        var interpolatorMX = d3.interpolateNumber(oldMoveto[0], d.parent.x);
                        var interpolatorMY = d3.interpolateNumber(oldMoveto[1], d.parent.y);
                        var interpolatorLX = d3.interpolateNumber(oldLineto[0], d.x);
                        var interpolatorLY = d3.interpolateNumber(oldLineto[1], d.y);

                        return function (t) {
                            return 'M' + interpolatorMX(t) + ',' + interpolatorMY(t) + 'L' + interpolatorLX(t) + ',' + interpolatorLY(t);
                        };
                    }
                }
            });

        link.enter().append('path') // Add new element for new data
            .attr('class', 'link')
            .transition()
            .duration(duration)
            .attrTween('d', function (d) {
                if (d.parent) {
                    var parentOldPos = oldPos[d.parent.data.id.toString()];
                    var interpolatorMX = d3.interpolateNumber(parentOldPos[0], d.parent.x);
                    var interpolatorMY = d3.interpolateNumber(parentOldPos[1], d.parent.y);
                    var interpolatorLX = d3.interpolateNumber(parentOldPos[0], d.x);
                    var interpolatorLY = d3.interpolateNumber(parentOldPos[1], d.y);

                    return function (t) {
                        return 'M' + interpolatorMX(t) + ',' + interpolatorMY(t) + 'L' + interpolatorLX(t) + ',' + interpolatorLY(t);
                    };
                } else {
                    d3.select(this).remove();
                }
            });

        var node = gNodes.selectAll('g')
            .data(nodes, function (d) { return d.data.id; });

        node.exit().remove();

        node.transition()
            .duration(duration)
            .attr('transform', function (d) {
                setTimeout(function () { // Finish transition, update old position of this node
                    oldPos[d.data.id.toString()] = [d.x, d.y];
                }, duration);
                return 'translate(' + d.x + ',' + d.y + ')';
            });

        var newNode = node.enter().append('g')
            .attr('transform', function (d) {
                if (!d.parent) return 'translate(' + d.x + ',' + (d.y - 30) + ')';
                else return 'translate(' + oldPos[d.parent.data.id.toString()][0] + ',' + (oldPos[d.parent.data.id.toString()][1] - 30) + ')';
            })
            .attr('class', 'node');

        newNode.transition()
            .duration(duration)
            .attr('transform', function (d) {
                oldPos[d.data.id.toString()] = [d.x, d.y];
                return 'translate(' + d.x + ',' + d.y + ')';
            });

        newNode.append('circle')
            .attr('r', 20);

        newNode.append('text')
            .attr('class', 'text')
            .attr('text-anchor', 'middle')
            .attr('dy', 5)
            .text(function (d) { return d.data.data; });
    };

    var handleInsert = function (event) {
        event.preventDefault()
        var num = document.getElementById('insertInput').value;
        var message;
        if (!Number(num)) {
            message = 'ENTER VALID INPUT TO INSERT';
        } else {
            document.getElementById('insertInput').value = '';
            d3.selectAll('#insertTree input').each(function () { // Disable insert
                d3.select(this).attr('disabled', '')
            });
            insert(parseInt(num), function () {
                d3.selectAll('#insertTree input').each(function () { // Enable insert
                    d3.select(this).attr('disabled', null);
                });
            });
            message = 'Inserted ' + num;
        }
        document.getElementById("state").innerHTML = message;
        var form = document.getElementById("insertTree");
        form.reset();
        return false;
    };

    var handleDelete = function (event) {
        event.preventDefault()
        var num = document.getElementById('deleteInput').value;
        var message;
        if (!Number(num)) {
            message = 'ENTER VALID INPUT TO DELETE';
        } else {
            var isPresent = findNode(num);
            if (isPresent) {
                if (num && data.data !== null) { // Tree is not empty
                    document.getElementById('deleteInput').value = '';
                    d3.selectAll('#deleteTree input').each(function () { // Disable insert
                        d3.select(this).attr('disabled', '')
                    });
                    deleteTree(parseInt(num), function () {
                        d3.selectAll('#deleteTree input').each(function () { // Enable insert
                            d3.select(this).attr('disabled', null);
                        });
                    });
                }
                message = "Successfully Deleted " + num;
            } else {
                message = "Entered number not found";
            }
        }
        document.getElementById("state").innerHTML = message;
        var form = document.getElementById("deleteTree");
        form.reset();
        return false;
    };

    var handleSearch = function (event) {
        event.preventDefault()
        var num = document.getElementById('searchInput').value;
        var getval = findNode(num);
        // console.log(getval);
        var message;
        if (getval === true) {
            message = 'Found ' + num;
            // console.log(message);
            // confirm("Found");
        } else {
            message = num + ' not found';
        }
        document.getElementById("state").innerHTML = message;
        var form = document.getElementById("searchTree");
        form.reset();
        return false;
    };
    return (
        <div className='container-fluid'>
            <div className='row my-3'>
                <form id="insertTree" className='col' onSubmit={handleInsert}>
                    <input id="insertInput" className="col-xs-2" type="text" placeholder="Număr de adăugat" maxLength="4" size="14" />
                    <button type="submit" id="insert" className="btn btn-primary my-2 my-sm-0">Adăugare</button>
                </form>
                <form id="deleteTree" className='col' onSubmit={handleDelete}>
                    <input id="deleteInput" type="text" className="col-xs-2" placeholder="Număr de șters" maxLength="4" size="14" />
                    <button type="submit" id="delete" className="btn btn-danger my-2 my-sm-0">Ștergere</button>
                </form>
                <form id="searchTree" className='col' onSubmit={handleSearch}>
                    <input id="searchInput" type="text" className="col-xs-2" placeholder="Număr to căutat" maxLength="4" size="14" />
                    <button type="submit" id="search" className="btn btn-success my-2 my-sm-0">Căutare</button>
                </form>
            </div>
            <div className="d-flex my-3" >
                <div className='mx-2'>
                    <button type="button" className="btn btn-secondary my-2 my-sm-0" id="inorder" onClick={inorder}>Inordine</button>

                </div>
                <div className='mx-2'>
                    <button type="button" className="btn btn-secondary my-2 my-sm-0 " id="preorder" onClick={preorder}>Preordine</button>

                </div>
                <div className='mx-2'>
                    <button type="button" className="btn btn-secondary my-2 my-sm-0 " id="postorder" onClick={postorder}>Postordine</button>

                </div>
                <p id="state"></p>
            </div>
            <svg id="avlTree"></svg>
        </div>
    );
};

export default AVL;