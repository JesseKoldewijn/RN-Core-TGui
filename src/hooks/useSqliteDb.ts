import { useMigrations } from "drizzle-orm/expo-sqlite/migrator"
import { useEffect } from "react"

import migrations from "@/../drizzle/migrations"
import { db } from "@/db/client"

const useSqliteDb = () => {
  const { success: hasRunMigrations, error: runningMigrationError } = useMigrations(db, migrations)

  useEffect(() => {
    if (runningMigrationError) throw runningMigrationError
  }, [runningMigrationError])

  return {
    isLoaded: hasRunMigrations,
    error: runningMigrationError,
  }
}
export default useSqliteDb
