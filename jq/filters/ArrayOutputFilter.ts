import { Filter } from './Filter'

export class ArrayOutputFilter extends Filter {
  constructor (private readonly outputFilter: Filter) {
    super()
  }

  filter (input: any): any {
    return [this.outputFilter.filter(input)]
  }
}
