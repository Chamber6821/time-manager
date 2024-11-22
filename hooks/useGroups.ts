import { Schema, useDatabase } from "./useDatabase"
import { useEffect, useState } from "react"

export type GroupId = number

export type Group = {
  id: GroupId
  name: string
  color: string
}

export type Groups = {
  groups: Group[]
  create: (group: Omit<Group, 'id'>) => Promise<GroupId>
  update: (id: GroupId, group: Partial<Omit<Group, 'id'>>) => Promise<void>
  delete: (id: GroupId) => Promise<void>
  withId: (id: GroupId) => Group
}

export const useGroups = (): Groups => {
  const { db } = useDatabase()
  const [groups, setGroups] = useState<Group[]>([])

  useEffect(() => {
    if (!db) return
    (async () => {
      const grp = await db.getAllAsync<Schema.activityGroup>('SELECT * FROM activity_group')
      setGroups(
        grp.map(x => ({
          id: x.id,
          name: x.name,
          color: x.color
        })).sort((a, b) => a.name.localeCompare(b.name))
      )
    })()
  }, [db])

  if (!db) return {
    groups: [],
    create: () => { throw new Error('Database not initialized') },
    update: () => { throw new Error('Database not initialized') },
    delete: () => { throw new Error('Database not initialized') },
    withId: () => { throw new Error('Database not initialized') }
  }

  return {
    groups,
    create: async (group: Omit<Group, 'id'>) => await db.runAsync(
      'INSERT INTO activity_group(name, color) VALUES(?, ?)',
      [group.name, group.color]
    ).then(x => x.lastInsertRowId),
    update: async (id: GroupId, group: Partial<Omit<Group, 'id'>>) => {
      setGroups(prev => prev.map(x => x.id === id ? { ...x, ...group } : x))
      await db.runAsync(`
UPDATE activity_group
SET
  name = COALESCE(?, name),
  color = COALESCE(?, color)
WHERE id = ?;`,
        [
          group.name || null,
          group.color || null,
          id
        ])
    },
    delete: async (id: GroupId) => {
      await db.runAsync('DELETE FROM activity_group WHERE id = ?', [id])
    },
    withId: (id: GroupId) => {
      const group = groups.find(g => g.id === id)
      if (!group) {
        return groups[0]
      }
      return group
    }
  }
}
