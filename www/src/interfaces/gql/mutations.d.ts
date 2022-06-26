interface Mutations {
  CREATE_CONNECTION: {
    data: {
      createConnection: CoreConnectionFields | null
    }
    vars: {
      input: {
        name?: string
        dsn: string
      }
    }
  }
}