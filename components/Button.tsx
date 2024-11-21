import { useColors } from "@/hooks/useColors";
import { Pressable, PressableProps } from "react-native";

export default function Button(props: PressableProps) {
  const colors = useColors()
  return (
    <Pressable
      {...props}
      style={(...args) => [
        {
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.primary,
          borderRadius: 5,
          paddingVertical: 8,
          paddingHorizontal: 16,
        },
        typeof props.style === 'function' ? props.style(...args) : props.style
      ]}
    />
  )
}
