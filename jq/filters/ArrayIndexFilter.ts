import { Filter } from './Filter'

export class ArrayIndexFilter extends Filter {
  constructor (private readonly index: number) {
    super()
  }

  filter (array: unknown[]): any {
    return array[this.index]
  }
}
