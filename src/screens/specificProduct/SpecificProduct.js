import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import { PhoneHeight, PhoneWidth } from '../../constants/config'
import Header from '../../components/Header'
import { addItemToCart } from '../../actions/productListAction'
import { useDispatch } from 'react-redux'

export default function SpecificProduct({route}) {
    const dispatch = useDispatch();
    const item = route?.params.item
    return (
        <SafeAreaView style = {styles.container}>
            <Header
                headerTitle={item.name}
            />
            <Image
                style = {styles.productImage}
                source={{
                    uri: item.image
                }}
            />
            <Text style = {styles.productTitle}>{item.name}</Text>
            <ScrollView>
                <Text style = {styles.productDescription}>{item.description}</Text>
            </ScrollView>
            <View style = {styles.bottomBox}>
            <View style = {styles.priceBox}>
                <Text style = {{color: 'blue', fontSize: 20}}>Price: </Text>
                <Text style = {styles.priceTxt}>{item.price} ₺</Text>
            </View>
            <View style = {styles.addToCartBox}>
                <TouchableOpacity
                    testID="addToCartButton"
                    onPress={() => dispatch(addItemToCart(item))}
                    style = {styles.addCartBtn}
                >
                    <Text style = {styles.addCartTxt}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
            </View>
        </SafeAreaView>
        )
    }
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    productImage:{
        width: PhoneWidth * 0.9,
        height: PhoneHeight * 0.4,
        alignSelf: 'center'
    },
    productTitle:{
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black'
    },
    productDescription:{
        color:'black',
        marginTop: PhoneHeight * 0.02,
        width: PhoneWidth * 0.95,
        alignSelf:'center',
    },
    bottomBox:{
        width: PhoneWidth,
        height: PhoneHeight * 0.1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    priceBox: {
        paddingHorizontal: 20,
        width:'30%',
        borderWidth: 0,
    },
    priceTxt: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },
    addToCartBox:{
        width:'70%',
    },
    addCartBtn:{
        backgroundColor: '#1d57fe',
        width: '70%',
        height: PhoneHeight * 0.05,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: PhoneHeight * 0.02

    },
    addCartTxt:{
        color: 'white', 
    }
})