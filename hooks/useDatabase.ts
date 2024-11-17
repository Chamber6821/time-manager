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
  export type activityGroup = {
    id: number,
    name: string,
    color: string
  }
  export type activity = {
    id: number,
    user_id: number,
    group_id: number,
    start_time: number,
    end_time: number,
    description: string
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
  );
`)
    await db.runAsync(`
CREATE TABLE IF NOT EXISTS
  activity_group (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    color TEXT NOT NULL
  );
`)
    await db.runAsync(`
CREATE TABLE IF NOT EXISTS
  activity(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    group_id INTEGER NOT NULL,
    start_time INTEGER NOT NULL,
    end_time INTEGER NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(id),
    FOREIGN KEY(group_id) REFERENCES activity_group(id)
  );
`);
    (global as any).db = db
    useDatabase.setState({ db })
  })
  .catch(console.error)
  .catch(alert)

