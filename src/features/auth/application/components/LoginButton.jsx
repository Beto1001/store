import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { getUserByNameAndPassword } from '../../datasource/authDataSource';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginButton({ username, password }) {

    const signIn = async () => {

        if (username == '' && password == '') {
            alert('Llena los campos correctamente por favor');
            return;
        }

        const userLogin = await getUserByNameAndPassword(username, password);

        if (userLogin === null) {
            alert('Verifica tu información');
            return;
        }

        const userInAsyncStorage = {
            id: userLogin.id,
            rol: userLogin.rol
        }
        alert('Sesion iniciada con exito');

        console.log('32', userInAsyncStorage);
        await AsyncStorage.setItem("userloaded", JSON.stringify(userInAsyncStorage));

        const userTest = await AsyncStorage.getItem("userloaded");
        console.log('36', userTest);

    }

    return (
        <TouchableOpacity style={styles.container} onPress={signIn}>
            <Text style={styles.textbutton}>Iniciar sesión</Text>
            <SimpleLineIcons name="login" size={24} color="black" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        width: 300,
        height: 50,
        gap: 20,
    },
    textbutton: {
        fontSize: 20,
        fontWeight: 'bold'
    },

});