import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react';
import { getProductsTest } from '../../datasource/productDataSource';
import ProductCard from '../components/ProductCard';
import FindProductButton from '../components/FindProductButton';

export default function EditProductScreen({ navigation }) {

    let focusListener = null;
    const [products, setProducts] = useState([]);

    let screen = '';
    const test = navigation.getState().routeNames;

    for (let i = 0; i < test.length; i++) {
        if (test[i] === "EditScreen") {
            screen = test[i];
            break;
        }
    }

    const getAllProducts = () => {
        getProductsTest()
            .then(response => setProducts(response))
            .catch(error => console.log(error))
    }

    const changeScreen = () => {
        navigation.navigate('ProductScanner');
    }

    const getProductsWithUseCallback = useCallback(() => {
        getAllProducts();

    }, [products]);

    useEffect(() => {
        focusListener = navigation.addListener('focus', () => {
            getProductsWithUseCallback();
        });
      
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.searchcontainer}>
                   
                    {/* <TouchableOpacity style={styles.buttonRegister}>
                        <Text style={styles.searchtext}>Buscar</Text>
                    </TouchableOpacity> */}

                    <FindProductButton getProductsWithUseCallback={getProductsWithUseCallback} screen={screen}/>

                </View>
            </View>
            <ScrollView>
                {products.length === 0 ? (
                    <View>
                        <Text>No hay productos registrados</Text>
                        <TouchableOpacity onPress={getProductsWithUseCallback}>
                            <Text>Aun no hay productos registrados, ve a registrar</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <ScrollView>
                        <ScrollView horizontal={false} >
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    getProductsWithUseCallback={getProductsWithUseCallback}
                                    screen={screen}
                                />
                            ))}
                        </ScrollView >
                    </ScrollView>
                )}
            </ScrollView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
   
    searchcontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    buttonsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    buttonRegister: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0C0D0C',
        height: 40,
        borderRadius: 10,
        width: 60,
    },
    buttonscanner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2DE5C1',
        height: 40,
        borderRadius: 10,
        width: 60,
    },

})