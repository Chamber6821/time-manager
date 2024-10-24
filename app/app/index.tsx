import Activity from "@/components/Activity";
import { Column } from "@/components/Column";
import { useColors } from "@/hooks/useColors";

export default function AppIndex() {
  const colors = useColors()
  const activities: [string, number][] = [
    ['Сходил в магазин', 30],
    ['Поели всей семьей', 30],
    ['Помыл посуду', 30],
  ]
  return (
    <Column style={{
      margin: 8,
    }}>
      <Column style={{
        height: '100%',
        justifyContent: 'flex-start',
      }}>
        <Column style={{ gap: 10 }}>
          {
            activities.map(x => (
              <Activity
                key={x[0] + x[1]}
                name={x[0]}
                description="aboba"
                color={colors.primary}
                durationMins={x[1]}
              />
            ))
          }
        </Column>
      </Column>
    </Column>
  )
}
