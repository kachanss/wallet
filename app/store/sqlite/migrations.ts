import {SQLiteDatabase} from 'react-native-sqlite-storage';

const migrations = [
  async (db: SQLiteDatabase) => {
    await db.executeSql(`
      CREATE TABLE \`tests\` (
        \`id\` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        \`name\` VARCHAR(50) NOT NULL,
        \`value\` VARCHAR(100) NOT NULL
      );
    `);
  },
  async (db: SQLiteDatabase) => {
    await db.executeSql(`
      CREATE UNIQUE INDEX test_name_unique ON \`tests\` (\`name\`);
    `);
  },
];

export default migrations;
