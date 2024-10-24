import Activity from "@/components/Activity";
import { Centered } from "@/components/Centered";
import { Column } from "@/components/Column";
import { Row } from "@/components/Row";
import { useColors } from "@/hooks/useColors";
import { Entypo } from "@expo/vector-icons";
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
    <Column style={{
      width: '100%',
      paddingVertical: 8,
    }}>
      <Column style={{
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
      }}>
        <SwipeListView
          data={activities}
          renderItem={x =>
            <View style={{ marginBottom: 8 }}>
              <Activity
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
              <Row style={{
                height: '100%',
                padding: 4,
                justifyContent: 'flex-end',
                borderRadius: 16,
                borderWidth: 4,
                borderColor: colors.primary,
                overflow: 'hidden'
              }}>
                <Centered style={{ height: '100%', aspectRatio: 1 }}>
                  <Entypo
                    name="pencil"
                    size={36}
                    color={colors.onBackground}
                  />
                </Centered>
              </Row>
            </View>
          }
          disableRightSwipe={true}
          rightOpenValue={-150}
        />
      </Column>
    </Column >
  )
}
