import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Modal,
    TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
export default function ShoppingCart({ product, getProductsWithUseCallback }) {
    const db = useSQLiteContext();
    const [modalVisible, setModalVisible] = useState(false);
    const [quantity, setQuantity] = useState('');

    console.log(product,'18');

    const handleTouch = () => {
        setModalVisible(true);
    };
    const handleClear = () => {
        setQuantity('');
        setModalVisible(false);
    };
    const handleAddCarrito = async () => {

        try {
            const statement = await db.prepareAsync('INSERT INTO carrito(id_producto,cantidad) VALUES (?,?)');
            await statement.executeAsync([parseInt(product.id), parseInt(quantity)]);

            const newQuantity = parseInt(product.quantity) - parseInt(quantity);
            console.log("29", typeof newQuantity, newQuantity);

            await db.runAsync('UPDATE products SET quantity = ? WHERE id = ?', [newQuantity, product.id]);
            console.log("Producto agregado", product, " ID: " + product.id);

            alert('Producto agregado', product);
            getProductsWithUseCallback();
            setModalVisible(false);
            setQuantity('');

        } catch (error) {
            console.log(error);
        }
    }
    const handleConfirm = () => {
        if (!quantity || isNaN(quantity) || quantity <= 0 || quantity.includes('.')) {
            Alert.alert(
                'Error',
                'Cantidad inválida. Por favor, ingrese una cantidad válida.'
            );
            setQuantity('');
            return;
        }

        if (parseInt(quantity) > product.quantity) {
            Alert.alert(
                'Error',
                'La cantidad ingresada supera la cantidad disponible en el inventario.'
            );
            setQuantity('');
            return;
        }

        Alert.alert(
            'Confirmación',
            `¿Desea agregar ${quantity} unidad(es) de ${product.name} al carrito?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Confirmar',
                    onPress: handleAddCarrito,
                },
            ]
        );
    };

    return (
        <View>
            <TouchableOpacity style={styles.box} onPress={handleTouch}>
                <View style={styles.button}>
                    <MaterialIcons name="add-shopping-cart" size={24} color="black" />
                    <Text style={styles.buttonText}>Agregar</Text>
                </View>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Agregar al carrito</Text>
                        <Text>Producto: {product.name}</Text>
                        <Text>Precio: {product.price}</Text>
                        <Text>Existentes: {product.quantity}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Cantidad"
                            keyboardType="numeric"
                            value={quantity}
                            onChangeText={text => setQuantity(text)}
                        />
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={handleClear}
                            >
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.confirmButton]}
                                onPress={handleConfirm}
                            >
                                <Text style={styles.buttonText}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        width: 150,
        height: 60,
    },
    button: {
        width: 150,
        height: 30,
        backgroundColor: '#00CD06',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 15,
        gap: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        backgroundColor: 'red',
        width: '45%',
    },
    confirmButton: {
        backgroundColor: '#007AFF',
        width: '45%',
    },
});