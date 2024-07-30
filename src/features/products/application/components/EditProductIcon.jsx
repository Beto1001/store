import {
    View,
    Text,
    Alert,
    Button,
    StyleSheet,
    TouchableOpacity, Vibration, Modal, TextInput, Image
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import { SelectList } from 'react-native-dropdown-select-list';
import { pickImage, saveImageToDirectory, takePhoto } from '../../../../service/galleryService';
import { editProduct, getProductsTest,getCategories } from '../../datasource/productDataSource';

export default function EditProductIcon({ product, getProductsWithUseCallback }) {
    const db = useSQLiteContext();

    //Modal
    const [modalVisible, setModalVisible] = useState(false);

    //ProductPropierties
    const [productCode, setProductCode] = useState(product.barcode);
    const [quantity, setQuantity] = useState(`${product.quantity}`);
    const [productName, setProductName] = useState(product.name);
    const [productPrice, setProductPrice] = useState(`${product.price}`);
    const [productDescription, setProductDescription] = useState(product.description);
    const [productImage, setProductImage] = useState(null);

    const [productCategory, setProductCategory] = useState(`${product.category}`);

    const [category, setCategory] = useState([]);
    const handleEdit = () => {
        setModalVisible(true);
    };

    const getAllCategories = () => {
        getCategories()
        .then(response=>setCategory(response))
        .catch(error=>console.log(error))
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
        }
    };

    const handleOcult = () => {
        setModalVisible(false);
        setProductImage(null);

    };

    const handleEditProduct = async () => {
        try {
            const imagePath = productImage ? await saveImageToDirectory(productImage[0].uri) : product.image_url;
            console.log('71',productCategory);
            editProduct(
                product.id,
                productName,
                productDescription,
                quantity,
                productPrice,
                imagePath,
                productCategory
            )   .then((response) => console.log('89', response))
                .catch((error) => console.log(error))
            
            getProductsWithUseCallback();

            alert("Producto actualizado");
            setModalVisible(false);
            setProductImage(null);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategories();
    }, [])
    return (
        <View>
            <TouchableOpacity style={styles.box}>
                <TouchableOpacity onPress={handleEdit}>
                    <View style={styles.button}>
                        <MaterialIcons name="edit" size={30} color="black" />
                        <Text style={styles.buttonText}>Editar</Text>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.modalTitle}>Editar producto</Text>
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
                        <Text style={styles.textlabel}>Categoría</Text>
                        <SelectList
                            setSelected={setProductCategory}
                            data={category}
                            save="value"
                            placeholder="Seleccionar categoría"
                            defaultOption={{ key: productCategory, value: productCategory }}
                        />
                        <TouchableOpacity style={styles.buttonTakePhotoContainer} onPress={handleTakePhoto}>
                            <Text style={styles.buttonText}>Tomar foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonImageContainer} onPress={handleSelectImage}>
                            <Text style={styles.buttonText}>Seleccionar Imagen</Text>
                        </TouchableOpacity>
                        {productImage ?
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: productImage[0].uri }} style={styles.selectedImage} />
                            </View> : (
                                <View style={styles.imageContainer}>
                                    <Image source={{ uri: product.image_url }} style={styles.selectedImage} />
                                </View>
                            )
                        }
                        <TouchableOpacity style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleOcult}>
                                <Text style={styles.buttonsTextGeneric}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonRegister} onPress={handleEditProduct}>
                                <Text style={styles.buttonsTextGeneric}>Guardar</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        width: 120,
        height: 35,
        borderWidth: 1,
        borderRadius: 5,

    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: '#FF4A4A',
        gap: 5,
    },
    buttonText: {
        padding: 5,
        flexWrap: 'wrap'
    },
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
        marginBottom: 5,
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
        backgroundColor: '#08D111',
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

