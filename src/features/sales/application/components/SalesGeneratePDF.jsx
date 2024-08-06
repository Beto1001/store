import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import React, { useState } from 'react'

import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { getSales } from '../../datasource/salesDataSource';

export default function SalesGeneratePDF() {
    const [sales, setSales] = useState([]);
    let documentHTML = `
    <html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        </head>
        <body style="text-align: center;">
        <table>
            <thead>
                <tr>
                    <th>Fecha y hora</th>
                    <th>Código de barras</th>
                    <th>Nombre</th>
                    <th>Categoria</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>`;

    const getAllSales = async () => {
        const allRows = await getSales();
        console.log(allRows);
        setSales(allRows);

    }

    const renderItems = async () => {

        sales.map((item, index) => {

            renderHTMLTest(item);

        });

        documentHTML += `
                </tbody>
            </table>
        </body>
    </html>`
        console.log('====================================');
        console.log(documentHTML);
        console.log('====================================');

        // await printToFile(documentHTML);

    }
    const renderHTMLTest = (element) => {

        documentHTML += `
                <tr>
                    <td>${element.saledate}</td>
                    <td>${element.barcode}</td>
                    <td>${element.name}</td>
                    <td>${element.category}</td>
                    <td>$ ${element.price}</td>
                    <td>${element.quantity}</td>
                    <td>$ ${element.payment}</td>
                </tr>
                
            `
    }

    const printToFile = async (html) => {
        const { uri } = await Print.printToFileAsync({
            html: html,
            margins: {
                left: 20,
                top: 50,
                right: 20,
                bottom: 100,
            },
        });
        console.log('File has been saved to:', uri);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.buttoncontainer, styles.container]} onPress={getAllSales}>
                <Text>Llenar arreglo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttoncontainer, styles.container]} onPress={renderItems}>
                <Text>Generar PDF</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttoncontainer: {
        borderWidth: 1,
        borderColor: 'black',
        width: 180,
        height: 30,
        marginTop: 10,
    }
});  