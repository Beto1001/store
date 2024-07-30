import { View, Text, StyleSheet, FlatList, TouchableOpacity, Vibration,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSQLiteContext } from 'expo-sqlite';
import ShoppingCartProducts from '../components/ShoppingCartProducts';
export default function ShoppingCartScreen() {

    const db = useSQLiteContext();

    const [shoppingCart, setShoppingCart] = useState([]);
    let totalPagar = 0;
    let contador = 0;
    const saveShoppingCart = () => {
        Vibration.vibrate();
        getShoppingCarts();
    }

    const getShoppingCarts = async () => {
        try {
            const allShoppingCart = await db.getAllAsync(`SELECT * FROM carrito`);
            setShoppingCart(allShoppingCart);
            
        } catch (error) {
            console.log(error);
        }
    }

    const getProductsCart = async (carrito) => {
        const product = await db.getAllAsync('SELECT * FROM products WHERE id = $id', { $id: carrito.id_producto });
        totalPagar += parseFloat(carrito.cantidad) * parseFloat(product[0].price);
        contador = contador +1;
        console.log('36','contador: ',contador);
        return (
            <View>
                
                <ShoppingCartProducts key={carrito.id} items={[product[0], carrito]} />
                {shoppingCart.length === contador && <Text style={styles.payment}>Total a pagar ${totalPagar}</Text>}

            </View>
        )
    }
    useEffect(() => {
        getShoppingCarts();
    }, []);

    return (
        <ScrollView>
        <View style={styles.container}>
            {shoppingCart.length === 0 ? (
                <View>
                    <Text>No hay productos registrados </Text>
                    <TouchableOpacity onPress={saveShoppingCart}>
                        <Text>Guardar</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    {shoppingCart.map((carrito) => (
                        getProductsCart(carrito)
                    ))}
                    <TouchableOpacity onPress={saveShoppingCart}>
                        <Text>Recargar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    productsContainer: {
        padding: 40,
        alignItems: 'center',

    },
    payment:{
        fontSize:20,
        fontWeight:'bold',
        color:"#071C54",
    },
    
});