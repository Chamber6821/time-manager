import Activity from "@/components/Activity";
import Button from "@/components/Button";
import { Column } from "@/components/Column";
import { Row } from "@/components/Row";
import { useActivities } from "@/hooks/useActivities";
import { useColors } from "@/hooks/useColors";
import { useGroups } from "@/hooks/useGroups";
import { useSession } from "@/hooks/useSession";
import { Feather, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { Link } from "expo-router";
import { View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import DateTimePicker from '@react-native-community/datetimepicker'
import { useBaseDate } from "@/hooks/useBaseDate";
import { useMemo, useState } from "react";

export default function AppIndex() {
  const colors = useColors()
  const { username } = useSession()
  if (!username) return <></>
  const { activities } = useActivities(username)
  const { withId: groupWithId } = useGroups()
  const { baseDate, set: setBaseDate } = useBaseDate()
  const [chooseBaseDate, setChooseBaseDate] = useState(false)

  const filteredActivities = useMemo(() =>
    activities.filter(x => x.started.toDateString() === baseDate.toDateString()),
    [activities, baseDate]
  )

  return (
    <Column style={{ paddingVertical: 8, height: '100%' }}>
      <Column style={{ flexGrow: 1, justifyContent: 'flex-start' }}>
        <SwipeListView
          data={filteredActivities}
          renderItem={x =>
            <View style={{ marginBottom: 8 }}>
              <Activity.Card
                key={x.item.id}
                name={x.item.description}
                color={groupWithId(x.item.groupId).color}
                start={x.item.started}
                end={x.item.ended}
              />
            </View>
          }
          renderHiddenItem={x =>
            <View style={{ marginBottom: 8 }}>
              <Activity.Back
                key={x.item.id}
                color={groupWithId(x.item.groupId).color}
                buttonColor={colors.onBackground}
              />
            </View>
          }
          leftOpenValue={150}
          rightOpenValue={-150}
        />
      </Column>
      <Row style={{ width: '100%', height: 'auto', justifyContent: 'space-evenly' }}>
        <Column style={{ width: 'auto' }}>
          <Button onPress={() => setChooseBaseDate(true)}>
            <FontAwesome name="calendar-o" size={24} color={colors.onBackground} />
          </Button>
        </Column>
        <Column style={{ width: 'auto' }}>
          <Link href="/app/activity/new" asChild>
            <Button>
              <FontAwesome6 name="add" size={24} color={colors.onBackground} />
            </Button>
          </Link>
        </Column>
        <Column style={{ width: 'auto' }}>
          <Button>
            <Feather name="settings" size={24} color={colors.onBackground} />
          </Button>
        </Column>
      </Row>
      {chooseBaseDate && <DateTimePicker
        value={baseDate}
        mode="date"
        onChange={(_, newDate) => {
          setChooseBaseDate(false)
          if (!newDate) return
          const copy = new Date(baseDate)
          copy.setFullYear(newDate.getFullYear(), newDate.getMonth(), newDate.getDate())
          setBaseDate({ baseDate: copy })
        }}
      />}
    </Column>
  )
}
