import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { getSales } from '../../datasource/salesDataSource';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SalesScreen() {

  const [sales, setSales] = useState([]);
  const navigation = useNavigation();

  const getAllSales = async () => {
    const allRows = await getSales();
    console.log(allRows);
    setSales(allRows);

  }
  const deleteStorageAndRedirection = async () => {
    await AsyncStorage.removeItem("userloaded");
    navigation.navigate("MainApp");
  }

  return (
    <View>
      <Text>SalesScreen</Text>
      <TouchableOpacity onPress={getAllSales}>
        <Text>Mostrar todas las ventas en consola</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteStorageAndRedirection}>
        <Text>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  )
}