import { describe, it, expect } from 'vitest'
import { jq } from './jq'

describe('jq', function () {
  it('should write an empty array when given an empty string', async function () {
    const result = await jq('', new Set())

    expect(result).toBe('[]')
  })

  it('should format a simple json string correctly', async () => {
    const result = await jq('{"foo": "bar"}', new Set())

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

    const result = await jq(input, new Set())

    expect(result).toBe(expected)
  })

  it('should return the given json in the correct format when give the simplest filter \'.\'', async () => {
    const input = '{"foo": "bar"}'
    const expected = `{
  "foo": "bar"
}`

    const result = await jq(input, new Set(['.']))

    expect(result).toBe(expected)
  })

  it('should support array index access \'.[0]\'', async () => {
    const input = '[0]'
    const expected = '0'

    const result = await jq(input, new Set(['.[0]']))

    expect(result).toBe(expected)
  })

  it('should support array index access \'.[1]\'', async () => {
    const input = '[0,1]'
    const expected = '1'

    const result = await jq(input, new Set(['.[1]']))

    expect(result).toBe(expected)
  })

  it('should support array index access \'.[11]\'', async () => {
    const input = '[0,1,2,3,4,5,6,7,8,9,10,11]'
    const expected = '11'

    const result = await jq(input, new Set(['.[11]']))

    expect(result).toBe(expected)
  })
})
