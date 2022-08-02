import React from 'react'
import {Button} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome5';
export const BarraSuperior = ({navigation, route}) => {
    const handlePress=()=>{
      navigation.navigate("NuevoCliente")
    }
  return (
    <Button icon="plus" onPress={()=>handlePress()} color='#fff'>
    Cliente
    </Button>
  )
}
