import { Filter } from './Filter'

export class IdentityFilter extends Filter {
  filter (input: any): any {
    return input
  }
}
