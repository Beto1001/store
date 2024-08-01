import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
    TextInput,
    Button,
    Image
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { pickImage, saveImageToDirectory, takePhoto } from "../../../../service/galleryService";
import { SelectList } from 'react-native-dropdown-select-list'
import { addNewProduct, getCategories, getProductByBarcode } from "../../datasource/productDataSource";

export default function RegisterProductScreen() {
    //Camera propierties
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    //Modal propierties
    const [modalVisible, setModalVisible] = useState(false);
    const [showReadCode, setShowReadCode] = useState(false);
    const [showScanner, setShowScanner] = useState(false);

    //ProductPropierties
    const [productCode, setProductCode] = useState('');
    const [quantity, setQuantity] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [productCategory, setProductCategory] = useState('');

    //Categories
    const [category, setCategory] = useState([]);

    //ButtonDisabled
    const [disabled, setDisabled] = useState(true);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
                <Text>ksdjl</Text>
            </View>
        );
    }

    const handleSelectImage = async () => {
        const result = await pickImage();
        if (result && result.length > 0 && result[0].uri) {
            setProductImage(result);
            console.log(result);
        } else {
            console.log('Error: No se pudo obtener la URI de la imagen seleccionada');
        }
    };

    const handleTakePhoto = async () => {
        const result = await takePhoto();
        if (result && result.length > 0 && result[0].uri) {
            setProductImage(result);
            console.log(result);
        } else {
            console.log('Error: No se pudo obtener la URI de la imagen seleccionada');
            alert('No se ha podido recuperar la imagen');
        }
    };

    const getAllCategories = async () => {
        const allCategories = await getCategories();
        setCategory(allCategories);
    }

    const validateForm = () => {
        try {
            console.log('87', productName);
            console.log('88', productDescription);
            console.log('89', quantity);
            console.log('90', productPrice);
            console.log('91', productName);
            console.log('92', productImage);
            console.log('93', productCategory);
            if (productName != '' && productDescription != '' && quantity > 0 && quantity.includes('.') && productPrice > 0 && productImage && productCategory != '') {
                return true;

            } else {
                return false;
            }


        } catch (error) {
            console.log('No se han podido validar los campos correctamente', error);
            return false;


        }

    }
    const handleAddProduct = async () => {
        try {
            const formValid = validateForm();
            console.log('113', formValid);
            if (validateForm()) {
                const imagePath = productImage ? await saveImageToDirectory(productImage[0].uri) : null;
                const message = await addNewProduct(
                    productName,
                    productCode,
                    productDescription,
                    quantity,
                    productPrice,
                    imagePath,
                    productCategory
                );
                alert(message);
                setProductName('');
                setProductDescription('');
                setQuantity('');
                setProductPrice('');
                setProductCategory('');
                setProductImage(null);
                setModalVisible(false);

            }
            else {
                alert('Llena los campos correctamente por favor');
            }

        } catch (error) {
            console.log(error);
            alert('Algo ha salido mal, por favor contacta al servicio tencnico');
        }
    };
    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        setShowScanner(false);

        const productExistInStock = await getProductByBarcode(data);

        if (productExistInStock.length != 0) {

            alert('Ese producto ya se encuentra registrado');
            return;
        }

        setProductCode(data);
        setModalVisible(true);
    };

    const restartScan = () => {
        setScanned(false);
        setShowReadCode(false);
        setShowScanner(true);
        getAllCategories();
    };
    const handleOcult = () => {
        setModalVisible(false);
        setProductImage('');
    };

    return (
        <View style={styles.container}>
            {showScanner && (
                <CameraView
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ["upc_a"],
                    }}
                    style={styles.cameraContainer}
                >
                </CameraView>
            )}
            <View style={styles.buttonsContainer}>
                {showScanner ? null : (
                    <TouchableOpacity onPress={restartScan} style={styles.cancelButton}>
                        <Text style={{ color: '#fff', textAlign: 'center' }}>Escanear</Text>
                    </TouchableOpacity>
                )}
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.modalTitle}>Registrar producto</Text>
                        </View>
                        <View style={styles.codeContainer}>
                            <MaterialCommunityIcons
                                name="barcode"
                                size={40}
                                color="black"
                            />
                            <Text style={styles.codeText}> {productCode}</Text>
                        </View>
                        <Text style={styles.textlabel}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setProductName}
                            value={productName}
                            placeholder="Nombre"
                            maxLength={30}
                        />
                        <Text style={styles.textlabel}>Cantidad</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Cantidad"
                            keyboardType="numeric"
                            value={quantity}
                            onChangeText={text => setQuantity(text)}
                        />
                        <Text style={styles.textlabel}>Precio</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Precio"
                            keyboardType="numeric"
                            value={productPrice}
                            onChangeText={text => setProductPrice(text)}
                        />
                        <Text style={styles.textlabel}>Descripción</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setProductDescription}
                            value={productDescription}
                            placeholder="Descripción"
                            maxLength={30}
                        />
                        <Text style={styles.textlabel}>Caregoría</Text>
                        <SelectList
                            setSelected={setProductCategory}
                            data={category}
                            save="value"
                            placeholder="Seleccionar categoría"
                        />

                        <TouchableOpacity style={styles.buttonTakePhotoContainer} onPress={handleTakePhoto}>
                            <Text style={styles.buttonText}>Tomar foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonImageContainer} onPress={handleSelectImage}>
                            <Text style={styles.buttonText}>Seleccionar Imagen</Text>
                        </TouchableOpacity>
                        {productImage &&
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: productImage[0].uri }} style={styles.selectedImage} />
                            </View>}
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleOcult}>
                                <Text style={styles.buttonsTextGeneric}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonRegister} onPress={handleAddProduct}>
                                <Text style={styles.buttonsTextGeneric}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
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
        width: '98%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    buttonsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 30,
        marginTop: 10,
        // padding:10,
    },
    cancelButton: {
        backgroundColor: '#F55C5C',
        width: '45%',
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonRegister: {
        backgroundColor: '#0C0D0C',
        width: '45%',
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    codeContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4
    },
    codeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    camera: {
        width: '98%',
        height: 600
    },
    buttonsTextGeneric: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    buttonImageContainer: {
        backgroundColor: '#2BC4ED',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 15,
        marginTop: 8
    },
    buttonTakePhotoContainer: {
        marginTop: 10,
        backgroundColor: '#B1B1B1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 15
    },
    buttonImageText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    cameraContainer: {
        width: 400,
        height: 400,
    },
    selectedImage: {
        width: 100,
        height: 100,
        marginTop: 10,
        marginBottom: 10,
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textlabel: {
        fontSize: 14,
        fontWeight: 'bold',

    }
});
