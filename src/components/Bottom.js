import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useSelector} from 'react-redux'
import { PhoneHeight, PhoneWidth } from '../constants/config'
import { useNavigation } from '@react-navigation/native'


export default function Bottom() {
    const { cartItems } = useSelector(state => state.productListReducer);
    const navigation = useNavigation()

    return (
        <View style = {styles.container}>
            <TouchableOpacity 
                onPress={() => navigation.navigate('productList')}
                style = {styles.bottomBtn}>
                <Image
                    style={styles.icons}
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/128/2549/2549900.png',
                    }}
                />
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => navigation.navigate('cart')}
                style = {styles.bottomBtn}>
                <Text style = {{color: 'red', fontWeight:'bold'}}>{cartItems.length}</Text>
                <Image
                    style={styles.icons}
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/128/1170/1170678.png',
                    }}
                />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.bottomBtn}>
                <Image
                    style={styles.icons}
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828970.png',
                    }}
                />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.bottomBtn}>
                <Image
                    style={styles.icons}
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/128/1077/1077063.png',
                    }}
                />
            </TouchableOpacity>
        </View>
    )
    }

const styles = StyleSheet.create({
    container:{
        width: PhoneWidth,
        height: PhoneHeight * 0.1,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'flex-start',
        flexDirection: 'row',
    },
    bottomBtn: {
        width: '25%',
        height: '100%',
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icons:{
        width: 40,
        height: 40
    }
})