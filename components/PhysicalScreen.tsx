import { Centered } from "./Centered";

export const PhycicalScreen = (props: { children: any }) => (
  <Centered style={{
    width: '100%',
    height: '100%',
  }}>{props.children}</Centered>
)
