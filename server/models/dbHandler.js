import { Low, JSONFile } from 'lowdb';
let db;

export const writeToDB = async (slice, data) => {
    getDatabaseHandler();
    db.data = db.data || {};
    db.data[slice] = data;
    console.log(db.data);
    await db.write();
}

export const getDatabaseHandler = () => {
    if (!db) {
        db = new Low(new JSONFile('db.json'));
        console.log(db);
    }
    return db;
}