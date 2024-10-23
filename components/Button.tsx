import { useColors } from "@/hooks/useColors";
import { Pressable, PressableProps } from "react-native";

export default function Button(props: PressableProps) {
  const colors = useColors()
  return (
    <Pressable
      style={{
        width: 200,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal: 5,
      }}
      {...props}
    />
  )
}
