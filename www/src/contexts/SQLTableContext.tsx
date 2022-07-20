import { createContext, useContext } from "react";

const SQLTableContext = createContext<SQLTable | undefined>(undefined)

export const useSQLTable = () => {
  const context = useContext(SQLTableContext)
  if (!context) throw new Error("No SQL Table Context found.")
  return context
}

export default SQLTableContext