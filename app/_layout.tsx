import { useColors } from "@/hooks/useColors";
import { Stack } from "expo-router";

export default function Layout() {
  const colors = useColors()
  return (
    <Stack
      initialRouteName="login"
      screenOptions={{
        header: () => <></>,
        statusBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
          justifyContent: 'center',
          alignItems: 'center'
        }
      }}
    />
  )
}
