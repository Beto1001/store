import * as SQLite from 'expo-sqlite'

/**
 * Funcion que recupera todos los registros de productos
 * @returns Arreglo con todos los productos registrados: Object[]
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
 * @param {string} name nombre del producto: string
 * @param {string} barcode codigo de barras del producto: string 
 * @param {string} description descripcion del producto: string
 * @param {number} quantity cantidad de productos: number 
 * @param {number} price precio del producto: number
 * @param {string} image_url URL de la imagen del producto: string
 * @param {string} category categoria del producto: string
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
 * @param {number} productId ID del producto: number
 * @param {string} name nuevo nombre del producto: string
 * @param {string} description nueva descripcion del producto: string 
 * @param {number} quantity nueva cantidad de productos: number
 * @param {number} price nuevo precio del producto: number
 * @param {string} image_url nueva URL de la imagen del producto: string
 * @param {string} category nueva categoria del producto: string
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

    await db.runAsync('UPDATE products SET name = ? , description = ? ,quantity = ? ,price = ? ,category = ?,image_url = ? WHERE id = ?', [name, description, parseInt(quantity), parseFloat(price),category, image_url, productId]);
    return new Promise((resolve, reject) => {
        resolve('Producto actualizado con exito');
    })
}

/**
 * 
 * @param {number} productId ID del producto a borrar: number 
 * @returns mensaje de respuesta exitosa: string
 */
export const deleteProduct = async (productId) => {
    const db = await SQLite.openDatabaseAsync('store.db');

    await db.runAsync('DELETE FROM products WHERE id = $id', { $id: productId });

    return new Promise((resolve, reject) => {
        resolve('Producto eliminado con exito');
    })
}

/**
 * Funcion que busca a un producto por su codigo de barras
 * @param {string} barcode codigo de barras del producto a buscar: string 
 * @returns Arreglo con toda la información del producto: Object[]
 */
export const getProductByBarcode = async (barcode) => {
    const db = await SQLite.openDatabaseAsync('store.db');

    const product = await db.getAllAsync('SELECT * FROM products WHERE barcode = $barcode', { $barcode: barcode });

    return new Promise((resolve, reject) => {
        resolve(product);
    })
}

/**
 * Función que devuelve todas las categorias registradas de los productos
 * @returns Arreglo con todas las categorias registradas: Object[]
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