import { Filter } from './Filter'

export class PipeFilter extends Filter {
  constructor (private readonly filterOne: Filter, private readonly filterTwo: Filter) {
    super()
  }

  filter (input: any): any {
    const outputFilterOne = this.filterOne.filter(input)
    if (outputFilterOne === null) {
      return null
    }
    return this.filterTwo.filter(outputFilterOne)
  }
}
