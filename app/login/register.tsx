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

export default function Register() {
  const { enterUsername, enterPassword } = useNativeText()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const { registered, register } = useUsers()
  const { login } = useSession()
  return (
    <Column style={{ gap: 5 }}>
      <H>Register</H>
      <Input value={name} onChange={e => setName(e.nativeEvent.text)} placeholder={enterUsername} />
      <Input value={password} onChange={e => setPassword(e.nativeEvent.text)} placeholder={enterPassword} secureTextEntry />
      <Button onPress={async () => {
        if (await registered(name)) {
          alert('Опоздал. Такой пользователь уже есть')
          return
        }
        await register(name, password)
        login(name)
        router.replace('/app')
      }}><P>Зарегистрироваться</P></Button>
      <Link href="/login"><P>У меня еже есть аккаунт</P></Link>
    </Column >
  )
}

