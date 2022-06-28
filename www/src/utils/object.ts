export function some<T>(object: T, predicate: (item: [string, unknown]) => boolean) {
  for (const item of Object.entries(object)) {
    if (predicate(item)) return true
  }
  return false
}

export function every<T>(object: T, predicate: (item: [string, unknown]) => boolean) {
  for (const item of Object.entries(object)) {
    if (!predicate(item)) return false
  }
  return true
}