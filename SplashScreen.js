import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'

import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
    const navigation = useNavigation();

    useEffect(() => {

        setTimeout(() => {
            navigation.navigate('MainApp');
        }, 3000);
    }, []);

    return (
        <View style={styles.container}>
            <Text>Splash</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});