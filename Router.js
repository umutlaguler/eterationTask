import * as React from 'react';
import { Component } from 'react';
import {connect} from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductList from './src/screens/productList/ProductList';
import SpecificProduct from './src/screens/specificProduct/SpecificProduct';
import Cart from './src/screens/cart/Cart';

const Stack  = createStackNavigator();
const RouterComp = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator name = 'mainStack' initialRouteName = 'home'>
            <Stack.Screen name = 'productList' options = {{headerShown: false}} component = {ProductList}></Stack.Screen>
            <Stack.Screen name = 'specificProduct' options = {{headerShown: false}} component = {SpecificProduct}></Stack.Screen>
            <Stack.Screen name = 'cart' options = {{headerShown: false}} component = {Cart}></Stack.Screen>

        </Stack.Navigator>
    </NavigationContainer>
  )
}


const mapStateToProps = state => {
  return{

  }
}
export default connect(mapStateToProps, {})(RouterComp)