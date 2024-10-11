import { useColors } from "@/hooks/useColors";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

export function StatusBar() {
  const colors = useColors()
  return (
    <ExpoStatusBar hidden={false} style="auto" backgroundColor={colors.background} />
  )
}
