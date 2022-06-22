
export default function FindHeight(props) {
    if (props.node.data === null || !props.node) return 0;
    else {
        var left = props.node.children[0] ? FindHeight(props.node.children[0]) : 0;
        var right = props.node.children[1] ? FindHeight(props.node.children[1]) : 0;
        return 1 + ((left > right) ? left : right);
    }
}
