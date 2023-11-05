abstract class Filter {
  filter (input: any): any {
    return []
  }
}

class ArrayIndexFilter extends Filter {
  constructor (private readonly index: number) {
    super()
  }

  filter (array: unknown[]): any {
    return array[this.index]
  }
}

class ObjectKeyFilter extends Filter {
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

class PipeFilter extends Filter {
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

class CompoundFilter extends Filter {
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

export function parseFilter (filter: string): Filter {
  if (filter.includes(' | ')) {
    const filters = filter.split(' | ')
    return new PipeFilter(
      parseFilter(filters[0]),
      parseFilter(filters[1])
    )
  }

  const isArrayIndexFilter = /^\.\[\d+]$/.test(filter)
  if (isArrayIndexFilter) {
    const arrayIndex = Number(filter.slice(2, -1))
    return new ArrayIndexFilter(arrayIndex)
  }

  if (!filter.includes('.')) {
    return new ObjectKeyFilter(filter)
  }

  return new CompoundFilter(
    filter.slice(1).split('.').map((filter) => parseFilter(filter))
  )
}
