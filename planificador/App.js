import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  Pressable, 
  Image,
  Modal
} from 'react-native';
import { ControlPresupuesto } from './src/components/ControlPresupuesto';
import { Filtro } from './src/components/Filtro';
import { FormularioGasto } from './src/components/FormularioGasto';
import { Header } from './src/components/Header';
import { ListadoPresupuesto } from './src/components/ListadoPresupuesto';
import { NuevoPresupuesto } from './src/components/NuevoPresupuesto';
import { generarId } from './src/helpers/formatearCantidad';
import AsyncStorage from '@react-native-async-storage/async-storage';
const App =() => {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [presupuesto, setPresupuesto] = useState(0)
  const [modal, setModal] = useState(false)
  const [gastos, setGastos] = useState([])
  const [gasto, setGasto] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setgastosFiltrados] = useState([])
  
  useEffect(() => {
    const obtenerPresupuesto=async()=>{
      try {
        const presupuestoStorage=await AsyncStorage.getItem('planificador_presupuesto') ?? 0
        if(presupuestoStorage>0){
          setPresupuesto(presupuestoStorage)
          setIsValidPresupuesto(true)
        }
       
      } catch (error) {
        console.log(error)
      }
    }
    obtenerPresupuesto()
  }, [])
  
  
  useEffect(() => {
    if(isValidPresupuesto){
      const almacenarAS=async()=>{
          try {
            await AsyncStorage.setItem('planificador_presupuesto', presupuesto)
          } catch (error) {
              console.log(error)
          }
        }
      almacenarAS()
    }
  }, [isValidPresupuesto])
  useEffect(() => {
    const obtenerGastosStorage=async()=>{
      try {
        const gastosStorage= await AsyncStorage.getItem('planificador_gastos')
        setGastos(gastosStorage ? JSON.parse(gastosStorage) : [])
      } catch (error) {
        console.log(error)
      }
    }
    obtenerGastosStorage()
  }, [])
  
  
  useEffect(() => {
    const guardarGastosStorage=async()=>{
      try {
        await AsyncStorage.setItem('planificador_gastos', JSON.stringify(gastos))
      } catch (error) {
        console.log(error)
      }
    
    }
    guardarGastosStorage()
  }, [gastos])
  
  
  useEffect(() => {
    if(filtro===''){
      setgastosFiltrados([])
    }else{
    
      const misGastosFiltrados=gastos.filter(gasto=>gasto.categoria===filtro)
      if(misGastosFiltrados.length>0){
        setgastosFiltrados(misGastosFiltrados)
      }else{
        setgastosFiltrados([])
      }
      
    }
  }, [filtro])
  
  const handleGasto=(gasto)=>{
  
    if(Object.values([gasto.nombre, gasto.categoria, gasto.cantidad]).includes('')){
      Alert.alert('Error', 'Hay campos vacíos')
      return
    }
    if(gasto.id !==''){
      const gastosActualizados=gastos.map(gastoX=>gasto.id===gastoX.id ? gasto : gastoX)
      setGastos(gastosActualizados)
    }else{
      gasto.id=generarId()
      gasto.fecha=Date.now()
      setGastos([...gastos, gasto])
    }
    setModal(!modal)
    setGasto({})
    return
  }
  const handleNuevoPresupuesto=(presupuesto)=>{
    if(Number(presupuesto)>0){
      setIsValidPresupuesto(true)
    }else{
      Alert.alert('Error', 'Presupuesto no válido')
    }
  }
  const eliminarGasto=id=>{
      Alert.alert('¿Deseas eliminar este gasto', 'Esta acción no se puede revertir', [
        {text:'Cancelar', style:'cancel'},
        {text:'Eliminar de todas formas',
          onPress:()=>{
            const gastosActualizados=gastos.filter(gasto=>gasto.id!==id)
            setGastos(gastosActualizados)
            setGasto({})
            setModal(!modal)
          }
        }
      ])
  
  }
  const resetearApp=()=>{
    Alert.alert('Deseas eliminar este presupuesto?', 'Se eliminarán todos los datos del mismo', [
      {
        text:'Cancelar',
        style:'cancel'
      },
      {
        text:'Eliminar de todos modos',
        onPress:()=>{
          const eliminarDeLS=async()=>{
            try {
              await AsyncStorage.clear()
              setIsValidPresupuesto(false)
              setPresupuesto(0)
              setGastos([])
            } catch (error) {
              console.log(error)
            }
          }
          eliminarDeLS()
        }
      }
    
    ])
  
  }
  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {
            isValidPresupuesto 
            ? <ControlPresupuesto presupuesto={presupuesto} gastos={gastos} resetearApp={resetearApp}/>
            :  <NuevoPresupuesto handleNuevoPresupuesto={handleNuevoPresupuesto} presupuesto={presupuesto} setPresupuesto={setPresupuesto}/>
          }
         
        </View>
        {
          isValidPresupuesto && (
          <>
            <Filtro setFiltro={setFiltro} filtro={filtro}/>
            <ListadoPresupuesto 
              gastos={gastos} 
              setModal={setModal} 
              setGasto={setGasto} 
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </>
          )
        }
      </ScrollView>
      {
        modal && 
        (<Modal 
          animationType='slide'
          visible={modal}
        >
          <FormularioGasto setModal={setModal} handleGasto={handleGasto} gasto={gasto} setGasto={setGasto} eliminarGasto={eliminarGasto}/>
        </Modal>)
      }
      { 
        isValidPresupuesto && 
        (<Pressable 
        style={styles.pressable}
        onPress={()=>setModal(!modal)}
        >
          <Image source={require('./src/img/nuevo-gasto.png')}  style={styles.imagen}/>
        </Pressable>)
      }
     
      
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor:{
    backgroundColor:'#f5f5f5',
    flex:1,
    overflow:'visible'
  },
  header:{
    backgroundColor:'#3b82f6',
    overflow:'visible',
    minHeight:430
  },
  pressable: {
    width: 60,
    height: 60, 
    position: 'absolute',
    bottom: 10,
    right: 30
  },  
  imagen: {
    width: 60,
    height: 60
  }
});

export default App;
