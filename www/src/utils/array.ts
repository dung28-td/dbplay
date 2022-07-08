export const emptyArray = []

type Predicate<T> = (item: T) => any

const defaultPredicate = <T extends unknown>(item: T) => item

export function uniq<T>(arr: T[], predicate: Predicate<T> = defaultPredicate) {
  return arr.filter((v, i, a) => a.findIndex(_v => predicate(_v) === predicate(v)) === i)
}

export function indexes(a: number, b: number) {
  return [...Array(Math.abs(a - b) + 1)].map((_, idx) => (a > b ? b : a) + idx)
}