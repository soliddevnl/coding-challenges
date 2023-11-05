import { parseFilter } from './filters'

export async function jq (input: string, filter: string): Promise<string> {
  function prettify (json: any): string {
    return JSON.stringify(json, null, 2)
  }

  function filterJson (filter: string, json: any): any {
    const filterOperations = parseFilter(filter)

    let filteredJson = json
    for (const filterOperation of filterOperations) {
      filteredJson = filterOperation.filter(filter, filteredJson)
    }

    return filteredJson
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
