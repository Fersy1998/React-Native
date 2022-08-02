import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Formulario } from './components/Formulario';
import { Header } from './components/Header';
import axios from 'axios';
import { Cotizacion } from './components/Cotizacion';
const App = () => {

  const [moneda, setMoneda] = useState('')
  const [criptomoneda, setCriptomoneda] = useState('')
  const [consultarAPI, setConsultarAPI] = useState(false)
  const [resultado, setResultado] = useState({})
  const [guardando, setGuardando] = useState(false)
  
  const componente = guardando ? <ActivityIndicator /> : <Cotizacion resultado={resultado}/>
  
  useEffect(() => {
    console.log('nunca llega aqui')
    const cotizarCriptomoneda=async()=>{
      console.log(consultarAPI)
      if(consultarAPI){
        setGuardando(true)
        const url=`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const resultado= await axios.get(url)
        
        setResultado(resultado.data.DISPLAY[criptomoneda][moneda])
        console.log(resultado)
        setConsultarAPI(false)
        setGuardando(false)
      }
    }
    
    cotizarCriptomoneda()
  }, [consultarAPI])
  
  return (
    <>
      <Header />
      <Image 
        style={styles.imagen}
        source={require('./assets/img/cryptomonedas.png')}
      />
      <View style={styles.contenido}>
        <Formulario 
          moneda={moneda} 
          criptomoneda={criptomoneda}
          setMoneda={setMoneda}
          setCriptomoneda={setCriptomoneda}
          setConsultarAPI={setConsultarAPI}
        />
       {componente}
      </View>
      
    </>
  );
}

const styles = StyleSheet.create({
  imagen:{
    width:'100%',
    height:150,
    marginHorizontal:'2.5%'
  },
  contenido:{
    marginHorizontal:'2.5%'
  }
});

export default App;
