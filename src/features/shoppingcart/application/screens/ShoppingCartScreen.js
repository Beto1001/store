import { View, Text, StyleSheet, FlatList, TouchableOpacity, Vibration, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSQLiteContext } from 'expo-sqlite';
import ShoppingCartProducts from '../components/ShoppingCartProducts';
import { getShoppingCart } from '../../datasource/shoppingCartDataSource';
export default function ShoppingCartScreen({ navigation }) {

    let focusListener = null;
    const db = useSQLiteContext();

    const [shoppingCart, setShoppingCart] = useState([]);
    let totalPagar = 0;
    let contador = 0;
    const saveShoppingCart = () => {
        Vibration.vibrate();
        getShoppingCartUseCallback();
    }

    const getAllShoppingCarts = () => {
        getShoppingCart()
            .then(response => setShoppingCart(response))
            .catch(error => console.log(error))

    }
    const getShoppingCartUseCallback = useCallback(() => {
        getAllShoppingCarts();
    }, [shoppingCart]);

    useEffect(() => {
        getShoppingCartUseCallback();
        focusListener = navigation.addListener('focus', () => {
            console.log('31 Actualizando cambios');
            getShoppingCartUseCallback();
        });

    }, []);

    const getProductsCart = async (carrito) => {
        const product = await db.getAllAsync('SELECT * FROM products WHERE id = $id', { $id: carrito.id_producto });
        totalPagar += parseFloat(carrito.cantidad) * parseFloat(product[0].price);
        contador = contador + 1;
        return (
            <View>
                <ShoppingCartProducts key={carrito.id} items={[product[0], carrito]} />
                {shoppingCart.length === contador && <Text style={styles.payment}>Total a pagar ${totalPagar}</Text>}
            </View>
        )
    }
    useEffect(() => {
        getShoppingCartUseCallback();
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                {shoppingCart.length === 0 ? (
                    <View>
                        <Text>No hay productos registrados </Text>
                        
                    </View>
                ) : (
                    <View>
                        {shoppingCart.map((carrito) => (
                            getProductsCart(carrito)
                        ))}
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
    payment: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#071C54",
    },

});