import { useColors } from "@/hooks/useColors"
import { TextInput } from "react-native"

export const Input = (props: TextInput['props']) => {
  const colors = useColors()
  return (
    <TextInput
      style={{
        width: '100%',
        backgroundColor: colors.onBackground,
        fontSize: 20,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
      }}
      {...props}
    />
  )
}
