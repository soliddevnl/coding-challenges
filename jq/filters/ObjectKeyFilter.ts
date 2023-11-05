import { Filter } from './Filter'

export class ObjectKeyFilter extends Filter {
  constructor (private readonly key: string) {
    super()
  }

  filter (input: Record<string, unknown>): any {
    if (!Object.keys(input).includes(this.key)) {
      return null
    }
    return input[this.key]
  }
}
