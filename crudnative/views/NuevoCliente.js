import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { Headline, Button, TextInput, Portal, Paragraph, Dialog } from 'react-native-paper';
import globalStyles from '../styles/global';

export const NuevoCliente = ({navigation, route}) => {
    const {setconsultarApi}=route.params
    const [nombre, setNombre] = useState('')
    const [telefono, settelefono] = useState('')
    const [correo, setcorreo] = useState('')
    const [empresa, setempresa] = useState('')
    const [alerta, setalerta] = useState(false)
    useEffect(() => {
      if(route.params.cliente){
        setNombre(route.params.cliente.nombre)
        settelefono(route.params.cliente.telefono)
        setcorreo(route.params.cliente.correo)
        setempresa(route.params.cliente.empresa)
      }
    }, [])
    
    const guardarCliente=async()=>{
    
        if(nombre==='' || telefono==='' || correo==='' ||empresa===''){
            setalerta(true)
            return
        }
        
        const cliente={nombre, telefono, correo, empresa}
       if(route.params.cliente){
            cliente.id=route.params.cliente.id
            try {
                await axios.put(`http://192.168.0.16:3000/clientes/${cliente.id}`, cliente)
            } catch (error) {
                console.log(error)
            }
          
       }else{
            try {
                await axios.post('http://192.168.0.16:3000/clientes', cliente)
            } catch (error) {
                console.log(error)
            }
       }
            navigation.navigate('Inicio')
            setNombre('')
            settelefono('')
            setcorreo('')
            setempresa('')
            setconsultarApi(true)
    }
    
  return (
    <View style={globalStyles.contenedor}>
        <Headline style={globalStyles.titulo}>Añadir nuevo cliente</Headline>
        <TextInput 
            label="Nombre"
            placeholder='Name'
            onChangeText={(texto)=>setNombre(texto)}
            value={nombre}
            style={styles.input}
        />
        <TextInput 
            label="Teléfono"
            placeholder='0000-0000'
            onChangeText={(texto)=>settelefono(texto)}
            value={telefono}
            style={styles.input}
        />
        <TextInput 
            label="Correo"
            placeholder='algo@otroalgo.algo'
            onChangeText={(texto)=>setcorreo(texto)}
            value={correo}
            style={styles.input}
        />
        <TextInput 
            label="Empresa"
            placeholder='Nombre Empresa'
            onChangeText={(texto)=>setempresa(texto)}
            value={empresa}
            style={styles.input}
        />
        <Button icon="pencil-circle" mode="contained"
        onPress={()=>guardarCliente()}
        >
        Guardar cliente
        </Button>
        <Portal>
          <Dialog visible={alerta} onDismiss={()=>setalerta(false)}>
            <Dialog.Title>Error</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Todos los campos son requeridos</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={()=>setalerta(false)}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    </View>
  )
}
const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})