import { PipeFilter } from './filters/PipeFilter'
import { type Filter } from './filters/Filter'
import { ArrayIndexFilter } from './filters/ArrayIndexFilter'
import { ObjectKeyFilter } from './filters/ObjectKeyFilter'
import { CompoundFilter } from './filters/CompoundFilter'
import { ArrayOutputFilter } from './filters/ArrayOutputFilter'
import { IdentityFilter } from './filters/IdentityFilter'

export function parseFilter (filter: string): Filter {
  if (filter === '.') {
    return new IdentityFilter()
  }

  if (filter.startsWith('[') && filter.endsWith(']')) {
    return new ArrayOutputFilter(parseFilter(filter.slice(1, -1)))
  }

  if (filter.startsWith('.[') && filter.endsWith(']')) {
    const filterIndex = filter.slice(2, -1)
    if (isNaN(Number(filterIndex))) {
      return new ObjectKeyFilter(filterIndex)
    }
    return new ArrayIndexFilter(Number(filterIndex))
  }

  if (filter.includes(' | ')) {
    const filters = filter.split(' | ')
    return new PipeFilter(
      parseFilter(filters[0]),
      parseFilter(filters[1])
    )
  }

  if (filter.includes('.')) {
    return new CompoundFilter(
      filter.slice(1).split('.').map((filter) => parseFilter(filter))
    )
  }

  return new ObjectKeyFilter(filter)
}
