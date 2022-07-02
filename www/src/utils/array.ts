export function uniq<T>(arr: T[]) {
  return arr.filter((v, i, a) => a.indexOf(v) === i)
}

export function indexes(a: number, b: number) {
  return [...Array(Math.abs(a - b) + 1)].map((_, idx) => (a > b ? b : a) + idx)
}