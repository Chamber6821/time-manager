import Button from "@/components/Button";
import { Column } from "@/components/Column";
import { H } from "@/components/H";
import { P } from "@/components/P";
import { useSession } from "@/hooks/useSession";

export default function AppIndex() {
  const { username, logout } = useSession()
  return (
    <Column>
      <H>App index</H>
      <P>Hello {username}</P>
      <Button onPress={logout}><P>Выйти</P></Button>
    </Column>
  )
}
