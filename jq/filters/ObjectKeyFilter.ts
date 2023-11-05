import { Filter } from './Filter'

export class ObjectKeyFilter extends Filter {
  private readonly key: string

  constructor (key: string) {
    super()

    this.key = this.parseKey(key)
  }

  filter (input: Record<string, unknown>): any {
    if (input !== Object(input)) {
      throw new Error('Input must be an object')
    }

    if (!Object.keys(input).includes(this.key)) {
      return null
    }

    return input[this.key]
  }

  private parseKey (key: string): string {
    return key.replace('[', '')
      .replace(']', '')
      .replace(/"/g, '')
  }
}
