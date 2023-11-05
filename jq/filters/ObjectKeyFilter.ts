import { Filter } from './Filter'

export class ObjectKeyFilter extends Filter {
  private readonly key: string
  private readonly throwIfInputIsNotAnObject: boolean = true

  constructor (key: string) {
    super()

    this.key = this.parseKey(key)
    this.throwIfInputIsNotAnObject = !key.endsWith('?')
  }

  filter (input: Record<string, unknown>): any {
    if (input !== Object(input)) {
      if (this.throwIfInputIsNotAnObject) {
        throw new Error('Input must be an object')
      }
      return null
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
      .replace(/\?/g, '')
  }
}
