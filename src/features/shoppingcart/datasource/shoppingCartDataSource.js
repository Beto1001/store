import * as SQLite from 'expo-sqlite'


/**
 * Función para traer todos los productos agregados al carrito
 * @returns Arreglo con todos los productos agregados al carrito: Object[]
 */
export const getShoppingCart = async () => {
    const db = await SQLite.openDatabaseAsync('store.db');

   
    const allRows = await db.getAllAsync('SELECT * FROM carrito');
    const arregloPrueba = [];

    for (const row of allRows) {
        arregloPrueba.push(row);
    }

    return new Promise((resolve, reject) => {
        resolve(arregloPrueba);
    })
}