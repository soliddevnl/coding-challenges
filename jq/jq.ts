export async function jq (input: string, filter: string): Promise<string> {
  function prettify (json: any): string {
    return JSON.stringify(json, null, 2)
  }

  function isArrayIndex (arg: string): boolean {
    return /^\.\[\d+]$/.test(arg)
  }

  function filterJson (filter: string, json: any): any {
    if (isArrayIndex(filter) && json instanceof Array) {
      const arrayIndex = Number(filter.slice(2, -1))
      return json[arrayIndex]
    }

    const objectKey = filter.slice(1)

    let filteredJson = json
    if (objectKey.includes('.')) {
      for (const key of objectKey.split('.')) {
        filteredJson = filterJson(`.${key}`, filteredJson)
      }

      return filteredJson
    }

    if (filteredJson instanceof Object && (objectKey in filteredJson)) {
      return filteredJson[objectKey]
    }

    return null
  }

  if (input?.length > 0) {
    const jsonInput = JSON.parse(input)
    if (filter.length === 0 || filter === '.') {
      return prettify(jsonInput)
    }

    const filters = filter.split(' | ')

    let filteredJson = jsonInput
    for (const filter of filters) {
      filteredJson = filterJson(filter, filteredJson)
    }

    if (filteredJson !== null) {
      return prettify(filteredJson)
    }
  }

  return 'null'
}

async function readInput (): Promise<string> {
  return await new Promise((resolve, reject) => {
    let input = ''
    process.stdin.on('data', (data) => {
      input += data.toString()
    })
    process.stdin.on('end', () => {
      resolve(input)
    })
    return input
  })
}

export async function main (): Promise<string> {
  const input = await readInput()
  const result = await jq(input, process.argv[2])
  process.stdout.write(result)
  return result
}

void main()
