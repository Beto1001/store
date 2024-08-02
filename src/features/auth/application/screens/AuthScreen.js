import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'

import LoginButton from '../components/LoginButton';
const PlaceholderImage = require('../../../../../assets/images/store_auth.jpg');

export default function AuthScreen() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={styles.constainer}>

            <Text style={styles.textlogin}>Inicio de sesión</Text>
            <TouchableOpacity style={styles.imagecontainer}>
                <Image source={PlaceholderImage} style={styles.image} />
            </TouchableOpacity>
            <View>
                <Text style={styles.textlabel}>Nombre</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={setUserName}
                    value={username}
                    placeholder="Nombre de usuario"
                    maxLength={20}
                />
                <Text style={styles.textlabel}>Contraseña</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Contraseña"
                    maxLength={15}
                />
                <LoginButton username={username} password={password} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagecontainer: {
        padding: 10,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
        borderWidth: 1,
    },
    textlogin: {
        color: '#0E1A49',
        fontSize: 30,
        fontWeight: 'bold',
    },
    inputscontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: 300
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        width: 300,
    },
    labelscontainer: {
        display: 'flex',

    },
    textlabel: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5
    },

});