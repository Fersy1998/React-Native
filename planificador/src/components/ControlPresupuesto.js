import React, { useEffect, useState } from 'react'
import {Text, View, StyleSheet, Pressable} from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import { formatearCantidad } from '../helpers/formatearCantidad'
import { globalStyles } from '../styles/styles'
export const ControlPresupuesto = ({presupuesto, gastos, resetearApp}) => {
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje]=useState(0)
    useEffect(() => {
      const totalGastado=gastos.reduce((total, gasto)=>Number(gasto.cantidad)+total, 0
      )
      setGastado(totalGastado)
      const disp=presupuesto-totalGastado
      const nuevoPorcentaje=((presupuesto-disp)/presupuesto)*100
      setPorcentaje(nuevoPorcentaje)
      setDisponible(disp)
    }, [gastos])
    
  return (
    <View style={styles.contenedor}> 
        <View style={styles.centrarGrafica}>
            <CircularProgress value={porcentaje}
                radius={100}
                valueSuffix='%'
                duration={1000}
                title='Gastado'
                inActiveStrokeColor='#f5f5f5'
                inActiveStrokeWidth={20}
                activeStrokeColor='#3b82f6'
                activeStrokeWidth={20}
                titleStyle={{fontWeight:'bold', fontSize:20}}
                titleColor='#999'
            />
        </View>
        <View style={styles.contenedorTexto}>
            <Pressable style={styles.boton} onLongPress={resetearApp}><Text style={styles.botonTexto}>Borrar presupuesto</Text></Pressable>
            <Text style={styles.valor}>
                <Text style={styles.label}> Presupuesto:{' '}</Text>
                {formatearCantidad(presupuesto)}
            </Text>
            <Text style={styles.valor}>
                <Text style={styles.label}> Disponible:{' '}</Text>
                {formatearCantidad(disponible)}
            </Text>
            <Text style={styles.valor}>
                <Text style={styles.label}> Gastado:{' '}</Text>
                {formatearCantidad(gastado)}
            </Text>
        </View>
    </View>
  )
}
const styles=StyleSheet.create({
    imagen:{
        width:170,
        height:170
    },
    contenedor:{
        ...globalStyles.contenedor
    },
    boton:{
        backgroundColor:'#b38699',
        padding:10,
        marginBottom:40,
        borderRadius:10
    },
    botonTexto:{
        textAlign:'center',
        color:'#fff',
        fontWeight:'bold'
    
    },
    centrarGrafica:{
        alignItems:'center'
    },
    contenedorTexto:{
        marginTop:50
    },
    valor:{
        fontSize:24,
        marginBottom:10,
        textAlign:'center'
    },
    label:{
        fontWeight:'700',
        color:'#3B82f6'
    }

})
