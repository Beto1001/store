import * as SQLite from 'expo-sqlite'
import { editProductInShoppingCart, getProductById } from '../../products/datasource/productDataSource';


/**
 * Función para agregar un producto al carrito
 * @param {number} id_producto ID del producto que se agregará al carrito: number
 * @param {number} cantidad cantidad del producto que se agregará al carrito: number
 * @returns mensaje de producto agregado al carrito exitoso: string
 */
const addProductToShoppingCart = async (id_producto, cantidad) => {
    const db = await SQLite.openDatabaseAsync('store.db');

    const productValidate = await validateProductOnShoppingCart(id_producto);

    if (productValidate.length === 0) {
        const statement = await db.prepareAsync('INSERT INTO carrito(id_producto,cantidad) VALUES (?,?)');
        await statement.executeAsync([parseInt(id_producto), parseInt(cantidad)]);

        return new Promise((resolve, reject) => {
            resolve('Producto agregado al carrito con exito');
        })

    }
    else {
        return new Promise((resolve, reject) => {
            resolve('Ese producto ya existe en el carrito');
        })
    }
}
/**
 * Función para traer todos los productos agregados al carrito
 * @returns Arreglo con todos los productos agregados al carrito: Object[]
 */
const getShoppingCart = async () => {
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

/**
 * Función para buscar un registro del carrito por su ID
 * @param {number} carritoId ID del carrito a buscar: number
 * @returns Arreglo con la información del carrito: Object[]
 */
const getShoppingCartById = async (carritoId) => {
    const db = await SQLite.openDatabaseAsync('store.db');
    const carrito = await db.getAllAsync('SELECT * FROM carrito WHERE id = $id', { $id: parseInt(carritoId) });

    return new Promise((resolve, reject) => {
        resolve(carrito);
    })

}
/**
 * Función para buscar un registro del carrito por su ID
 * @param {number} carritoId ID del carrito a buscar: number
 * @param {number} productId ID del producto que se agrego al carrito: number
 * @param {number} cantidad cantidad de productos agregados al carrito: number
 * @returns Arreglo con la información del carrito: Object[]
 */
const editShoppingCartById = async (carritoId, productId, cantidad) => {
    //DB
    const db = await SQLite.openDatabaseAsync('store.db');

    //CarritoTable
    const carrito = await getShoppingCartById(carritoId);
    // const carritoQuantity = carrito[0].cantidad;
    
    //ProductsTable
    
    // const productOnShoppingCart = await getProductById(productId);
    // const productQuantity = productOnShoppingCart[0].quantity;

    // let diferencia = 0;
    // let nuevaCantidad = 0;

    /*TODO 01: Editar la cantidad de productos 
      * Si la cantidad de productos es mayor 
      * debo obtener la diferencia y restarla a la cantidad original de los productos,
      * en caso de que sea menor, debo sumarle esa diferencia entre la original y la nueva
      * a la cantidad de los productos
      * por ultimo debo regresar el carrito con la nueva cantidad
      * 
      */
    // if (cantidad > carritoQuantity) {

    //     diferencia = cantidad - carritoQuantity;

    //     nuevaCantidad = productQuantity - diferencia;

    //     await editProductInShoppingCart(productOnShoppingCart[0].id, nuevaCantidad);

    // }
    // else if (cantidad < carritoQuantity) {
    //     diferencia = carritoQuantity - cantidad;

    //     nuevaCantidad = productQuantity + diferencia;

    //     await editProductInShoppingCart(productOnShoppingCart[0].id, nuevaCantidad);

    // }
    // await db.runAsync('UPDATE carrito SET cantidad = ? WHERE id = ?', [cantidad, carritoId]);


    return new Promise((resolve, reject) => {
        resolve('Actualización exitosa');
    })

}

/**
 * Función para validar si un producto ya está agregado al carrito
 * @param {number} id_producto ID del producto que se validará
 * @returns Arerglo con toda la información del producto: Object[]
 */
const validateProductOnShoppingCart = async (id_producto) => {

    const db = await SQLite.openDatabaseAsync('store.db');

    const consultaSQL = `SELECT * FROM carrito WHERE id_producto = ${id_producto}`;

    const productValidate = db.getAllAsync(consultaSQL);

    return new Promise((resolve, reject) => {
        resolve(productValidate);
    })

}

export {
    addProductToShoppingCart,
    editShoppingCartById,
    getShoppingCartById,
    getShoppingCart,
    validateProductOnShoppingCart,
}