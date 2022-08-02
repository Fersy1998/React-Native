import React, { useContext, useEffect, useState } from 'react'
//import { Text } from 'react-native'
import firebase from '../firebase'
import {Box, Center, Text, VStack, Button} from 'native-base'
import PedidosContext from '../context/pedidos/pedidosContext'
import Countdown from 'react-countdown'
import { useNavigation } from '@react-navigation/native'
const ProgresoPedido = () => {
  const {idPedido}=useContext(PedidosContext)
  const [tiempo, settiempo] = useState(0)
  const [completado, setcompletado] = useState(false)
  
  const navigation=useNavigation()
  useEffect(() => {
    const obtenerProducto=()=>{
      firebase.db.collection('ordenes').doc(idPedido)
      .onSnapshot(
        function(doc){
          settiempo(doc.data().tiempoEntrega)
          setcompletado(doc.data().completado)
        }
      )
    }
    obtenerProducto()
  }, [])
  
  const renderer=({minutes,seconds})=>{
    return <Text fontSize='6xl' mt={5}>{minutes}:{seconds}</Text>
  }
  return (
    <Box>
      <VStack>
      {!completado && tiempo===0 &&(
        <Center>
          <Text>Hemos recibido tu orden...</Text>
          <Text>Estamos calculando el tiempo de entrega...</Text>
        </Center>
        
      )}
        {!completado && tiempo>0 &&(
        <Center>
          <Text>Su orden estará lista en:</Text>
          <Text my={6} fontSize='6xl'>
            <Countdown 
              date={Date.now()+tiempo*60000}
              renderer={renderer}
            />
          </Text>
        </Center>
        
      )}
      {completado &&(
        <Center>
          <Text>¡ORDEN LISTA!</Text>
          <Text my={6} fontSize='3xl'>
            Puedes pasar a recoger tu pedido.
          </Text>
          
          <Button
                colorScheme="dark"
                bg='#000'
                w={100}
                h={20}
                my={8}
                onPress={()=>navigation.navigate('NuevaOrden')}
                
              >
              Hacer un nuevo pedido
            </Button>
        </Center>
        
      )}
      </VStack>
    </Box>
  )
}

export default ProgresoPedido;