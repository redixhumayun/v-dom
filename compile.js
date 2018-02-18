'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** @jsx h */

function h(type, props) {
    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
    }

    return { type: type, props: props, children: children };
}

function setProps(node, props) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            node.setAttribute(key, props[key]);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }
    var parent = document.createElement(node.type);
    if (node.props) {
        setProps(parent, node.props);
    }
    node.children.map(function (e) {
        return createElement(e);
    }).forEach(function (el) {
        return parent.appendChild(el);
    });
    return parent;
}

function updateElement(parent, oldNode, newNode) {
    if (!oldNode) {
        parent.appendChild(createElement(newNode));
    } else if (!newNode) {
        parent.removeChild(oldNode);
    }
    //this case will handle changes to the elements
    else if (changed(oldNode, newNode)) {
            parent.replaceChild(createElement(newNode), oldNode);
        } else if (newNode.type) {
            for (var i = 0; i < newNode.children.length || oldNode.children.length; i++) {
                updateElement(newNode, oldNode.children[i], newNode.children[i]);
            }
        }
}

function changed(node1, node2) {
    return (typeof node1 === 'undefined' ? 'undefined' : _typeof(node1)) !== node2 || typeof node1 === 'string' && node1 !== node2 || node1.type !== node2.type;
}

function view(count) {
    return h(
        'ul',
        { id: 'foo' },
        h(
            'li',
            { id: 'bar' },
            'text 1'
        ),
        h(
            'li',
            { id: 'baz' },
            'text 2'
        )
    );
}

function render() {
    var root = document.getElementById("main");
    root.appendChild(createElement(view(0)));
    document.getElementById("update").addEventListener('click', function () {
        var ul = document.getElementById("foo");
        var li = document.getElementById("bar");
        updateElement(ul, li, { type: 'li', props: null, children: ['new'] });
    });
}
