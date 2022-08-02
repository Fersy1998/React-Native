import React, { useState } from 'react'
import {
    StyleSheet,
    Text, TextInput, TouchableWithoutFeedback, View,
    Animated, 
    Alert
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
export const Formulario = ({busqueda, setBusqueda, setConsultar}) => {
    
    const {ciudad, pais}=busqueda;
    
    const consultarClima=()=>{
        if(pais.trim()==='' || ciudad.trim()===''){
            Alert.alert('error', 'Ciudad y país indefinidos')
            return
        }
        setConsultar(true)
    }
    
    //animaciones
    
    const [animacionboton] = useState(new Animated.Value(1))
    const animacionEntrada=()=>{
        Animated.spring(animacionboton, {
        toValue:.75}).start(); 
    }
    const animacionSalida=()=>{
        Animated.spring(animacionboton, {
            toValue:1,
            friction:1,
            tension:30,
            
         }).start(); 
    }
    
    const estiloAnimacion={
        transform:[{scale:animacionboton}]
    }
  return (
    <View>
        <View style={styles.formulario}>
            <TextInput 
                value={ciudad}
                style={styles.input}
                onChangeText={ciudad=>setBusqueda({...busqueda, ciudad})}
                placeholder='Ciudad'
                placeholderTextColor='#666'
            />
        </View>
        <View>
            <Picker
                selectedValue={pais}
                itemStyle={{height:120, backgroundColor:'#fff'}}
                onValueChange={pais=>setBusqueda({...busqueda, pais})}
            >
                <Picker.Item 
                    label="--seleccione país--" value=""
                />
                <Picker.Item 
                    label="Estados Unidos" value="US"
                />
                <Picker.Item 
                    label="México" value="MX"
                />
                <Picker.Item 
                    label="Honduras" value="HN"
                />
                 <Picker.Item 
                    label="Francia" value="FRA"
                />
            </Picker>
        </View>
        <TouchableWithoutFeedback
            onPress={()=>consultarClima()}
            onPressIn={()=>animacionEntrada()}
            onPressOut={()=>animacionSalida()}
        >
            <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
                <Text style={styles.textoBuscar}>Buscar clima</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    </View>
  )
}
const styles=StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    btnBuscar: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    textoBuscar: {
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18
    }
})
