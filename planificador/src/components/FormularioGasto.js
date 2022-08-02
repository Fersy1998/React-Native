import React, { useEffect, useState } from 'react'
import {    
    Text,
    SafeAreaView,
    StyleSheet,
    View, 
    Pressable, 
    TextInput,
    
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { globalStyles } from '../styles/styles'
export const FormularioGasto = ({setModal, handleGasto, gasto, setGasto, eliminarGasto}) => {
  const [nombre, setnombre] = useState('')
  const [cantidad, setcantidad] = useState('')
  const [categoria, setcategoria] = useState('')
  const [id, setID] = useState('')
  const [fecha, setfecha] = useState('')
  useEffect(() => {
   if(gasto?.nombre){
      setnombre(gasto.nombre)
      setcantidad(gasto.cantidad)
      setcategoria(gasto.categoria)
      setID(gasto.id)
      setfecha(gasto.fecha)
   }
  }, [gasto])
  
  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.contenedorBotones}>
        <Pressable style={[styles.btn, styles.btnCancelar]} onLongPress={
          ()=>{
          setModal(false)
          setGasto({})
          }
        }>
          <Text style={styles.btnTexto}>Cancelar</Text>
        </Pressable>
        { !!id && (
            <Pressable 
            style={[styles.btn, styles.btnEliminar]}
            onLongPress={() => eliminarGasto(id)}
            >
              <Text style={styles.btnTexto}>Eliminar</Text>
            </Pressable> 
        ) }
      </View>
      <View style={styles.formulario}>
        <Text style={styles.titulo}>{gasto?.nombre ? 'Editar' : 'Nuevo'} gasto</Text>
        <View style={styles.campo}>
          <Text style={styles.label}>Nombre gasto</Text>
          <TextInput 
            style={styles.input}
            placeholder='Nombre del gasto'
            value={nombre}
            onChangeText={setnombre}
          />
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Cantidad gasto</Text>
          <TextInput 
          
            style={styles.input}
            placeholder='Cantidad del gasto'
            keyboardType='numeric'
            value={cantidad}
            onChangeText={setcantidad}
          />
        </View>
         <View style={styles.campo}>
          <Text style={styles.label}>Categoría gasto</Text>
          <Picker 
            style={styles.input}
            selectedValue={categoria}
            onValueChange={(itemValue)=>setcategoria(itemValue)}
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
        <Pressable style={[styles.submitBtn]} onPress={()=>handleGasto({nombre, cantidad, categoria, id, fecha})}>
          <Text style={styles.submitBtnTexto}>{gasto?.nombre ? 'Guardar cambios' : 'Agregar gasto'}</Text>
        </Pressable>
      </View>
     
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  contenedor: {
      backgroundColor: '#1E40AF', 
      flex: 1
  },
  contenedorBotones: {
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  btn: {
      padding: 10,
      marginTop: 30,
      marginHorizontal: 10,
      flex: 1
  },
  btnCancelar: {
      backgroundColor: '#DB2777', 
      
  },
  btnEliminar: {
      backgroundColor: 'red'
  },
  btnTexto: {
      textAlign: 'center',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      color: '#FFF'
  },
  formulario: {
      ...globalStyles.contenedor
  },
  titulo: {
      textAlign: 'center',
      fontSize: 28,
      marginBottom: 30,
      color: '#64748B'
  },
  campo: {
      marginVertical: 10
  },
  label: {
      color: '#64748B',
      textTransform: 'uppercase',
      fontSize: 16,
      fontWeight: 'bold'
  },
  input: {
      backgroundColor: '#F5F5F5',
      padding: 10,
      borderRadius: 10,
      marginTop: 10
  },
  submitBtn: {
      backgroundColor: '#3B82F6',
      padding: 10,
      marginTop: 20
  },
  submitBtnTexto: {
      textAlign: 'center',
      color: '#FFF',
      fontWeight: 'bold',
      textTransform: 'uppercase'
  }
})

