import { useSession } from '@/hooks/useSession'
import { Row } from './Row'
import { P } from './P'
import { H } from './H'
import Button from './Button'
import { useColors } from '@/hooks/useColors'
import { FontAwesome5 } from '@expo/vector-icons'
import { Column } from './Column'
import { useBaseDate } from '@/hooks/useBaseDate'

export default function AppStatusBar() {
  const colors = useColors()
  const { username, logout } = useSession()
  const { baseDate } = useBaseDate()
  return (
    <Column style={{
      paddingTop: 8,
      backgroundColor: colors.background,
    }}>
      <Row style={{
        width: '100%',
        height: 'auto',
        justifyContent: 'space-between',
      }}>
        <Row style={{ gap: 8 }}>
          <FontAwesome5 name="user-astronaut" size={36} color={colors.onBackground} />
          <H>{username}</H>
        </Row>
        <Column style={{ width: 'auto' }}>
          <Button onPress={logout}><P>Выйти</P></Button>
        </Column>
      </Row >
      <P>{baseDate.toLocaleDateString('ru-Ru', { year: 'numeric', month: '2-digit', day: '2-digit' })}</P>
    </Column>
  )
}
