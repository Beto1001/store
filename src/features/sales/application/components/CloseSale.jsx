import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { editProductInShoppingCart, getProductById } from '../../../products/datasource/productDataSource';
import { addNewSale } from '../../datasource/salesDataSource';
import { deleteAllProductsOnShoppingCart } from '../../../shoppingcart/datasource/shoppingCartDataSource';

export default function CloseSale({ shoppingCart, totalPay, getShoppingCartUseCallback }) {
    // console.log('5 CloseSale', shoppingCart, totalPay);
    const dateCloseSale = new Date();
    const dateSave = dateCloseSale.toLocaleDateString();
    const hourSave = dateCloseSale.toLocaleTimeString();

    const saledate = `Fecha: ${dateSave} Hora: ${hourSave}`;

    const confirmCloseSale = () => {
        Alert.alert(
            'Mensaje',
            `¿Estas seguro(a) que deseas cerrar la venta con ${shoppingCart.length} productos?, el total a pagar es de ${totalPay}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                    onPress: exampleDate
                },
                {
                    text: 'Confirmar',
                    onPress: exampleTestAsync,
                },
            ]
        );
    }

    const exampleDate = () => {


    }

    const exampleTestAsync = async () => {

        let payment = 0;
        let newQuantitySave = 0;

        for (let i = 0; i < shoppingCart.length; i++) {

            const productTest = await getProductById(shoppingCart[i].id_producto);
            payment = productTest[0].price * shoppingCart[i].cantidad;

            await addNewSale(
                saledate,
                productTest[0].barcode,
                productTest[0].name,
                productTest[0].category,
                productTest[0].price,
                shoppingCart[i].cantidad,
                payment
            );

            newQuantitySave = productTest[0].quantity - shoppingCart[i].cantidad;

            await editProductInShoppingCart(shoppingCart[i].id_producto, newQuantitySave);
        }
        await deleteAllProductsOnShoppingCart();

        alert('Venta registrada');
        getShoppingCartUseCallback();
    }

    return (
        <TouchableOpacity style={styles.buttoncontainer} onPress={confirmCloseSale}>
            <Text>Cerrar venta</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttoncontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        width: 100,
        height: 40,


    }
});