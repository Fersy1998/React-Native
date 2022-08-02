import React from 'react'
import {Text, StyleSheet, View, Alert} from 'react-native'
import {Headline, Subheading, Button, FAB} from 'react-native-paper'
import globalStyles from '../styles/global'
import axios from 'axios'
const DetallesCliente = ({navigation, route}) => {
    const {nombre, telefono, correo, empresa, id}=route.params.item
    const {setconsultarApi}=route.params
    const eliminarCliente=async()=>{
        try {
            await axios.delete(`http://192.168.0.16:3000/clientes/${id}`)
          
        } catch (error) {
            console.log(error)
        }
        navigation.navigate("Inicio")
        setconsultarApi(true)
    }
    const mostrarConfirmacion=()=>{
        Alert.alert('Confirmación', 'Desea eliminar este cliente?', [
        {
                text:"Eliminar de todas formas",
                onPress:()=>eliminarCliente()
        },
        {
            text:"Cancelar",
            style:"cancel"
        },
        ])
    }
  return (
    <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>{nombre}</Headline>
            <Text style={styles.texto}>Empresa: <Subheading>{empresa}</Subheading> </Text> 
            <Text style={styles.texto}>Correo: <Subheading>{correo}</Subheading> </Text> 
            <Text style={styles.texto}>Teléfono: <Subheading>{telefono}</Subheading> </Text> 

            <Button 
                style={styles.boton} 
                mode="contained" 
                icon="cancel"
                onPress={ () => mostrarConfirmacion()  }
            >
                Eliminar Cliente
            </Button>

            <FAB
                icon="pencil"
                style={globalStyles.fab}
                onPress={() => navigation.navigate("NuevoCliente", { cliente: route.params.item,  setconsultarApi }) }
            />
    </View>
  )
}
export default DetallesCliente;
const styles = StyleSheet.create({
    texto: {
        marginBottom: 20,
        fontSize:18
    },
    boton: {
        marginTop: 100,
        backgroundColor: 'red'
    }
})
 