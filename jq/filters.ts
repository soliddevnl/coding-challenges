import { PipeFilter } from './filters/PipeFilter'
import { type Filter } from './filters/Filter'
import { ArrayIndexFilter } from './filters/ArrayIndexFilter'
import { ObjectKeyFilter } from './filters/ObjectKeyFilter'
import { CompoundFilter } from './filters/CompoundFilter'
import { ArrayOutputFilter } from './filters/ArrayOutputFilter'

export function parseFilter (filter: string): Filter {
  if (filter.startsWith('[') && filter.endsWith(']')) {
    return new ArrayOutputFilter(parseFilter(filter.slice(1, -1)))
  }

  if (filter.startsWith('.[') && filter.endsWith(']')) {
    return new ObjectKeyFilter(filter.slice(2, -1))
  }

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
