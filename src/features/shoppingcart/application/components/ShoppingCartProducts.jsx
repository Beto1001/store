import {Text, StyleSheet, TouchableOpacity, Vibration, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { showDatabase } from '../../datasource/shoppingCartDataSource';
export default function ShoppingCartProducts({ items }) {

    const product = items[0];
    const cantidad = items[1].cantidad;
    const carritoId = items[1].id;

    const handleDelete = ()=>{
        console.log(carritoId);
        
    }
    const totalPagar = parseFloat(product.price) * cantidad;

    return (
        <TouchableOpacity style={styles.container} onPress={() => Vibration.vibrate()}>
            <Text style={styles.elementtext}>{product.name}</Text>
            <Image source={{ uri: product.image_url }} style={styles.imageContainer} />

            <Text>Precio unitario: $ {product.price}</Text>
            <Text>Cantidad: {cantidad}</Text>
            <Text>Total a pagar producto individual $ {totalPagar}</Text>

            <TouchableOpacity style={styles.carritodelete} onPress={handleDelete}>
                <Text>Borrar</Text>
            </TouchableOpacity>
           
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
    carritodelete:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:100,
        height:30,
        borderWidth:1,
        borderColor:'blue'

    }
});