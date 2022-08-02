import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Text, FlatList, View, StyleSheet} from 'react-native'
import {List, Headline, Button, FAB} from 'react-native-paper'
import globalStyles from '../styles/global'

const Inicio = ({navigation}) => {
    const [clientes, setclientes] = useState([])
    const [consultarApi, setconsultarApi] = useState(true)
    useEffect(() => {
      const obtenerClientes=async()=>{
        try {
            const res=await axios.get('http://192.168.0.16:3000/clientes')
            setclientes(res.data)
            setconsultarApi(false)
        } catch (error) {
            console.log(error)
        }
      }
      if(consultarApi){
        obtenerClientes()
      }
    }, [consultarApi])
    
  return (
    <View style={globalStyles.contenedor} >
        <Button icon="plus-circle" 
        onPress={()=>navigation.navigate("NuevoCliente", {setconsultarApi})}>
        Nuevo Cliente
        </Button>
        <Headline style={globalStyles.titulo}>
            Clientes
        </Headline>
        <FlatList 
             data={clientes}
             keyExtractor={cliente=>(cliente.id).toString()}
             renderItem={
                ({item})=>(<List.Item 
                    title={item.nombre}
                    description={item.empresa}
                    onPress={()=>navigation.navigate("DetallesCliente", {item, setconsultarApi})}
                />)
             }
        />
        <FAB 
            icon="plus"
            style={styles.fab}
            onPress={()=>navigation.navigate("NuevoCliente", {setconsultarApi})}
        />
    </View>
  )
}
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    alignItems: 'center',
    bottom:20,
    margin:20,
    right:0,
    
    }
})
export default Inicio;
