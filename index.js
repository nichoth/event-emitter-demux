// var mxtend = require('xtend/mutable')
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
    return Array.isArray(manifest) ?
        fromArray(manifest) :
        fromArray([manifest])
}
