export async function initializeDatabase(db) {
    try {
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            barcode TEXT NOT NULL,
            description TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            price REAL NOT NULL,
            image_url TEXT,
            category TEXT
        );
            
        CREATE TABLE IF NOT EXISTS carrito (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_producto INTEGER NOT NULL,
            cantidad INTEGER NOT NULL,
            FOREIGN KEY (id_producto) REFERENCES products(id)
        );
         
        CREATE TABLE IF NOT EXISTS categories (
            key INTEGER PRIMARY KEY AUTOINCREMENT,
            value TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS ventas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            saledate TEXT NOT NULL,
            barcode TEXT NOT NULL,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL,
            payment REAL NOT NULL
        );
        `);
        console.log("Database correct");
        
    } catch (error) {
        console.log(error);

    }
}

