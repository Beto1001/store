import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Vibration,
    Modal,
    TextInput,
} from 'react-native'
import React, { useState } from 'react'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { editShoppingCartById } from '../../datasource/shoppingCartDataSource';
import { getProductById } from '../../../products/datasource/productDataSource';
export default function ShoppingCartEditButton({ shoppingcart, getShoppingCartUseCallback }) {
    //Modal
    const [modalVisible, setModalVisible] = useState(false);
    const [quantity, setQuantity] = useState(`${shoppingcart.cantidad}`);

    const showEditModal = () => {
        Vibration.vibrate();
        setModalVisible(true);
    }
    const ocultModal = () => {
        setModalVisible(false);
        setQuantity(`${shoppingcart.cantidad}`);
    }
    const handleSendItems = async () => {
        if (quantity <= 0) {
            alert('Ingresa una cantidad mayor a 0');
            return;
        }

        const productOnShoppingCart = await getProductById(shoppingcart.id_producto);
        const productQuantity = productOnShoppingCart[0].quantity;
        const productName = productOnShoppingCart[0].name;

        if (quantity > productQuantity) {
            alert(`Solo hay ${productQuantity} unidad(es) en el inventario de ${productName} y tu has puesto ${quantity} unidad(es)`);
            return;
        }

        const messaje = await editShoppingCartById(shoppingcart.id, quantity);
        alert(messaje);

        setModalVisible(false);
        getShoppingCartUseCallback();

    }
    return (
        <TouchableOpacity>
            <TouchableOpacity style={styles.buttoncontainer} onPress={showEditModal}>
                <MaterialIcons name="edit" size={30} color="black" />
                <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.textlabel}>Cantidad</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Cantidad"
                            keyboardType="numeric"
                            value={quantity}
                            onChangeText={text => setQuantity(text)}
                        />
                        <View style={styles.optionscontainer}>
                            <TouchableOpacity style={styles.cancelbutton} onPress={ocultModal}>
                                <MaterialIcons name="cancel-presentation" size={24} color="black" />
                                <Text>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.confirmbutton} onPress={handleSendItems}>
                                <FontAwesome name="save" size={24} color="black" />
                                <Text>Confirmar</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttoncontainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: '#000000',
        gap: 5,
        borderWidth: 1,
        width: 100
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
    textlabel: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    optionscontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        marginTop: 4
    },
    cancelbutton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        width: 120,
        height: 40,
        gap: 10,
        borderRadius: 4,
    },
    confirmbutton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        width: 120,
        height: 40,
        gap: 10,
        borderRadius: 4,
    }

});