import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator
} from 'react-native'
import React, { Suspense, useCallback, useEffect, useState } from 'react'

import { useSQLiteContext } from 'expo-sqlite';

import ShoppingCartProducts from '../components/ShoppingCartProducts';
import Loading from '../../../components/Loading';
import { getShoppingCart } from '../../datasource/shoppingCartDataSource';
import { getProductById } from '../../../products/datasource/productDataSource';
import CloseSale from '../../../sales/application/components/CloseSale';

export default function ShoppingCartScreen({ navigation }) {

    const db = useSQLiteContext();
    let focusListener = null;

    const [shoppingCart, setShoppingCart] = useState([]);
    let totalPagar = 0;
    let contador = 0;

    /**
     * Función para traer todos los productos de la tabla carrito y darle el valor a shoppingCart
     */
    const getAllShoppingCarts = async () => {
        const arrayShoppingCart = await getShoppingCart();
        setShoppingCart(arrayShoppingCart);
    }

    /**
     * Funcion que vuelve a hacer una petición a la tabla carrito cuando se agrega un nuevo elemento
     */
    const getShoppingCartUseCallback = useCallback(() => {
        getAllShoppingCarts();
    }, [shoppingCart]);

    /**
     * Funcion para llamar el componente que renderiza las tarjetas de los productos en el carrito
     * Lo hace una vez que el arreglo shoppingCart esté lleno
     * @param {object} carrito arreglo con la información individual de la tabla carrito: Object[]
     * @param {number} index posición del elemento en la lista arreglo shoppingCart: number
     * @returns Renderiza las tarjetas con la información que se le ha mandado
     */
    const callRenderShoppingCartCards = async (carrito, index) => {
        const product = await getProductById(carrito.id_producto);
        totalPagar += parseFloat(product[0].price) * carrito.cantidad;
        contador += 1;

        return (
            <View key={index}>
                <ShoppingCartProducts
                    key={carrito.id}
                    products={product[0]}
                    carrito={carrito}
                    getShoppingCartUseCallback={getShoppingCartUseCallback}
                />
                {shoppingCart.length === contador &&
                    <View>
                        <Text style={styles.payment}>Total a pagar: $ {totalPagar}</Text>
                        <CloseSale shoppingCart={shoppingCart} totalPay={totalPagar} getShoppingCartUseCallback={getShoppingCartUseCallback}/>
                    </View>
                }
            </View>
        )
    }

    useEffect(() => {
        focusListener = navigation.addListener('focus', () => {
            getShoppingCartUseCallback();
        });

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
                        <Suspense fallback={<Loading />}>
                            {shoppingCart.map((carrito, index) => (
                                callRenderShoppingCartCards(carrito, index)
                            ))}
                        </Suspense>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

