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


test('recursive nested events', function (t) {
    t.plan(3)
    var evs = [
        'one',
        ['two', ['twoA', 'twoB']]
    ]
    var bus = Bus(evs)
    bus.on.one(function (ev) {
        t.equal(ev, 'eventOne', 'should emit event on top level')
    })
    // var expected = [
    //     ['two', 'eventTwoA'],
    //     ['two', 'eventTwoB']
    // ]
    // var i = 0
    // bus.on.two(function (ev) {
    //     t.deepEqual(ev, expected[i++], 'should namepsace the events')
    // })
    bus.on.two.twoA(function (ev) {
        t.equal(ev, 'eventTwoA', 'should create nested emitter')
    })
    bus.on.two.twoB(function (ev) {
        t.equal(ev, 'eventTwoB', 'should create nested emitter')
    })

    bus.write.one('eventOne')
    bus.write.two.twoA('eventTwoA')
    bus.write.two.twoB('eventTwoB')
})


