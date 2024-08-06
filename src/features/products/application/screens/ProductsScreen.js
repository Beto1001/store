import { View, Text, StyleSheet, TouchableOpacity, Vibration, ScrollView, RefreshControl, SafeAreaView, FlatList } from 'react-native'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';
import { FontAwesome } from '@expo/vector-icons';
import { getProductsTest } from '../../datasource/productDataSource';
import { Skeleton } from 'react-native-skeletons';
import Loading from '../../../components/Loading';
import FindProductButton from '../components/FindProductButton';
export default function ProductsScreen({ navigation }) {

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
     * Funcion para llenar el arreglo de productos
     */
    const getAllProducts = async () => {
        const arrayProducts = await getProductsTest();
        setProducts(arrayProducts);
    }

    const getProductsWithUseCallback = useCallback(() => {
        getAllProducts();

    }, [products]);

    useEffect(() => {
        getAllProducts();

    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchcontainer}>

                <FindProductButton getProductsWithUseCallback={getProductsWithUseCallback} screen={screen} />

            </View>
            {products.length === 0 ? (
                <View>
                    <Text>No hay productos registrados</Text>

                </View>
            ) : (
                <Suspense fallback={<Loading />}>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        data={products}
                        renderItem={(product) => <ProductCard
                            key={product.item.id}
                            product={product.item}
                            getProductsWithUseCallback={getProductsWithUseCallback}
                            screen={screen}
                        />}
                    />
                </Suspense>

            )}
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    productsContainer: {
        width: 400,

    },
    containerbarcode: {
        width: 200,
        height: 200
    },

    scrollView: {
        backgroundColor: '#D8F7FB',
    },
    searchcontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },
});