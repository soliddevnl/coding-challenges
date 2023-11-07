import { Filter } from './Filter'

export class ArrayFilter extends Filter {
  constructor (private readonly itemFilter: Filter) {
    super()
  }

  filter (json: any): any {
    if (Array.isArray(json)) {
      return json.map((item) => this.itemFilter.filter(item))
    }
    return null
  }
}
