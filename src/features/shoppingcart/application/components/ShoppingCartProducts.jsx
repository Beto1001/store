import { Text, StyleSheet, TouchableOpacity, Vibration, Image, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ShoppingCartEditButton from './ShoppingCartEditButton';
export default function ShoppingCartProducts({ products, carrito,getShoppingCartUseCallback }) {
    let totalPrice = 0;

    totalPrice += parseFloat(products.price) * carrito.cantidad;

    return (
        <TouchableOpacity style={styles.container} onPress={() => Vibration.vibrate()}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: products.image_url }} style={styles.image} />

            </View>
            <View style={styles.atributescontainer}>
                <Text style={styles.elementtext}>{products.name}</Text>
                <Text>Precio: $ {products.price}</Text>
                <Text>Cantidad: {carrito.cantidad}</Text>
                <Text>Total a pagar: $ {totalPrice}</Text>
                <ShoppingCartEditButton 
                    shoppingcart={carrito}
                    getShoppingCartUseCallback={getShoppingCartUseCallback}
                />
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        marginTop: 10,
        width: 350,
        flexDirection: 'row',
        gap: 20,
        borderRadius:8,
    },
    imageContainer: {
        width: 140,
        height: 140,
        marginTop: 10,
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 125,
        height: 125,
        borderRadius: 10,
    },
    elementtext: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#071C54",

    },
    carritodelete: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 30,
        borderWidth: 1,
        borderColor: 'blue'
    },
    atributescontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

