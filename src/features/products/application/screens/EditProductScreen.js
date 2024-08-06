import { View, Text, TouchableOpacity, StyleSheet, TextInput, RefreshControl, SafeAreaView, FlatList } from 'react-native'
import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { getProductsTest } from '../../datasource/productDataSource';
import ProductCard from '../components/ProductCard';
import FindProductButton from '../components/FindProductButton';
import Loading from '../../../components/Loading';

export default function EditProductScreen({ navigation }) {

    let focusListener = null;
    const [products, setProducts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

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
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        console.log('16', refreshing);
        getProductsWithUseCallback();
        setTimeout(() => {
            setRefreshing(false);
            console.log('20', refreshing);
        }, 2000);
    }, []);

    const getProductsWithUseCallback = useCallback(() => {
        getAllProducts();

    }, [products]);

    useEffect(() => {
        focusListener = navigation.addListener('focus', () => {
            getProductsWithUseCallback();
        });

    }, []);

    return (
        <SafeAreaView style={styles.containergeneral}> 
            <View style={styles.container}>
                <View style={styles.searchcontainer}>
                    <FindProductButton getProductsWithUseCallback={getProductsWithUseCallback} screen={screen} />
                </View>
            </View>
            {products.length === 0 ? (
                <View>
                    <Text>No hay productos registrados</Text>
                    <TouchableOpacity onPress={getProductsWithUseCallback}>
                        <Text>Aun no hay productos registrados, ve a registrar</Text>
                    </TouchableOpacity>
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
    containergeneral:{
        flex:1,

    },

})