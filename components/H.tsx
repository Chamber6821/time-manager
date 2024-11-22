import { Color, useColors } from "@/hooks/useColors";
import { Text } from "react-native";

export const H = (props: Text['props'] & { color?: Color }) => {
  const colors = useColors()
  return (
    <Text
      {...props}
      style={[{
        flexShrink: 1,
        color: colors[props.color || 'onBackground'],
        fontSize: 24
      }, props.style]}
    />
  )
}
