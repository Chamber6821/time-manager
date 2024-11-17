import Activity from "@/components/Activity";
import { Column } from "@/components/Column";
import { useActivities } from "@/hooks/useActivities";
import { useColors } from "@/hooks/useColors";
import { useSession } from "@/hooks/useSession";
import { View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

export default function AppIndex() {
  const colors = useColors()
  const { username } = useSession()
  if (!username) return <></>
  const { activities } = useActivities(username)
  return (
    <Column style={{ paddingVertical: 8, height: '100%', justifyContent: 'flex-start' }}>
      <SwipeListView
        data={activities}
        renderItem={x =>
          <View style={{ marginBottom: 8 }}>
            <Activity.Card
              key={x.item.id}
              name={x.item.description}
              color={x.item.group.color}
              start={x.item.started}
              end={x.item.ended}
            />
          </View>
        }
        renderHiddenItem={x =>
          <View style={{ marginBottom: 8 }}>
            <Activity.Back
              key={x.item.id}
              color={x.item.group.color}
              buttonColor={colors.onBackground}
            />
          </View>
        }
        disableRightSwipe={true}
        rightOpenValue={-150}
      />
    </Column>
  )
}
