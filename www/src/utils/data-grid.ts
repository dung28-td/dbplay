export const flexByType = (type: string) => {
  switch (type) {
    case 'boolean':
    case 'integer':
    case 'bigint':
      return 0.5
    default:
      return 1
  }
}