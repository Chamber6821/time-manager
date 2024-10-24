import AppStatusBar from "@/components/AppStatusBar";
import { useColors } from "@/hooks/useColors";
import { Stack } from "expo-router";

export default function Layout() {
  const colors = useColors()
  return (
    <Stack
      screenOptions={{
        header: () => <AppStatusBar />,
        statusBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
          justifyContent: 'center',
          alignItems: 'center'
        }
      }}
    >
      <Stack.Screen name="login/index" options={{ header: () => <></> }} />
      <Stack.Screen name="login/register" options={{ header: () => <></> }} />
    </Stack>
  )
}
