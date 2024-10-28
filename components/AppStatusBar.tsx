import { useSession } from '@/hooks/useSession'
import { Row } from './Row'
import { P } from './P'
import { H } from './H'
import Button from './Button'
import { useColors } from '@/hooks/useColors'
import { FontAwesome5 } from '@expo/vector-icons'

export default function AppStatusBar() {
  const colors = useColors()
  const { username, logout } = useSession()
  return (
    <Row style={{
      width: '100%',
      height: 'auto',
      paddingTop: 8,
      justifyContent: 'space-between',
      backgroundColor: colors.background,
    }}>
      <Row style={{ gap: 8 }}>
        <FontAwesome5 name="user-astronaut" size={36} color={colors.onBackground} />
        <H>{username}</H>
      </Row>
      <Row>
        <Button onPress={logout}><P>Выйти</P></Button>
      </Row>
    </Row >
  )
}
