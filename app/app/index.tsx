import Activity from "@/components/Activity";
import { Column } from "@/components/Column";
import { useColors } from "@/hooks/useColors";
import { View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

export default function AppIndex() {
  const colors = useColors()
  const activities = [
    {
      id: 1,
      name: 'Сходил в магазин',
      duration: 30
    },
    {
      id: 2,
      name: 'Поели всей семьей',
      duration: 30
    },
    {
      id: 3,
      name: 'Помыл посуду',
      duration: 30
    },
    {
      id: 4,
      name: 'Сходил в магазин',
      duration: 30
    },
    {
      id: 5,
      name: 'Поели всей семьей',
      duration: 30
    },
    {
      id: 6,
      name: 'Помыл посуду',
      duration: 30
    },
    {
      id: 7,
      name: 'Сходил в магазин',
      duration: 30
    },
    {
      id: 8,
      name: 'Поели всей семьей',
      duration: 30
    },
    {
      id: 9,
      name: 'Помыл посуду',
      duration: 30
    },
  ]
  return (
    <Column style={{ paddingVertical: 8 }}>
      <Column style={{ justifyContent: 'flex-start' }}>
        <SwipeListView
          data={activities}
          renderItem={x =>
            <View style={{ marginBottom: 8 }}>
              <Activity.Card
                key={x.item.id}
                name={x.item.name}
                description="aboba"
                color={colors.primary}
                durationMins={x.item.duration}
              />
            </View>
          }
          renderHiddenItem={x =>
            <View style={{ marginBottom: 8 }}>
              <Activity.Back
                key={x.item.id}
                color={colors.primary}
                buttonColor={colors.onBackground}
              />
            </View>
          }
          disableRightSwipe={true}
          rightOpenValue={-150}
        />
      </Column>
    </Column >
  )
}
