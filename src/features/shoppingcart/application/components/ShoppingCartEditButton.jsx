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
import { MaterialIcons } from '@expo/vector-icons';
import { editShoppingCartById} from '../../datasource/shoppingCartDataSource';

export default function ShoppingCartEditButton({ shoppingcart,getShoppingCartUseCallback }) {
    //Modal
    const [modalVisible, setModalVisible] = useState(false);
    const [quantity, setQuantity] = useState(`${shoppingcart.cantidad}`);

    console.log('7', shoppingcart);
    const showEditModal = () => {
        Vibration.vibrate();
        setModalVisible(true);
    }
    const ocultModal = () => {
        setModalVisible(false);
    }
    const handleSendItems = async () => {
        // const carrito = await editShoppingCartById(shoppingcart.id, shoppingcart.id_producto,quantity);
        // console.log('====================================');
        // console.log('20',carrito);
        // console.log('====================================');
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
                        <Text>Cantidad: {shoppingcart.cantidad}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Cantidad"
                            keyboardType="numeric"
                            value={quantity}
                            onChangeText={text => setQuantity(text)}
                        />
                        <TouchableOpacity onPress={ocultModal}>
                            <Text>Ocultar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSendItems}>
                            <Text>Mandar información</Text>
                        </TouchableOpacity>
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
});