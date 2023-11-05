interface FilterOperation {
  filter: (filter: string, json: any) => any
}

interface ArrayIndexOperation extends FilterOperation {
  type: 'arrayIndex'
  index: number
}

interface ObjectKeyOperation extends FilterOperation {
  type: 'objectKey'
  key: string
}

type Operation = ArrayIndexOperation | ObjectKeyOperation

export function parseFilter (filter: string): Operation[] {
  const isArrayIndexFilter = /^\.\[\d+]$/.test(filter)
  if (isArrayIndexFilter) {
    const arrayIndex = Number(filter.slice(2, -1))
    return [{
      type: 'arrayIndex',
      index: arrayIndex,
      filter: (filter, json) => {
        if (Array.isArray(json)) {
          return json[arrayIndex]
        }

        return null
      }
    }]
  }

  const objectKey = filter.slice(1)

  return objectKey.split('.').map((key) => ({
    type: 'objectKey',
    key,
    filter: (filter, json) => {
      return json[key] ?? null
    }
  }))
}
