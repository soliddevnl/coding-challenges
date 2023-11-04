import { describe, it, expect } from 'vitest'
import { jq } from './jq'

describe('jq', function () {
  it('should write an empty array when given an empty string', function () {
    expect(jq('')).toBe('[]')
  })

  it('should format a simple json string correctly', () => {
    expect(jq('{"foo": "bar"}')).toBe(`{
  "foo": "bar"
}`)
  })

  it('should format a complex json string correctly', () => {
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
    expect(jq(input)).toBe(expected)
  })
})
