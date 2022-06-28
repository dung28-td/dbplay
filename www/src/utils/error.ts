export const getErrorMessage = (error: unknown) => {
  if (typeof error === 'string') return error
  if (error instanceof Error) return error.message

  console.error(error)
  return "Error!"
}