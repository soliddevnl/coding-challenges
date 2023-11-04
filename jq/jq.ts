export function jq (input: string): string {
  if (input?.length > 0) {
    return JSON.stringify(JSON.parse(input), null, 2)
  }

  return '[]'
}

jq(process.argv[2])
