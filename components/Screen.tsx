import { useColors } from "@/hooks/useColors";
import { Centered } from "./Centered";
import { PhycicalScreen } from "./PhysicalScreen";
import { StatusBar } from "./StatusBar";

export function Screen(props: { children: any }) {
  const colors = useColors()
  return (
    <PhycicalScreen>
      <StatusBar />
      <Centered style={{
        width: '100%',
        height: '100%',
        backgroundColor: colors.background
      }}>
        {props.children}
      </Centered>
    </PhycicalScreen>
  )
}
