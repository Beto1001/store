import React from 'react';
import {
    Text, StyleSheet,
    TouchableOpacity, View, ScrollView, Alert, Image, Vibration
} from 'react-native';
import DeleteProduct from './DeleteProduct';
import EditProductIcon from './EditProductIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EditProductCard = ({ product,getProductsWithUseCallback }) => {
    return (
        <View >
            <TouchableOpacity style={styles.card} onPress={()=> Vibration.vibrate()}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: product.image_url }} style={styles.image} />
                </View>
                <View style={styles.atributesContainer}>

                    <View>
                        <Text style={styles.name}>{product.name}</Text>

                        <View style={styles.barcodeContainer}>
                            <MaterialCommunityIcons
                                name="barcode"
                                size={40}
                                color="black"
                            />
                            <Text style={styles.multiLineText}>{product.barcode}</Text>

                        </View>


                        <Text style={styles.price}>$ {product.price}</Text>
                        <Text style={styles.price}>Existentes: {product.quantity}</Text>

                    </View>
                    <View style={styles.optionscontainer}>
                        <DeleteProduct product={product} getProductsWithUseCallback={getProductsWithUseCallback}/>
                        <EditProductIcon product={product} getProductsWithUseCallback={getProductsWithUseCallback} />

                    </View>
                </View>
                <View style={styles.buttonContainer}>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        height: 220,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    description: {
        flex: 1,
        flexWrap: 'wrap'
    },
    descriptionContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 160,
    },
    priceContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    price: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    image: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: 180,
        height: 180,
        borderRadius: 10,
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 10,
    },
    atributesContainer: {
        width: 160,
        height: 120,
        gap: 5,
    },
    imageContainer: {
        width: 170,
        height: 170,
    },
    multiLineText: {
        fontSize:13,
        flexWrap: 'wrap',
    },
    optionscontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'colum',
        gap: 10,
    },
    barcodeContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        gap:5,
        marginRight:20
    }
});

export default EditProductCard;
