import { Schema } from '@/hooks/useDatabase';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as SQLite from 'expo-sqlite';
import * as XLSX from 'xlsx';

export const exportUserDataToExcel = async (db: SQLite.SQLiteDatabase, username: string) => {
  const user = await db.getFirstAsync<Schema.user>(
    'SELECT * FROM user WHERE name = ?',
    [username],
  )
  if (!user) {
    console.log('Пользователь не найден');
    return;
  }

  const activitiesQuery = await db.getAllAsync<Schema.activity & { group_name: string }>(
    `
      SELECT a.*, g.name AS group_name
      FROM activity a
      JOIN activity_group g ON a.group_id = g.id
      WHERE a.user_id = ?
    `,
    [user.id],
  );

  const dataToExport = activitiesQuery.map(activity => ({
    ID: activity.id,
    GroupID: activity.group_id,
    GroupName: activity.group_name,
    StartTime: new Date(activity.start_time).toLocaleString(),
    EndTime: new Date(activity.end_time).toLocaleString(),
    Description: activity.description,
  }));

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Activities');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

  const base64 = btoa(
    new Uint8Array(excelBuffer.split('').map((c: string) => c.charCodeAt(0)))
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );

  const fileName = `${FileSystem.documentDirectory}user_activities_${username}.xlsx`;

  await FileSystem.writeAsStringAsync(fileName, base64, {
    encoding: FileSystem.EncodingType.Base64,
  });

  await Sharing.shareAsync(fileName);
};
