import { Picker } from '@react-native-picker/picker'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableHighlight, View } from 'react-native'

export const Formulario = ({
    moneda, 
    criptomoneda, 
    setMoneda, 
    setCriptomoneda,
    setConsultarAPI
    
    }) => {
    const [criptomonedas, setCriptomonedas] = useState('')
    const obtenerMoneda = moneda => {
        setMoneda(moneda)
    }
    const obtenerCriptomoneda = criptoMoneda => {
        setCriptomoneda(criptoMoneda)
    }
    
    const mostrarAlerta=()=>{
        Alert.alert(
        'Error...',
        'Los campos son obligatorios',
        )
    }
    const cotizarPrecio=()=>{
        if(moneda.trim()==='' || criptomoneda.trim()===''){
            mostrarAlerta()
            return
        }
        setConsultarAPI(true)
    }
    
    useEffect(() => {
      const consultarAPI=async()=>{
        const url='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
        const resultado=await axios.get(url);
        console.log(resultado.data.Data)
        setCriptomonedas(resultado.data.Data)
      }
      consultarAPI()
    }, [])
    
  return (
    <View>
        <Text style={styles.label}>Moneda</Text>
        <Picker
            selectedValue={moneda}
            onValueChange={moneda => obtenerMoneda(moneda)}
            itemStyle={{height:120}}
        >
            <Picker.Item 
                label="--seleccione--"
                value=""
            />
            <Picker.Item 
                label="Dolar de E.E.U.U."
                value="USD"
            />
            <Picker.Item 
                label="Peso Mexicano"
                value="MXN"
            />
            <Picker.Item 
                label="Euro"
                value="EUR"
            />
            <Picker.Item 
                label="Libra Esterlina"
                value="GBP"
            />
            <Picker.Item 
                label="Lempiras"
                value="HNL"
            />
        </Picker>
        
        <Text style={styles.label}>Criptomoneda</Text>
        <Picker
            selectedValue={criptomoneda}
            onValueChange={criptomoneda => obtenerCriptomoneda(criptomoneda)}
            itemStyle={{height:120}}
        >
            <Picker.Item 
                label="--seleccione--"
                value=""
            />
            {
                criptomonedas !=='' &&
                criptomonedas.map(cripto=>(
                    <Picker.Item 
                        key={cripto.CoinInfo.Id}
                        label={cripto.CoinInfo.FullName}
                        value={cripto.CoinInfo.Name}
                    />
                ))
            }
        </Picker>
        <TouchableHighlight style={styles.btnCotizar} 
            onPress={cotizarPrecio}
        >
            <Text style={styles.btnCotizarTexto}>Cotizar</Text>
        </TouchableHighlight>
    </View>
  )
}
const styles=StyleSheet.create({
    label: {
        fontFamily:'Lato-Black',
        textTransform:'uppercase',
        fontSize:22,
        marginVertical:20,
    },
    btnCotizar:{
        backgroundColor:'#5e49e6',
        padding:10,
        marginVertical:20
    },
    btnCotizarTexto:{
        color:'#fff',
        fontWeight:'bold',
        fontFamily:'Lato-Black',
        textAlign:'center',
        textTransform:'uppercase'
    }
})
