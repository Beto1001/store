import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { getSales } from '../../datasource/salesDataSource';
import SalesGeneratePDF from '../components/SalesGeneratePDF';
export default function SalesScreen() {

  const [sales, setSales] = useState([]);

  const getAllSales = async () => {
    const allRows = await getSales();
    console.log(allRows);
    setSales(allRows);

  }


  return (
    <View>
      <Text>SalesScreen</Text>
      <TouchableOpacity onPress={getAllSales}>
        <Text>Mostrar todas las ventas en consola</Text>
      </TouchableOpacity>
      <SalesGeneratePDF/>

    </View>
  )
}