import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '../styles/styles'
import { Picker } from '@react-native-picker/picker'
export const Filtro = ({filtro, setFiltro}) => {
  return (
    <View style={styles.contenedor}>
        <Text style={styles.label}>Filtrar Gastos</Text>
        <Picker
            selectedValue={filtro}
            onValueChange={(valor)=>setFiltro(valor)}
            >
            <Picker.Item label='--Selecciona--' value=''/>
            <Picker.Item label='ahorro' value='ahorro'/>
            <Picker.Item label='comida' value='comida'/>
            <Picker.Item label='casa' value='casa'/>
            <Picker.Item label='gastos varios' value='gastos'/>
            <Picker.Item label='ocio' value='ocio'/>
            <Picker.Item label='salud' value='salud'/>
            <Picker.Item label='suscripciones' value='suscripciones'/>
          </Picker>
        
    </View>
  )
}
const styles = StyleSheet.create({
    contenedor: {
        ...globalStyles.contenedor,
        transform: [{ translateY: 0 }],
        marginTop: 80
    },
    label: {
        fontSize: 22,
        fontWeight: '900',
        color: '#64748B'
    }
})