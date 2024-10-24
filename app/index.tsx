import { useSession } from "@/hooks/useSession";
import { Redirect } from "expo-router";

export default function Index() {
  const { username } = useSession()
  if (username) return <Redirect href="/app" />
  return <Redirect href="/login" />
}
