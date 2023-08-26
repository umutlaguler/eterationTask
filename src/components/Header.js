import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PhoneHeight, PhoneWidth } from '../constants/config'

export default function Header({headerTitle}) {
  return (
    <View style = {styles.container}>
      <Text style = {styles.title}>{headerTitle}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        width: PhoneWidth,
        height: PhoneHeight * 0.1,
        backgroundColor: '#1d57fe',
        alignItems:'center',
        justifyContent:'center'
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 34
    }
})