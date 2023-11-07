import { Filter } from './Filter'

export class ArrayOutputFilter extends Filter {
  constructor (private readonly outputFilter: Filter) {
    super()
  }

  filter (input: any): any {
    const output = this.outputFilter.filter(input)
    if (Array.isArray(output)) {
      return output
    }
    return [output]
  }
}
