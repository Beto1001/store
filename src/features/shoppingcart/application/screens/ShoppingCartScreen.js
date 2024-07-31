import { View, Text, StyleSheet, FlatList, TouchableOpacity, Vibration, ScrollView } from 'react-native'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { useSQLiteContext } from 'expo-sqlite';
import ShoppingCartProducts from '../components/ShoppingCartProducts';
import { getShoppingCart } from '../../datasource/shoppingCartDataSource';
import { getProductById } from '../../../products/datasource/productDataSource';
export default function ShoppingCartScreen({ navigation }) {

    let focusListener = null;
    const db = useSQLiteContext();

    const [shoppingCart, setShoppingCart] = useState([]);
    let totalPagar = 0;
    let contador = 0;
    const arregloDeProductos = [];

    const getAllShoppingCarts = () => {
        getShoppingCart()
            .then((response) => {
                if (response.length > 0) {
                    setShoppingCart(response);

                    shoppingCart.map((carrito, index) => {
                        getProductById(carrito.id_producto)
                            .then((response) => {
                                arregloDeProductos.push(response[0]);
                                console.log('28 Arreglo de productos', arregloDeProductos);
                            })
                            .catch((error) => console.log(error))
                    });
                }
            })
            .catch(error => console.log(error))
    }

    const getShoppingCartUseCallback = useCallback(() => {
        getAllShoppingCarts();
    }, [shoppingCart]);

    const callRenderShoppingCartCards = (carrito, index, arregloDeProductos) => {
        console.log('41 arreglo de productos en cartScreen', arregloDeProductos);
        return (
            <View key={index}>
                <ShoppingCartProducts
                    key={carrito.id}
                    products={arregloDeProductos}
                    carrito={carrito}
                />
                <Text>{carrito.id}</Text>
            </View>
        )
    }

    useEffect(() => {

        getAllShoppingCarts();

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
                        {shoppingCart.map((carrito, index) => (
                            callRenderShoppingCartCards(carrito, index, arregloDeProductos)
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