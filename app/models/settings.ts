import {getDb} from '../store/sqlite';
import migrations from '../store/sqlite/migrations';

const actualVersion = migrations.length;

export const getCurrentVersion = async () => {
  const db = await getDb();

  const res = await db.executeSql('PRAGMA user_version');

  return res[0].rows.item(0).user_version;
};

export const needUpdate = async () => {
  const current = await getCurrentVersion();

  return current !== actualVersion;
};

export const doUpdate = async () => {
  const db = await getDb();
  const current = await getCurrentVersion();

  console.log(
    `DbMigration: CurrentVersion: ${current}; Target: ${migrations.length}`,
  );
  for (const idx in migrations) {
    const migration = migrations[idx];
    const number = +idx + 1;

    if (number <= current) {
      console.log(`DbMigration #${number} skipped`, {number, current});
      continue;
    }
    console.log(`DbMigration #${number} started`);
    try {
      await migration(db);
      await db.executeSql(`PRAGMA user_version = ${number}`);
      console.log(`DbMigration #${number} executed successfully`);
    } catch (err) {
      // @ts-ignore
      console.log('DbMigrationError: ', err.toString(), err);
      break;
    }
  }
};
