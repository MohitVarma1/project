const server = require('./server')

test('properly makes token', () => {
    expect(server()).not.toBe(undefined)
})
