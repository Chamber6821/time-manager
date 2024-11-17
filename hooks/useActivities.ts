import Activity from "@/components/Activity"
import { Schema, useDatabase } from "./useDatabase"
import { useEffect, useState } from "react"

export type Activity = {
  id: number,
  description: string,
  started: Date,
  ended: Date,
  group: {
    id: number,
    name: string,
    color: string
  }
}
export type Activities = {
  activities: Activity[],
  create: (description: string, groupId: number, start: Date, end: Date) => Promise<void>
}
export const useActivities = (username: string): Activities => {
  const { db } = useDatabase()
  const [userId, setUserId] = useState(0)
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    if (!db) return
    db.getFirstAsync<Schema.user>('SELECT * FROM user WHERE name = ?', [username])
      .then(x => x && setUserId(x.id))
  }, [db])

  useEffect(() => {
    if (!db) return
    if (!userId) return
    (async () => {
      const acts = await db.getAllAsync<Schema.activity>('SELECT * FROM activity WHERE user_id = ?', [userId])
      const groups = await db.getAllAsync<Schema.activityGroup>('SELECT * FROM activity_group')
      setActivities(
        acts.map(x => ({
          id: x.id,
          description: x.description,
          started: new Date(x.start_time),
          ended: new Date(x.end_time),
          group: groups.filter(y => y.id === x.group_id)[0]
        })).sort((a, b) => +a.started - +b.started)
      )
    })()
  }, [db, userId])

  if (!db || !userId) return {
    activities: [],
    create: () => { throw new Error('Database not initialized') }
  }
  return {
    activities,
    create: async (description: string, groupId: number, start: Date, end: Date) => {
      await db.runAsync(
        'INSERT INTO activity(user_id, group_id, start_time, end_time, description) VALUES(?, ?, ?, ?, ?)',
        [userId, groupId, +start, +end, description]
      )
    }
  }
}
