import * as SQLite from 'expo-sqlite'

/**
 * Funcion que trae todas las ventas que se han hecho
 * @returns Arreglo con toda la información de las ventas: Object[]
 */
const getSales = async () => {
    const db = await SQLite.openDatabaseAsync('store.db');

    const allSales = db.getAllAsync('SELECT * FROM ventas');

    return new Promise((resolve, reject) => {
        resolve(allSales);

    });

}

/**
 * Función para registrar una venta
 * @param {string} saledate fecha en que se realizó la venta: string
 * @param {string} barcode codigo de barras del producto que se vendió: string
 * @param {string} name nombre del producto que se vendió: string
 * @param {string} category categoría del producto que se vendió: string
 * @param {number} price precio del producto que se vendió: number
 * @param {number} quantity cantidad de unidades del producto que se vendió: number
 * @param {number} payment producto del precio por la cantidad que se vendió del producto: number
 * @returns Mensaje de venta registrada: string
 */
const addNewSale = async (
    saledate,
    barcode,
    name,
    category,
    price,
    quantity,
    payment) => {
    const db = await SQLite.openDatabaseAsync('store.db');

    const statement = await db.prepareAsync('INSERT INTO ventas(saledate,barcode,name,category,price,quantity,payment) VALUES ($saledate,$barcode,$name,$category,$price,$quantity,$payment)');

    try {
        await statement.executeAsync({
            $saledate: saledate,
            $barcode: barcode,
            $name: name,
            $category: category,
            $price: price,
            $quantity: quantity,
            $payment: payment
        });

    } finally {
        await statement.finalizeAsync();
    }
}

export {
    addNewSale,
    getSales
}