export async function jq (input: string, args: Set<string>): Promise<string> {
  function prettify (json: any): string {
    return JSON.stringify(json, null, 2)
  }

  function isArrayIndex (arg: string): boolean {
    return /^\.\[\d+]$/.test(arg)
  }

  function isObjectKey (arg: string): boolean {
    return /^\.\w+$/.test(arg)
  }

  if (input?.length > 0) {
    const jsonInput = JSON.parse(input)
    if (args.size === 0 || args.has('.')) {
      return prettify(jsonInput)
    }

    const firstArg = args.values().next().value

    if (isArrayIndex(firstArg) && jsonInput instanceof Array) {
      const arrayIndex = firstArg.slice(2, -1)
      return prettify(jsonInput[arrayIndex])
    }

    if (isObjectKey(firstArg) && jsonInput instanceof Object) {
      const objectKey = firstArg.slice(1)
      if (objectKey in jsonInput) {
        return prettify(jsonInput[objectKey])
      }
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
  const args = new Set(process.argv.slice(2))
  const input = await readInput()
  const result = await jq(input, args)
  process.stdout.write(result)
  return result
}

void main()
