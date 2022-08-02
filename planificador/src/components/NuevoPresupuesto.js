import { transform } from '@babel/core'
import React, { useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Pressable
} from 'react-native'
import { globalStyles } from '../styles/styles'
export const NuevoPresupuesto = ({handleNuevoPresupuesto, presupuesto, setPresupuesto}) => {
    
  return (
    <View style={styles.contenedor}>
        <Text style={styles.label}>Definir presupuesto</Text>
        <TextInput 
            keyboardType='numeric'
            placeholder='Tu presupuesto'
            style={styles.input}
            value={presupuesto.toString()}
            onChangeText={setPresupuesto}
        />
        <Pressable style={styles.boton} onPress={()=>handleNuevoPresupuesto(presupuesto)}>
            <Text style={styles.botonTexto}>Agregar presupuesto</Text>
        </Pressable>
    </View>
  )
}
const styles=StyleSheet.create({
    contenedor:{
        ...globalStyles.contenedor
    },
    label:{
        textAlign:'center',
        marginBottom:10,
        color:'#3B82f6',
        fontSize:24
    },
    input:{
        backgroundColor:'#f5f5f5',
        padding:10,
        borderRadius:5,
        textAlign:'center',
        marginTop:30
    },
    boton:{
        marginTop:30,
        backgroundColor:'#1048A4',
        borderRadius:10,
        padding:10
    },
    botonTexto:{
        textAlign:'center',
        color:'#FFF',
        fontWeight:'bold'
    }
})
