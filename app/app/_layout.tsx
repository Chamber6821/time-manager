import { useSession } from "@/hooks/useSession";
import { Redirect, Slot } from "expo-router";

export default function AppLayout() {
  const { username } = useSession()
  if (!username) return <Redirect href="/login" />
  return <Slot />
}
