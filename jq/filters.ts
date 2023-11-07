import { PipeFilter } from './filters/PipeFilter'
import { type Filter } from './filters/Filter'
import { ArrayIndexFilter } from './filters/ArrayIndexFilter'
import { ObjectKeyFilter } from './filters/ObjectKeyFilter'
import { CompoundFilter } from './filters/CompoundFilter'
import { ArrayOutputFilter } from './filters/ArrayOutputFilter'
import { IdentityFilter } from './filters/IdentityFilter'
import { ArrayFilter } from './filters/ArrayFilter'

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

  if (filter.includes('[]')) {
    const parts = filter.split('[]')
    return new PipeFilter(
      new ObjectKeyFilter(parts[0].slice(1)),
      new ArrayFilter(parseFilter(parts[1]))
    )
  }

  if (filter.includes('.')) {
    return new CompoundFilter(
      filter.slice(1).split('.').map((filter) => parseFilter(filter))
    )
  }

  return new ObjectKeyFilter(filter)
}
