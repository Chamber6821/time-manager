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
    <Row style={{
      width: '100%',
      backgroundColor: props.color,
      borderRadius: 16,
      padding: 16,
      gap: 10,
      justifyContent: 'space-between'
    }}>
      <Column style={{
        alignItems: 'flex-start'
      }}>
        <H>{props.name}</H>
        <P>{props.description}</P>
      </Column>
      <H>{props.durationMins} минут</H>
    </Row>
  )
}
