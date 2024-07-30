import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductsScreen from '../features/products/application/screens/ProductsScreen';
import ShoppingCartScreen from '../features/shoppingcart/application/screens/ShoppingCartScreen';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import ProductBarCodeScanner from '../features/products/application/components/ProductReadCodeScanner';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import EditProductScreen from '../features/products/application/screens/EditProductScreen';
const Tab = createBottomTabNavigator();

export default function HomeScreen() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        switch (route.name) {
                            case 'Products':
                                iconName = focused ? 'storefront' : 'storefront-outline';

                                return <Ionicons name={iconName} size={size} color={color} />;

                            case 'ShoppingCart':
                                iconName = focused ? 'shopping-cart' : 'shopping-cart-checkout';

                                return <MaterialIcons name={iconName} size={size} color={color} />

                            case 'ProductScanner':
                                iconName = focused ? 'barcode-scan' : 'scan-helper';

                                return <MaterialCommunityIcons name={iconName} size={size} color={color} />

                            case 'EditScreen':

                                return focused ? 
                                         <FontAwesome name="edit" size={size} color={color} /> :

                                         <FontAwesome5 name="edit" size={size} color={color} />
                            default:
                                break;
                        }
                    },
                    tabBarActiveTintColor: '#176FFE',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Products" component={ProductsScreen} />
                <Tab.Screen name="ProductScanner" component={ProductBarCodeScanner} />
                <Tab.Screen name="EditScreen" component={EditProductScreen} />
                <Tab.Screen name="ShoppingCart" component={ShoppingCartScreen} />

            </Tab.Navigator>
        </NavigationContainer>
    )
}





