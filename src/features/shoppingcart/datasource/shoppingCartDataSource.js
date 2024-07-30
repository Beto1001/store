import * as SQLite from 'expo-sqlite'


export const showDatabase = async () => {
    const db = await SQLite.openDatabaseAsync('store.db');

   
    const result = await db.getAllAsync('SELECT * FROM products');
    console.log('7', result);
}