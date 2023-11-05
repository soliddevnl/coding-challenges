import { Filter } from './Filter'

export class CompoundFilter extends Filter {
  constructor (private readonly filters: Filter[]) {
    super()
  }

  filter (input: any): any {
    let filteredInput = input
    for (const filter of this.filters) {
      filteredInput = filter.filter(filteredInput)
      if (filteredInput === null) {
        return filteredInput
      }
    }
    return filteredInput
  }
}
