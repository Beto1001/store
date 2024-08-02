import * as SQLite from 'expo-sqlite'

/**
 * Función para traer toda la información del usuario 
 * @param {string} username nombre del usuario: string
 * @param {string} password contraseña del usuario: string
 * @returns Arreglo con toda la información del usuario: Object[]
 */
const getUserByNameAndPassword = async (username, password) => {

    const db = await SQLite.openDatabaseAsync('store.db');

    const statement = await db.prepareAsync('SELECT * FROM usuarios WHERE name = $username AND contrasena = $password');

    const result = await statement.executeAsync({
        $username: username,
        $password: password
    });

    const userLogin = result.getFirstAsync();

    return new Promise((resolve, reject) => {
        resolve(userLogin);
    });
}

const getAllUsers = async () => {
    const db = await SQLite.openDatabaseAsync('store.db');

    const users = await db.getAllAsync('SELECT * FROM usuarios');

    return new Promise((resolve, reject) => {
        resolve(users);
    })
}

export {
    getAllUsers,
    getUserByNameAndPassword
}