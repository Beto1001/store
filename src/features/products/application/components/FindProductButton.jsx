import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { CameraView, useCameraPermissions } from "expo-camera";
import { getProductByBarcode } from '../../datasource/productDataSource';

export default function FindProductButton() {
    //Camera propierties
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [showScanner, setShowScanner] = useState(false);

    //Modal
    const [modalVisible, setModalVisible] = useState(false);

    //Product
    const [product, setProduct] = useState([]);

    const handleShowModal = () => {

        setModalVisible(true);
        setShowScanner(true);
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setModalVisible(true);
        setShowScanner(false);
        getProductByBarcode(data)
            .then((response) => {
                setProduct(response);

            })
            .catch((error) => console.log(error))
    };

    const restartScan = () => {
        setScanned(false);
        setModalVisible(false);
    };
  
    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={handleShowModal}>
                <Text style={styles.searchtext}>Escanear</Text>
            </TouchableOpacity>
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
                        <TouchableOpacity onPress={restartScan}>
                            <Text>Ocultar</Text>
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
    }

});