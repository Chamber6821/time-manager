import { useColors } from "@/hooks/useColors"
import { TextInput } from "react-native"

export const Input = (props: TextInput['props']) => {
  const colors = useColors()
  return (
    <TextInput
      style={{
        width: 200,
        height: 30,
        backgroundColor: colors.onBackground,
        fontSize: 20,
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal: 5
      }}
      {...props}
    />
  )
}
