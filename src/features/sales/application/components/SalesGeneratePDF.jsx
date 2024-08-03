import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import React, { useState } from 'react'

import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { getSales } from '../../datasource/salesDataSource';

export default function SalesGeneratePDF() {
    const [sales, setSales] = useState([]);
    const [test, setTest] = useState(null);

    console.log({ sales })

    const getAllSales = async () => {
        const allRows = await getSales();
        console.log(allRows);
        setSales(allRows);

        const newExample = await renderHtml();
        console.log('17', newExample);
    }

    const renderItems = () => {
      
        const div = React.createElement('div', {}, renderItemsBar());
        const div2 = React.createElement('div', {}, 'Ejemplo');
        
        console.log('====================================');
        console.log(div2);
        console.log(typeof div2);
        console.log('====================================');


        console.log('====================================');
        console.log(div);
        console.log(typeof div);

        console.log('====================================');
        const elementIndividual = `${div}`;
        console.log('====================================');
        console.log('35',elementIndividual);
        console.log('35',elementIndividual.length);

        console.log('35', typeof elementIndividual);

        console.log('====================================');


        return div;

    }

    const renderItemsBar = () => {
        return sales.map((item) => {
            const div = React.createElement('div', {}, item.barcode);
            return div;
        })
    }


    const renderHtml = async () => {
        return `
            <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
            </head>
            <body style="text-align: center;">
                <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
                Hello Expo!
                </h1>
                <div>
                    "${renderItems()}"
                </div>
                <img
                src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
                style="width: 90vw;" />
            </body>
            </html>
        `;
    }
    const generarPDFEXAMPLE = async () => {
        const { uri } = await Print.printToFileAsync({ test });
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.buttoncontainer, styles.container]} onPress={getAllSales}>
                <Text>Llenar arreglo</Text>
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