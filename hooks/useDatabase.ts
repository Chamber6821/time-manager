import { create } from "zustand";
import { SQLiteDatabase, openDatabaseAsync } from "expo-sqlite";

type Database = {
  db?: SQLiteDatabase
}

export namespace Schema {
  export type user = {
    id: number,
    name: string,
    password: string
  }
}

export const useDatabase = create<Database>(() => ({}))

openDatabaseAsync('time')
  .then(async db => {
    await db.runAsync(`
CREATE TABLE IF NOT EXISTS
  user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )
`);
    useDatabase.setState({ db })
  })
  .catch(console.error)
  .catch(alert)

