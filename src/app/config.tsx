import { useEffect, useState } from "react"
import { Card, ScrollView, Text, View, XStack } from "tamagui"

import { ViewWrapper } from "@/components/layout/ViewWrapper"
import { db } from "@/db/client"
import { type AppConfig, appConfigTable } from "@/db/schema"

const DBView = () => {
  const [database, setDatabase] = useState<AppConfig[]>()

  const fetchConfig = async () => {
    const config = await db.select().from(appConfigTable).execute()
    setDatabase(config)
  }

  useEffect(() => {
    void fetchConfig()
  }, [])

  return (
    <ViewWrapper title="Configuration">
      <ScrollView height="100%" width="100%" backgroundColor="$background" borderRadius="$2">
        <XStack $sm={{ flexDirection: "column" }} gap={10}>
          {database?.map((config) => (
            <Card
              key={config.id}
              animation="bouncy"
              hoverStyle={{ scale: 0.925 }}
              pressStyle={{ scale: 0.875 }}
            >
              <Card.Header>
                <Text>{config.key}</Text>
              </Card.Header>
              <View
                style={{
                  display: "flex",
                  gap: 5,
                  paddingBottom: 15,
                  paddingHorizontal: 20,
                }}
              >
                <Text>{config.value}</Text>
              </View>
              <Card.Background />
            </Card>
          ))}
        </XStack>
      </ScrollView>
    </ViewWrapper>
  )
}

export default DBView
