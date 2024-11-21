import Activity from "@/components/Activity"
import { Schema, useDatabase } from "./useDatabase"
import { useEffect, useState } from "react"
import { GroupId } from "./useGroups"

export type ActivityId = number

export type Activity = {
  id: ActivityId
  description: string
  started: Date
  ended: Date
  groupId: GroupId
}

export type Activities = {
  activities: Activity[]
  create: (activity: Omit<Activity, 'id'>) => Promise<ActivityId>
  update: (id: ActivityId, activity: Partial<Omit<Activity, 'id'>>) => Promise<void>
  delete: (id: ActivityId) => Promise<void>
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
      setActivities(
        acts.map(x => ({
          id: x.id,
          description: x.description,
          started: new Date(x.start_time),
          ended: new Date(x.end_time),
          groupId: x.group_id
        })).sort((a, b) => +a.started - +b.started)
      )
    })()
  }, [db, userId])

  if (!db || !userId) return {
    activities: [],
    create: () => { throw new Error('Database not initialized') },
    update: () => { throw new Error('Database not initialized') },
    delete: () => { throw new Error('Database not initialized') }
  }
  return {
    activities,
    create: async (activity: Omit<Activity, 'id'>) => await db.runAsync(
      'INSERT INTO activity(user_id, group_id, start_time, end_time, description) VALUES(?, ?, ?, ?, ?)',
      [userId, activity.groupId, +activity.started, +activity.ended, activity.description]
    ).then(x => x.lastInsertRowId),
    update: async (id: ActivityId, activity: Partial<Omit<Activity, 'id'>>) => {
      await db.runAsync(`
UPDATE activity
SET
  group_id = COALESCE(?, group_id),
  start_time = COALESCE(?, start_time),
  end_time = COALESCE(?, end_time),
  description = COALESCE(?, description)
WHERE id = ?;`,
        [
          activity.groupId || null,
          activity.started ? +activity.started : null,
          activity.ended ? +activity.ended : null,
          activity.description || null,
          id
        ])
    },
    delete: async (id: ActivityId) => {
      await db.runAsync('DELETE FROM activity WHERE id = ?', [id])
    }
  }
}
