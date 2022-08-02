import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
  TouchableHighlight
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const App = () => {
  const [inputTexto, setInputTexto] = useState('')
const [nombreStorage, setnombreStorage] = useState(second)
  const guardarDatos=async()=>{
    try {
      await AsyncStorage.setItem('nombre', inputTexto)
    } catch (error) {
      console.log(error)
    }
  }
  const obtenerDatosAsyncStorage=async()=>{
    try {
      const nombre=await AsyncStorage.getItem('nombre')
      setnombreStorage(nombre)
      
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    obtenerDatosAsyncStorage()
  }, [])
  
  return (
    <View style={styles.contenedor}>
      <Text>{nombreStorage}</Text>
     <TextInput 
      placeholder='Escribe tu nombre'
      style={styles.input}
      value={inputTexto}
      onChangeText={(texto)=>setInputTexto(texto)}
      
     />
     <Button 
      title='guardar'
      color='#333'
      onPress={()=>guardarDatos()}
     />
     <TouchableHighlight
      style={styles.btnEliminar}
     >
      <Text 
        style={styles.textoEliminar}
      >Eliminar Nombre &times;</Text>
     </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderColor: '#666',
    borderBottomWidth: 1,
    width: 300,
    height: 40,
    marginBottom:20
  },
  btnEliminar: {
    backgroundColor: 'red',
    marginTop: 20,
    padding: 10,
  },
  textoEliminar: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 300
  }

});

export default App;
