import { View, Text, Alert, Button, StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';

export default function DeleteProduct({ product,getProductsWithUseCallback }) {
    const db = useSQLiteContext();
    const handleDelete = async () => {
        console.log('7', { product });
        try {

            // db.withTransactionAsync(async () => {
            //     await db.runAsync('DELETE FROM products WHERE id = ?;',[product.id])

            // })

            // Alert.alert("Alerta", "Producto borrado con exito");
            Alert.alert("Alerta", "Linea de codigo comentada, no borra");
            getProductsWithUseCallback();

            console.log('Producto eliminado con éxito');
         
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <TouchableOpacity style={styles.box}>
            <TouchableOpacity onPress={handleDelete}>
                <View style={styles.button}>
                    <MaterialIcons name="delete" size={30} color="black" />
                    <Text style={styles.buttonText}>Eliminar</Text>
                </View>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    box: {
        width:120,
        height:35,
        borderWidth:1,
        borderRadius:5,
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor:'#FF4A4A',
        gap:5,
    },
    buttonText: {
       padding:5,
        flexWrap:'wrap'
    }
});

