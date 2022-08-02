import React from 'react'
import { StyleSheet, Text, Platform } from 'react-native'

export const Header = () => {
  return (
    <Text style={styles.encabezado}>Criptomonedas</Text>
  )
}
const styles=StyleSheet.create({
    encabezado:{
        paddingTop: Platform.OS === 'ios' ? 50 : 10,
        fontFamily: 'Lato-Black',
        backgroundColor:'#5e49e5',
        paddingBottom:10,
        textTransform:'uppercase',
        fontSize:20,
        textAlign:'center',
        fontWeight:'bold',
        color:'#fff'
    }

})
