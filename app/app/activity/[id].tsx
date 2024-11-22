import Button from '@/components/Button'
import { Column } from '@/components/Column'
import { H } from '@/components/H'
import { Input } from '@/components/Input'
import { P } from '@/components/P'
import { Row } from '@/components/Row'
import { useActivities } from '@/hooks/useActivities'
import { useColors } from '@/hooks/useColors'
import { useGroups } from '@/hooks/useGroups'
import { useSession } from '@/hooks/useSession'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useMemo, useState } from 'react'
import { FlatList, Modal, Pressable } from 'react-native'

export default function EditActivity() {
  const { id } = useLocalSearchParams()
  const colors = useColors()
  const { username = '' } = useSession()
  const { activities, update } = useActivities(username)
  const { groups, withId } = useGroups()
  const activity = useMemo(() => activities.find(x => x.id === +id), [id, activities])
  const [modalVisible, setModalVisible] = useState(false)
  const [chooseStart, setChooseStart] = useState(false)
  const [chooseEnd, setChooseEnd] = useState(false)
  const router = useRouter()

  const [description, setDescription] = useState('')
  const [groupId, setGroupId] = useState<number>(0)
  const [started, setStarted] = useState(new Date())
  const [ended, setEnded] = useState(started)

  useEffect(() => {
    if (!activity) return
    setDescription(activity.description)
    setGroupId(activity.groupId)
    setStarted(activity.started)
    setEnded(activity.ended)
  }, [activity])

  if (!activity) return <></>

  const handleSubmit = async () => {
    if (description && groupId && started < ended) {
      await update(activity.id, { description, started, ended, groupId })
      router.back()
    }
  }

  const updateDate = (date: Date, setDate: (x: Date) => void) => (_: any, newDate?: Date) => {
    setChooseStart(false)
    if (!newDate) return
    const copy = new Date(date)
    copy.setHours(newDate.getHours())
    copy.setMinutes(newDate.getMinutes())
    setDate(copy)
  }

  return (
    <Column style={{
      width: '70%',
      gap: 8,
    }}>
      <H>Редактировать</H>
      <Input
        placeholder='Описание'
        value={description}
        onChangeText={setDescription}
      />
      <Button
        style={groupId ? { backgroundColor: withId(groupId).color } : undefined}
        onPress={() => setModalVisible(true)}
      >
        <P>
          {groupId ? withId(groupId).name : 'Выберите группу'}
        </P>
      </Button>
      <Row style={{ width: '100%', height: 'auto', gap: 8 }}>
        <Button style={{ flex: 1 }} onPress={() => setChooseStart(true)}>
          <P>С {started.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</P>
        </Button>
        <Button style={{ flex: 1 }} onPress={() => setChooseEnd(true)}>
          <P>До {ended.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</P>
        </Button>
      </Row>
      <Button onPress={handleSubmit}>
        <P>Сохранить</P>
      </Button>

      {chooseStart && <DateTimePicker
        value={started}
        mode="time"
        onChange={(...args) => { setChooseStart(false); updateDate(started, setStarted)(...args) }}
      />}
      {chooseEnd && <DateTimePicker
        value={ended}
        mode="time"
        onChange={(...args) => { setChooseEnd(false); updateDate(ended, setEnded)(...args) }}
      />}
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <Pressable onPress={() => setModalVisible(false)}>
          <Column style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            height: '100%'
          }}>
            <Column style={{
              padding: 20,
              width: '70%',
              backgroundColor: colors.background,
              gap: 20,
            }}>
              <FlatList
                style={{ width: '100%' }}
                data={groups}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) => (
                  <Button
                    style={{
                      width: '100%',
                      backgroundColor: item.color
                    }}
                    onPress={() => {
                      setGroupId(item.id)
                      setModalVisible(false)
                    }}
                  >
                    <P>{item.name}</P>
                  </Button>
                )}
              />
            </Column>
          </Column>
        </Pressable>
      </Modal>
    </Column>
  )
}
