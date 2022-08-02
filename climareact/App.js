import { urlencoded } from 'express';
import React, { useEffect, useState } from 'react'
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Animated,
  View,
} from 'react-native';
import { Clima } from './components/Clima';
import { Formulario } from './components/Formulario';

const App = () => {
  const [busqueda, setBusqueda] = useState({
    ciudad:'',
    pais:''
  })
  const [backgroudColorApp, setbackgroudColorApp] = useState('rgb( 212, 207, 262 )')
  const {ciudad, pais}=busqueda
  const [consultar, setConsultar] = useState(false)
  const [resultado, setResultado] = useState({})
  
  const bgColorApp={
    backgroundColor:backgroudColorApp
  }
  
  const ocultarTeclado=()=>{
    Keyboard.dismiss();
  }
  
  useEffect(() => {
    const consultarClima=async()=>{
      if(consultar){
        const appId = 'fdb86edbab1e5667cb3c310c22f6decd';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        try {
          const respuesta= await fetch(url)
          const res= await respuesta.json()
          
          //Modifica color
          
          const kelvin=273.15
          const {main}=res
          const actual=main.temp-kelvin
          if(actual>=32){
            setbackgroudColorApp('#F67575')
          }else if(actual>=28 && actual<32 ){
            setbackgroudColorApp('#F68975')
          }else if(actual>=25 && actual<28){
            setbackgroudColorApp('#F6A075')
          }else if(actual>=22 && actual<25){
            setbackgroudColorApp('#F6B875')
          }else if(actual>=21){
            setbackgroudColorApp('#EDF675')
          }else if(actual>=20){
            setbackgroudColorApp('#75F6BF')
          }else if(actual>=19){
            setbackgroudColorApp('#75F6F6')
          }else if(actual>=17 && actual<19){
            setbackgroudColorApp('#75D7F6')
          }else if(actual>=15 && actual<17){
            setbackgroudColorApp('#75C7F6')
          }else if(actual>=12 && actual<15){
            setbackgroudColorApp('#75AAF6')
          }else if(actual<12){
            setbackgroudColorApp('#7589F6')
          }else{
            setbackgroudColorApp(backgroudColorApp)
          }
          
          setResultado(res)
          setConsultar(false)
        } catch (error) {
          console.log(error)
        }
      }
    }
    consultarClima();
  }, [consultar, setbackgroudColorApp, backgroudColorApp])
  
  
  return (
  <>
    <TouchableWithoutFeedback onPress={()=>ocultarTeclado()}>
      <View style={[styles.app, bgColorApp]}>
        <View style={styles.contenido}>
          <Clima resultado={resultado}/>
          <Formulario 
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            setConsultar={setConsultar}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;
