import * as SQLite from 'expo-sqlite'

/**
 * Funcion que recupera todos los productos registrados
 * @returns Arreglo con todos los productos registrados: Object[]
 */
const getProductsTest = async () => {
    const db = await SQLite.openDatabaseAsync('store.db');

    const allRows = await db.getAllAsync('SELECT * FROM products ORDER BY name');
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
 * @returns Mensaje de producto registrado
 * 
 */
const addNewProduct = async (
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
        await statement.executeAsync({
            $name: name,
            $barcode: barcode,
            $description: description,
            $quantity: parseInt(quantity),
            $price: parseFloat(price),
            $image_url: image_url,
            $category: category
        });
        return new Promise((resolve,reject)=>{
            resolve('Producto registrado');
        })

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
const editProduct = async (
    productId,
    name,
    description,
    quantity,
    price,
    image_url,
    category) => {

    const db = await SQLite.openDatabaseAsync('store.db');

    await db.runAsync('UPDATE products SET name = ? , description = ? ,quantity = ? ,price = ? ,category = ?,image_url = ? WHERE id = ?', [name, description, parseInt(quantity), parseFloat(price), category, image_url, productId]);

    return new Promise((resolve, reject) => {
        resolve('Producto actualizado con exito');
    })
}

/**
 * Función que modifica la cantidad del producto
 * @param {number} productId ID del producto al cual se le cambiará la cantidad: number
 * @param {number} quantity nueva cantidad a guardar: number
 * @returns mensaje de actualización exitosa: string
 */
const editProductInShoppingCart = async (productId, quantity) => {
    const db = await SQLite.openDatabaseAsync('store.db');
    await db.runAsync('UPDATE products SET quantity = ? WHERE id = ?', [quantity, productId]);

    return new Promise((resolve, reject) => {
        resolve('Cantidad del producto actualizada con exito');
    })

}

/**
 * 
 * @param {number} productId ID del producto a borrar: number 
 * @returns mensaje de respuesta exitosa: string
 */
const deleteProduct = async (productId) => {
    const db = await SQLite.openDatabaseAsync('store.db');

    await db.runAsync('DELETE FROM products WHERE id = $id', { $id: productId });

    return new Promise((resolve, reject) => {
        resolve('Producto eliminado con exito');
    })
}

/**
 * Función que busca a un producto por su ID
 * @param {number} productId ID del producto que se desea buscar: number 
 * @returns Arreglo con la información del producto a buscar: Object[]
 */
const getProductById = async (productId) => {
    const db = await SQLite.openDatabaseAsync('store.db');

    const product = await db.getAllAsync('SELECT * FROM products WHERE id = $id', { $id: parseInt(productId) });

    return new Promise((resolve, reject) => {
        resolve(product);
    })
}
/**
 * Funcion que busca a un producto por su codigo de barras
 * @param {string} barcode codigo de barras del producto a buscar: string 
 * @returns Arreglo con toda la información del producto: Object[]
 */
const getProductByBarcode = async (barcode) => {
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
const getCategories = async () => {
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

export {
    addNewProduct,
    editProduct,
    editProductInShoppingCart,
    deleteProduct,
    getCategories,
    getProductById,
    getProductByBarcode,
    getProductsTest,
}