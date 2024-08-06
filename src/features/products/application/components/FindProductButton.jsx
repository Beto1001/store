import React, { Suspense, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { CameraView } from "expo-camera";
import { getProductByBarcode } from '../../datasource/productDataSource';
import EditProductIcon from './EditProductIcon';
import { TextInput } from 'react-native';
import ProductCard from './ProductCard';
import Loading from '../../../components/Loading';
export default function FindProductButton({ getProductsWithUseCallback, screen }) {
    //Camera propierties
    const [scanned, setScanned] = useState(false);
    const [showScanner, setShowScanner] = useState(false);

    //Modal
    const [modalVisible, setModalVisible] = useState(false);
    const [productFind, setProductFind] = useState(false);

    //Product
    const [product, setProduct] = useState([]);
    const [barcode, setBarcode] = useState('');

    const handleShowModal = () => {

        setModalVisible(true);
        setShowScanner(true);
    }
    const findByBarcode = async () => {
        if (barcode === '' && barcode.length < 13) {
            alert('El codigo de barras de un producto es de 13 caracteres');
            return;
        }
        if (isNaN(barcode)) {
            alert('Introduce solo números por favor');
            return;
        }

        const productByBarcode = await getProductByBarcode(barcode);
        console.log('====================================');
        console.log(productByBarcode);
        console.log('====================================');

        if (productByBarcode === null) {
            alert('El producto no se encuentra registrado o se leyó mal el codigo, vuelve a intentarlo');
            return;
        }
        setModalVisible(true);

        setProduct(productByBarcode);
        setProductFind(true);
    }

    const handleBarCodeScanned = async ({ type, data }) => {
        setShowScanner(false);
        setScanned(true);

        const productByBarcode = await getProductByBarcode(data);
        if (productByBarcode === null) {
            alert('El producto no se encuentra registrado o se leyó mal el codigo, vuelve a intentarlo');
            setModalVisible(false);
            setScanned(false);
            return;
        }

        setProduct(productByBarcode);
        setProductFind(true);
    };

    const restartScan = () => {
        setScanned(false);
        setModalVisible(false);
        setProductFind(false);

    };

    return (
        <View>
            <View style={styles.buttonsContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setBarcode}
                    value={barcode}
                    maxLength={13}
                    keyboardType="numeric"
                    placeholder='Codigo de barras'
                />
                <TouchableOpacity style={styles.container} onPress={findByBarcode}>
                    <Text style={styles.searchtext}>Buscar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.container} onPress={handleShowModal}>
                    <Text style={styles.searchtext}>Escanear</Text>
                </TouchableOpacity>

            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {showScanner && (
                            <View style={styles.cameraViewContainerTest}>
                                <CameraView
                                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                                    barcodeScannerSettings={{
                                        barcodeTypes: ["upc_a"],
                                    }}
                                    style={styles.cameraContainer}
                                >
                                </CameraView>
                            </View>
                        )}
                        {productFind && (
                            <Suspense fallback={<Loading />}>
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    getProductsWithUseCallback={getProductsWithUseCallback}
                                    screen={screen}
                                />
                            </Suspense>

                        )}
                        <TouchableOpacity onPress={restartScan}>
                            <Text>Volver a intentar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2DE5C1',
        height: 40,
        borderRadius: 10,
        width: 60,
    },
    searchtext: {
        color: '#000000',
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    cameraContainer: {
        width: 310,
        height: 320,
    },
    cameraViewContainerTest: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 380,
        height: 380,
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        width: '50%',
    },

});