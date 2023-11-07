## How to use it

### Pretty print JSON
```bash
curl -s 'https://dummyjson.com/quotes?limit=2' | npx ts-node jq.ts
```

### Object key filter
Returns the quotes array.
```bash
curl -s 'https://dummyjson.com/quotes?limit=2' | npx ts-node jq.ts '.quotes'
```

### Object key filter different syntax
Returns the quotes array.
```bash
curl -s 'https://dummyjson.com/quotes?limit=2' | npx ts-node jq.ts '.["quotes"]'
```

### Array index access
Returns the second quote in the quotes array.
```bash
curl -s 'https://dummyjson.com/quotes?limit=2' | npx ts-node jq.ts '.quotes | [1]'
```

