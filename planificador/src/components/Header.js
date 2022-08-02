import React from 'react'
import {
    Text,
    SafeAreaView,
    StyleSheet,
} from 'react-native'
export const Header = () => {
  return (
    <SafeAreaView >
        <Text style={styles.texto}>Planificador de gastos</Text>
    </SafeAreaView>
  )
}
const styles=StyleSheet.create({
   
    texto:{
        textAlign:'center',
        fontSize:30,
        color:'#fff',
        textTransform:'uppercase',
        fontWeight:'bold',
        paddingVertical:20
    },
})