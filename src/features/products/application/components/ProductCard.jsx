import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Vibration
} from 'react-native';
import ShoppingCart from '../../../shoppingcart/application/components/ShoppingCart';
import DeleteProduct from './DeleteProduct';
import EditProductIcon from './EditProductIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProductCard({ product, getProductsWithUseCallback, screen }) {
    return (
        <View>
            {
                screen === "Products" ? (
                    <TouchableOpacity style={styles.card} onPress={() => Vibration.vibrate()}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: product.image_url }} style={styles.image} />
                        </View>
                        <View style={styles.atributesContainer}>
                            <View>
                                <Text style={styles.name}>{product.name}</Text>

                                <Text style={styles.multiLineText}>{product.description}</Text>

                                <Text style={styles.price}>$ {product.price}</Text>
                                <Text style={styles.price}>Existentes: {product.quantity}</Text>
                            </View>
                            <View style={styles.optionscontainer}>
                                <ShoppingCart
                                    product={product}
                                    getProductsWithUseCallback={getProductsWithUseCallback} />

                            </View>

                        </View>
                    </TouchableOpacity >
                ) : (
                    <TouchableOpacity style={styles.cardEdit} onPress={() => Vibration.vibrate()}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: product.image_url }} style={styles.image} />
                        </View>
                        <View style={styles.atributesContainerEdit}>
                            <View>
                                <Text style={styles.nameEdit}>{product.name}</Text>

                                <View style={styles.barcodeContainerEdit}>
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
                                <DeleteProduct
                                    product={product}
                                    getProductsWithUseCallback={getProductsWithUseCallback}
                                />
                                <EditProductIcon
                                    product={product}
                                    getProductsWithUseCallback={getProductsWithUseCallback}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }
        </View >
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
    optionscontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'colum',
        gap: 10,
    },
    cardEdit: {
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
    atributesContainerEdit: {
        width: 160,
        height: 120,
        gap: 5,
    },
    nameEdit: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#09165A",
    },
    barcodeContainerEdit: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
        marginRight: 20
    },
});
