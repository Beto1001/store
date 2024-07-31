import { Text, StyleSheet, TouchableOpacity, Vibration, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
export default function ShoppingCartProducts({ products, carrito }) {

    
    console.log('6 arreglo de productos en ShoppingCartProducts', products);
    console.log('7', carrito);

    return (
        <TouchableOpacity style={styles.container} onPress={() => Vibration.vibrate()}>
            <Text style={styles.elementtext}>{products.name}</Text>
            <Image source={{ uri: products.image_url }} style={styles.imageContainer} />

            <Text>Precio unitario: $ {products.price}</Text>
            <Text>Cantidad: {carrito.cantidad}</Text>
            {/* <Text>Total a pagar producto individual $ {totalPagar}</Text> */}

            {/* <TouchableOpacity style={styles.carritodelete} onPress={handleDelete}>
                <Text>Borrar</Text>
            </TouchableOpacity> */}

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
        width: 350
    },
    imageContainer: {
        width: 100,
        height: 100,
        marginTop: 10,
        marginBottom: 10,
    },
    elementtext: {
        fontSize: 20,
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

    }
});

