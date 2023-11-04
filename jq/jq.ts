export async function jq (input: string, args: Set<string>): Promise<string> {
  if (input?.length > 0) {
    if (args.size === 0 || args.has('.')) {
      return JSON.stringify(JSON.parse(input), null, 2)
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
