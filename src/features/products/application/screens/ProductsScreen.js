import { View, Text, StyleSheet, TouchableOpacity, Vibration, ScrollView, RefreshControl, SafeAreaView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';
import { FontAwesome } from '@expo/vector-icons';
import { getProductsTest } from '../../datasource/productDataSource';
import { Skeleton } from 'react-native-skeletons';
export default function ProductsScreen({ navigation }) {

    let focusListener = null;
    let screen = '';
    const test = navigation.getState().routeNames;

    for (let i = 0; i < test.length; i++) {
        if (test[i] === "Products") {
            screen = test[i];
            break;
        }
    }

    const [products, setProducts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        console.log('16', refreshing);
        getProductsWithUseCallback();
        setTimeout(() => {
            setRefreshing(false);
            console.log('20', refreshing);
        }, 2000);
    }, []);
    /**
     * Funcion para cargar los productos
     */
    const getAllProducts = () => {
        getProductsTest()
            .then(response => setProducts(response))
            .catch(error => console.log(error))

        console.log('20 ProductsScreen', products);
    }

    const getProductsWithUseCallback = useCallback(() => {
        console.log('23');
        getAllProducts();

    }, [products]);

    useEffect(() => {
        console.log('28');
        getProductsWithUseCallback();
        console.log('33', navigation);

        focusListener = navigation.addListener('focus', () => {
            console.log('35 Actualizando cambios');
            getProductsWithUseCallback();
        });
    }, []);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
            {products.length === 0 ? (
                <View>
                    <Text>No hay productos registrados</Text>

                </View>
            ) : (
                <ScrollView style={styles.scrollView}>

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
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    productsContainer: {
        width: 400,

    },
    containerbarcode: {
        width: 200,
        height: 200
    },

    scrollView: {
        flex: 1,
        backgroundColor: '#D8F7FB',
    },
});