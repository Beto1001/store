import * as ImagePicker from "expo-image-picker"
import * as FileSystem from 'expo-file-system';

/**
 * Función que abre la galería y retorna la información de la imagen seleccionada del usuario
 * @returns Object[] o null 
 */
export const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    console.log("Imagen seleccionada",result);
    return result.assets || null;;

};

/**
 * Función que abre la galería y retorna la información de la foto tomada por el usuario
 * @returns Object[] o null
 */
export const takePhoto = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
        mediaTypes: "Images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    console.log("Imagen seleccionada",result);
    return result.assets || null;

};
/**
 * Función para devolver el lugar donde se guarda la imagen
 * @param {string} uri URL de la imagen: string 
 * @returns URL de la imagen: string
 */
export const saveImageToDirectory = async (uri) => {
    try {
        const fileName = uri.split('/').pop(); // Obtener el nombre del archivo de la URI
        const directory = `${FileSystem.documentDirectory}store/image/`; // Ruta del directorio
        await FileSystem.makeDirectoryAsync(directory, { intermediates: true }); // Crear el directorio si no existe
        const newPath = `${directory}${fileName}`; // Ruta completa del archivo en el directorio
        await FileSystem.moveAsync({ from: uri, to: newPath }); // Mover el archivo a la nueva ubicación
        return newPath; // Devolver la nueva ruta del archivo
    } catch (error) {
        console.log('Error al guardar la imagen en el directorio:', error);
        return null;
    }
};