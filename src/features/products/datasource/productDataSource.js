import * as SQLite from 'expo-sqlite'

/**
 * Funcion que recupera todos los registros de productos
 * @returns Object[]
 */
export const getProductsTest = async () => {
    const db = await SQLite.openDatabaseAsync('store.db');

    const allRows = await db.getAllAsync('SELECT * FROM products');
    const arregloPrueba = [];

    for (const row of allRows) {
        arregloPrueba.push(row);
    }

    return new Promise((resolve, reject) => {
        resolve(arregloPrueba);
    })
}

/**
 * Función que registra un nuevo producto
 * @param {string} name string
 * @param {string} barcode string 
 * @param {string} description string
 * @param {number} quantity number 
 * @param {number} price number
 * @param {string} image_url string
 * @param {string} category string
 */
export const addNewProduct = async (
    name,
    barcode,
    description,
    quantity,
    price,
    image_url,
    category) => {
    const db = await SQLite.openDatabaseAsync('store.db');

    const statement = await db.prepareAsync('INSERT INTO products(name,barcode,description,quantity,price,image_url,category) VALUES ($name,$barcode,$description,$quantity,$price,$image_url,$category);');

    try {
        let result = await statement.executeAsync({
            $name: name,
            $barcode: barcode,
            $description: description,
            $quantity: parseInt(quantity),
            $price: parseFloat(price),
            $image_url: image_url,
            $category: category
        });
        console.log('Producto registrado:', result.lastInsertRowId, result.changes);

    } finally {
        await statement.finalizeAsync();
    }
}

/**
 * Funcion para actualizar información de un producto
 * @param {number} productId number
 * @param {string} name string
 * @param {string} description string 
 * @param {number} quantity number
 * @param {number} price number
 * @param {string} image_url string
 * @param {string} category string
 */
export const editProduct = async (
    productId,  
    name,
    description,
    quantity,
    price,
    image_url,
    category) => {
        
    const db = await SQLite.openDatabaseAsync('store.db');
    await db.runAsync('UPDATE products SET name = ? ,description = ? ,quantity = ? ,price = ? ,image_url = ? ,category = ? WHERE id = ?', [name, description, parseInt(quantity), parseFloat(price), image_url, category, productId]);
   
}

/**
 * Función que devuelve todas las categorias registradas de los productos
 * @returns Object[]
 */
export const getCategories = async () => {
    const db = await SQLite.openDatabaseAsync('store.db');

    const allCategories = await db.getAllAsync(`SELECT * FROM categories`);

    const arregloPrueba = [];

    for (const row of allCategories) {
        arregloPrueba.push(row);
    }

    return new Promise((resolve, reject) => {
        resolve(arregloPrueba);
    })
   
}