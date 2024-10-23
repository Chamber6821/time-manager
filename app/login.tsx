import Button from "@/components/Button";
import { Column } from "@/components/Column";
import { H } from "@/components/H";
import { Input } from "@/components/Input";
import { P } from "@/components/P";
import { useNativeText } from "@/hooks/useNativeText";
import { useSession } from "@/hooks/useSession";
import { useUsers } from "@/hooks/useUsers";
import { Link, router } from "expo-router";
import { useState } from "react";

export default function Login() {
  const { enterUsername, enterPassword } = useNativeText()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const { exists } = useUsers()
  const { login } = useSession()
  return (
    <Column style={{ gap: 5 }}>
      <H>Login</H>
      <Input value={name} onChange={e => setName(e.nativeEvent.text)} placeholder={enterUsername} />
      <Input value={password} onChange={e => setPassword(e.nativeEvent.text)} placeholder={enterPassword} secureTextEntry />
      <Button onPress={async () => {
        if (!await exists(name, password)) {
          alert('НЕ ПРАВИОЛЬНО. Попробуй. Еще. Раз.')
          return
        }
        alert('Ты победил...')
        login(name)
        router.replace('/(app)')
      }}><P>Войти</P></Button>
      <Link href="/register"><P>Зарегистрироваться</P></Link>
    </Column >
  )
}
