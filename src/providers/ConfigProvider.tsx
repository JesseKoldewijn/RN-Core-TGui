import { eq } from "drizzle-orm"
import * as network from "expo-network"
import { createContext, useContext, useEffect, useState } from "react"
import { db } from "@/db/client"
import { appConfigTable, type AppConfig } from "@/db/schema"

type ConfigProviderProps = {
  children: React.ReactNode
}

type ConfigContextType = {
  config: () => Promise<AppConfig[]>
  configState: AppConfig[]
  setConfigEntry: (key: string, value: string) => Promise<void>
}

const ConfigContext = createContext<ConfigContextType>({
  config: async () => [],
  configState: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setConfigEntry: async () => {},
})

export const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const [configState, setConfigState] = useState<AppConfig[]>([])

  const config = async () => {
    const config = await db.select().from(appConfigTable).execute()
    setConfigState(config)
    return config
  }

  const setConfigEntry = async (key: string, value: string) => {
    const keyExist = await db
      .selectDistinct()
      .from(appConfigTable)
      .where(eq(appConfigTable.key, key))
      .execute()

    if (keyExist.length === 0) {
      await db
        .insert(appConfigTable)
        .values({ key, value, createdAt: new Date().toUTCString() })
        .execute()
    } else {
      await db
        .update(appConfigTable)
        .set({ value, lastUpdatedAt: new Date().toUTCString() })
        .where(eq(appConfigTable.key, key))
        .execute()
    }

    await config()
  }

  const setLastNetworkState = async () => {
    const ipAddr = await network.getIpAddressAsync()
    const networkType = await network.getNetworkStateAsync()

    await setConfigEntry("lastNetworkType", networkType.type ?? "unknown")
    await setConfigEntry("lastNetworkIP", ipAddr ?? "unknown")

    await config()
  }

  useEffect(() => {
    void setLastNetworkState()
  }, [])

  const val = { config, configState, setConfigEntry }

  return <ConfigContext.Provider value={val}>{children}</ConfigContext.Provider>
}

export const useConfig = () => {
  const { config, configState, setConfigEntry } = useContext(ConfigContext)

  if (!config || !setConfigEntry) {
    throw new Error("useConfig must be used within a ConfigProvider")
  }

  return { config, configState, setConfigEntry }
}
