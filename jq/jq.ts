export async function jq (input: string, args: Set<string>): Promise<string> {
  function prettify (json: string): string {
    return JSON.stringify(JSON.parse(json), null, 2)
  }

  if (input?.length > 0) {
    const jsonInput = JSON.parse(input)
    if (args.size === 0 || args.has('.')) {
      return prettify(JSON.stringify(jsonInput))
    }
    if (args.has('.[0]')) {
      return prettify(JSON.stringify(jsonInput[0]))
    }
  }

  return '[]'
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
