import { Entypo } from "@expo/vector-icons"
import { Column } from "./Column"
import { H } from "./H"
import { P } from "./P"
import { Row } from "./Row"

const formatTime = (time: Date) => time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })

export namespace Activity {
  export const Card = (props: {
    name: string,
    description?: string,
    color: string,
    start: Date,
    end: Date
  }) =>
    <Column style={{
      left: 0,
      right: 0,
      backgroundColor: props.color,
      borderRadius: 16,
      padding: 16,
      gap: 10,
      alignItems: 'flex-start'
    }}>
      <Row style={{ width: '100%', height: 'auto', justifyContent: 'space-between' }}>
        <H>{props.name}</H>
        <Row style={{ justifyContent: 'flex-end' }}>
          <P>{formatTime(props.start)}</P>
          <P> - </P>
          <P>{formatTime(props.end)}</P>
        </Row>
      </Row>
      {props.description && <P>{props.description}</P>}
    </Column>

  export const Back = (props: {
    color: string,
    buttonColor: string
  }) =>
    <Row style={{
      padding: 4,
      justifyContent: 'flex-end',
      borderRadius: 16,
      borderWidth: 4,
      borderColor: props.color,
      overflow: 'hidden'
    }}>
      <Row style={{ aspectRatio: 1 }}>
        <Entypo
          name="pencil"
          size={36}
          color={props.buttonColor}
        />
      </Row>
    </Row>

}
export default Activity

