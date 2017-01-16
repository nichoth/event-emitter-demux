# event emitter demux

Create a demuxed event bus from an event list.

## install

    $ npm install event-emitter-demux

## example

```js
var test = require('tape')
var Bus = require('../')

test('create event bus with one event', function (t) {
    t.plan(1)
    var bus = Bus('test')
    bus.on.test(function (ev) {
        t.equal(ev, 'my event', 'should emit events by type')
    })
    bus.write.test('my event')
})

test('create event bus from array', function (t) {
    t.plan(2)
    var evs = ['test', 'testTwo']
    var bus = Bus(evs)
    bus.on.test(function (ev) {
        t.equal(ev, 'event1', 'should emit event')
    })
    bus.on.testTwo(function (ev) {
        t.equal(ev, 'event2', 'should emit event')
    })
    bus.write.test('event1')
    bus.write.testTwo('event2')
})
```
