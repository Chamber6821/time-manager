import { Column } from "./Column"
import { H } from "./H"
import { P } from "./P"
import { Row } from "./Row"

export default function Activity(props: {
  name: string,
  description: string,
  color: string,
  durationMins: number
}) {
  return (
    <Column style={{
      width: '100%',
      left: 0,
      right: 0,
      backgroundColor: props.color,
      borderRadius: 16,
      padding: 16,
      gap: 10,
      alignItems: 'flex-start'
    }}>
      <H>{props.name}</H>
      <Row style={{ width: '100%', justifyContent: 'space-between' }}>
        <P>{props.description}</P>
        <H>{props.durationMins} минут</H>
      </Row>
    </Column>
  )
}
