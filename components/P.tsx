import { Color, useColors } from "@/hooks/useColors";
import { Text } from "react-native";

export const P = (props: Text['props'] & { color?: Color }) => {
  const colors = useColors()
  return (
    <Text
      {...props}
      style={[{
        color: colors[props.color || 'onBackground'],
        fontSize: 20
      }, props.style]}
    />
  )
}
