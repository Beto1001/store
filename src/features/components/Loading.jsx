import { View, Text,ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

export default function Loading() {
  return (
    <View style={styles.loadingspinner}>
      <Text>Cargando</Text>
      <ActivityIndicator size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
    loadingspinner:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    }
});