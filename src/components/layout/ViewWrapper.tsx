import { type ViewProps } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { View, Text } from "tamagui"

type ViewWrapperProps = {
  title?: string
} & React.ComponentPropsWithoutRef<typeof View>

export const ViewWrapper = ({ title, style, ...rest }: ViewWrapperProps) => {
  const safeAreaInsert = useSafeAreaInsets()

  const styles = style as object
  const mergedStyle = {
    top: 0,
    flex: 1,
    ...styles,
  } as ViewProps["style"]

  const Wrap = ({ children }: { children: React.ReactNode }) => {
    if (title)
      return (
        <View style={mergedStyle}>
          <View
            style={{
              paddingTop: safeAreaInsert.top,
              paddingHorizontal: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {title}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 20,
              flex: 1,
            }}
          >
            {children}
          </View>
        </View>
      )

    return (
      <View style={mergedStyle}>
        <View
          style={{
            paddingTop: safeAreaInsert.top,
            paddingHorizontal: 20,
            flex: 1,
          }}
        >
          {children}
        </View>
      </View>
    )
  }

  return (
    <Wrap>
      <View {...rest} />
    </Wrap>
  )
}
