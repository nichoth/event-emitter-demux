var Event = require('geval')

function fromArray (arr) {
    return arr.reduce(function (acc, ev) {
        var write
        var listen = Event(function (emit) {
            write = emit
        })
        acc.on[ev] = listen
        acc.write[ev] = write
        return acc
    }, { on: {}, write: {} })
}

module.exports = function DxEmitter (manifest) {
    var arr = Array.isArray(manifest) ?
        manifest :
        Array.prototype.slice.call(arguments)
    // var root bus = { on: {}, write: {} }
    var tree = arr.reduce(function reduce (acc, ev) {
        if (typeof ev === 'string') {
            var evBus = fromArray([ev])
            acc[ev] = {
                key: ev,
                bus: evBus
            }
            return acc
        }
        acc[ev[0]] = {
            key: ev[0],
            children: ev[1].reduce(reduce, {})
        }
        return acc
    }, {})

    var nodes = Object.keys(tree).map(function (k) {
        return tree[k]
    })
    var on = nodes.reduce(function reduce (acc, node) {
        if (node.children) {
            var children = Object.keys(node.children).map(function (k) {
                return node.children[k]
            })
            acc[node.key] = children.reduce(reduce, {})
            return acc
        }
        acc[node.key] = node.bus.on[node.key]
        return acc
    }, {})

    var write = nodes.reduce(function reduce (acc, node) {
        if (node.children) {
            var children = Object.keys(node.children).map(function (k) {
                return node.children[k]
            })
            acc[node.key] = children.reduce(reduce, {})
            return acc
        }
        acc[node.key] = node.bus.write[node.key]
        return acc
    }, {})

    var bus = { on: on, write: write }
    return bus
}

