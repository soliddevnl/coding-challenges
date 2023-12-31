import { describe, it, expect } from 'vitest'
import { jq } from './jq'

describe('jq', function () {
  it('should return null when given an empty string', async function () {
    const result = await jq('', '')

    expect(result).toBe('null')
  })

  it('should format a simple json string correctly', async () => {
    const result = await jq('{"foo": "bar"}', '.')

    expect(result).toBe(`{
  "foo": "bar"
}`)
  })

  it('should format a complex json string correctly', async () => {
    const input = '{"quotes":[{"id":1,"quote":"Life isn’t about getting and having, it’s about giving and being.","author":"Kevin Kruse"},{"id":2,"quote":"Whatever the mind of man can conceive and believe, it can achieve.","author":"Napoleon Hill"}],"total":100,"skip":0,"limit":2}'

    const expected = `{
  "quotes": [
    {
      "id": 1,
      "quote": "Life isn’t about getting and having, it’s about giving and being.",
      "author": "Kevin Kruse"
    },
    {
      "id": 2,
      "quote": "Whatever the mind of man can conceive and believe, it can achieve.",
      "author": "Napoleon Hill"
    }
  ],
  "total": 100,
  "skip": 0,
  "limit": 2
}`

    const result = await jq(input)

    expect(result).toBe(expected)
  })

  it('should return the given json in the correct format when give the simplest filter \'.\'', async () => {
    const input = '{"foo": "bar"}'
    const expected = `{
  "foo": "bar"
}`

    const result = await jq(input, '.')

    expect(result).toBe(expected)
  })

  it('should support array index access \'.[0]\'', async () => {
    const input = '[0]'
    const expected = '0'

    const result = await jq(input, '.[0]')

    expect(result).toBe(expected)
  })

  it('should support array index access \'.[1]\'', async () => {
    const input = '[0,1]'
    const expected = '1'

    const result = await jq(input, '.[1]')

    expect(result).toBe(expected)
  })

  it('should support array index access \'.[11]\'', async () => {
    const input = '[0,1,2,3,4,5,6,7,8,9,10,11]'
    const expected = '11'

    const result = await jq(input, '.[11]')

    expect(result).toBe(expected)
  })

  it('should support a object key access ".foo"', async () => {
    const input = '{"foo": "bar"}'
    const expected = '"bar"'

    const result = await jq(input, '.foo')

    expect(result).toBe(expected)
  })

  it('should support a object key access like .["foo"]', async () => {
    const input = '{"foo": "bar"}'
    const expected = '"bar"'

    const result = await jq(input, '.["foo"]')

    expect(result).toBe(expected)
  })

  it('should return null when given an object key that does not exist', async () => {
    const input = '{"foo": "bar"}'
    const expected = 'null'

    const result = await jq(input, '.bar')

    expect(result).toBe(expected)
  })

  it('should throw an error when using an object key on a non-object', async () => {
    const input = 'null'

    await expect(jq(input, '.foo')).rejects.toThrow('Input must be an object')
  })

  it('should not throw an error when using an optional object key on a non-object', async () => {
    const input = 'null'

    const result = await jq(input, '.foo?')

    expect(result).toBe('null')
  })

  it('should support the pipe | operator', async () => {
    const input = '[{"foo": "bar"}, {"bar": "foo"}]'
    const expected = '"bar"'

    const result = await jq(input, '.[0] | .foo')

    expect(result).toBe(expected)
  })

  it('should support the pipe | operator with nested object key', async () => {
    const input = '[{"foo": {"bar": "fuz"}}]'
    const expected = '"fuz"'

    const result = await jq(input, '.[0] | .foo.bar')

    expect(result).toBe(expected)
  })

  it('should support array construction', async () => {
    const input = '{"foo": "bar"}'
    const expected = `[
  "bar"
]`

    const result = await jq(input, '[.foo]')

    expect(result).toBe(expected)
  })

  it('should support the array filter with .foo[].bar', async () => {
    const input = '{"foo":[{"bar": 1}, {"bar": 2}]}'
    const expected = `[
  1,
  2
]`

    const result = await jq(input, '.foo[].bar')

    expect(result).toBe(expected)
  })

  it('should not output an array when the output is already an array', async () => {
    const input = '[1,2]'
    const expected = `[
  1,
  2
]`

    const result = await jq(input, '[.]')

    expect(result).toBe(expected)
  })

  it('should support the array index filter with .foo[0]', async () => {
    const input = '{"foo":[{"bar": 1}, {"bar": 2}]}'
    const expected = `[
  {
    "bar": 1
  }
]`

    const result = await jq(input, '.foo[0]')

    expect(result).toBe(expected)
  })
})
