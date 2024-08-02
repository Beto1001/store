import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

export default function AdminScreen() {
    const navigation = useNavigation();
    const removeAsyncAndRedirection = async () => {
        await AsyncStorage.removeItem('userloaded');
        navigation.navigate('MainApp');
    }
    return (
        <View style={style.container}>
            <Text>AdminScreen</Text>
            <TouchableOpacity onPress={removeAsyncAndRedirection}>
                <Text>Volver al login</Text>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    }
});