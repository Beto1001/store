import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react';
import EditProductCard from '../components/EditProductCard';
import { FontAwesome } from '@expo/vector-icons';
import { getProductsTest } from '../../datasource/productDataSource';
export default function EditProductScreen({navigation}) {
    const [products, setProducts] = useState([]);

    let focusListener = null;
    console.log(navigation);

    const getAllProducts = ()=>{
        getProductsTest()
        .then(response => setProducts(response))
        .catch(error => console.log(error))

    }

    const getProductsWithUseCallback = useCallback(()=>{
        console.log('17');
        getAllProducts();
 
     },[products]);

    useEffect(() => {
        getProductsWithUseCallback();
        focusListener = navigation.addListener('focus', () => {
            console.log('28 Actualizando cambios');
            getProductsWithUseCallback();
        });
      
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.searchcontainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Nombre del producto'
                    />

                    <TouchableOpacity style={styles.buttonRegister}>
                        <Text style={styles.searchtext}>Buscar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonscanner}>
                        <Text style={styles.searchtext}>Escanear</Text>
                    </TouchableOpacity>

                </View>

            </View>
            <ScrollView>
                {products.length === 0 ? (
                    <View>
                        <Text>No hay productos registrados</Text>
                        <TouchableOpacity onPress={getAllProducts}>
                            <Text>Cargar</Text>
                        </TouchableOpacity>

                    </View>
                ) : (
                    <ScrollView>

                        <ScrollView horizontal={false} >

                            {products.map((product) => (
                                <EditProductCard key={product.id} product={product} getProductsWithUseCallback={getProductsWithUseCallback}/>
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
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        width: '60%',
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
    searchtext: {
        color: 'white',
        fontSize: 14,
    },
})