import React from 'react';
import {
    Text, StyleSheet,
    TouchableOpacity, View, ScrollView, Alert, Image, Vibration
} from 'react-native';
import ShoppingCart from '../../../shoppingcart/application/components/ShoppingCart';
const ProductCard = ({ product , getProductsWithUseCallback}) => {
    return (
        <View >
            <TouchableOpacity style={styles.card} onPress={() => Vibration.vibrate()}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: product.image_url }} style={styles.image} />
                </View>
                <View style={styles.atributesContainer}>
                    {/* <Text style={styles.price}>Categoría: {product.category}</Text> */}

                    <View>
                        <Text style={styles.name}>{product.name}</Text>

                        <Text style={styles.multiLineText}>{product.description}</Text>

                        <Text style={styles.price}>$ {product.price}</Text>
                        <Text style={styles.price}>Existentes: {product.quantity}</Text>
                    </View>

                    <ShoppingCart product={product} getProductsWithUseCallback={getProductsWithUseCallback} />

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
        height: 200,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
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
        width: 120,
        height: 120,
        gap: 5,
    },
    imageContainer: {
        width: 180,
        height: 180,
    },
    multiLineText: {
        flexWrap: 'wrap',
    },
});

export default ProductCard;
