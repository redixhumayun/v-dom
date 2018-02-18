/** @jsx h */

function h(type, props, ...children) {
    return { type, props, children }
}

function setProps(node, props) {
    for(const key of Object.keys(props)) {
        node.setAttribute(key, props[key]);
    }
}

function createElement(node) {
    if(typeof node === 'string') {
        return document.createTextNode(node)
    }
    const parent = document.createElement(node.type);
    if(node.props) {
        setProps(parent, node.props);
    }
    node.children.map(e => createElement(e))
                .forEach(el => parent.appendChild(el))
    return parent;
}

function updateElement(parent, oldNode, newNode) {
    if(!oldNode) {
        parent.appendChild(createElement(newNode));
    }
    else if(!newNode) {
        parent.removeChild(oldNode);
    }
    //this case will handle changes to the elements
    else if(changed(oldNode, newNode)) {
        parent.replaceChild(createElement(newNode), oldNode);
    } else if(newNode.type) {
        for(let i = 0; i < newNode.children.length || oldNode.children.length; i++) {
            updateElement(newNode, oldNode.children[i], newNode.children[i]);
        }
    }
}

function changed(node1, node2) {
    return typeof node1 !== node2 ||
            typeof node1 === 'string' && node1 !== node2 || 
            node1.type !== node2.type
}

function view(count) {
    return (
        <ul id="foo">
            <li id="bar">text 1</li>
            <li id="baz">text 2</li>
        </ul>
    )
}

function render() {
    const root = document.getElementById("main");
    root.appendChild(createElement(view(0)));
    document.getElementById("update").addEventListener('click', () => {
        let ul = document.getElementById("foo");
        let li = document.getElementById("bar");
        updateElement(ul, li, { type: 'li', props: null, children: ['new'] });
    });
}