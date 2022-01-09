import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import logger from '../service/logger';

SQLite.enablePromise(true);

export const getDb = async (): Promise<SQLiteDatabase> => {
  console.time('db');
  const db = await SQLite.openDatabase({
    name: 'Wallet.db',
    location: 'default',
  });
  console.timeEnd('db');
  return db;
};

import migrations from '../store/sqlite/migrations';

const actualVersion = migrations.length;

export const getCurrentVersion = async (
  dbConnection: SQLiteDatabase | null = null,
) => {
  const db = dbConnection === null ? await getDb() : dbConnection;

  const res = await db.executeSql('PRAGMA user_version');

  return res[0].rows.item(0).user_version;
};

export const needUpdate = async (
  dbConnection: SQLiteDatabase | null = null,
) => {
  const current = await getCurrentVersion(dbConnection);

  return current !== actualVersion;
};

export const doUpdate = async (dbConnection: SQLiteDatabase | null = null) => {
  const db = dbConnection === null ? await getDb() : dbConnection;
  const current = await getCurrentVersion(db);

  logger.info(
    `DbMigration: CurrentVersion: ${current}; Target: ${migrations.length}`,
  );
  for (const idx in migrations) {
    const migration = migrations[idx];
    const number = +idx + 1;

    if (number <= current) {
      logger.info(`DbMigration #${number} skipped`, {number, current});
      continue;
    }
    logger.info(`DbMigration #${number} started`);
    try {
      await migration(db);
      await db.executeSql(`PRAGMA user_version = ${number}`);
      logger.info(`DbMigration #${number} executed successfully`);
    } catch (err) {
      // @ts-ignore
      logger.info('DbMigrationError: ', err.toString(), err);
      break;
    }
  }
};

export const migrateIfNeeded = async () => {
  const db = await getDb();

  if (await needUpdate(db)) {
    await doUpdate(db);
    return true;
  }

  return false;
};
