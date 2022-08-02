import React, { useEffect, useState } from 'react'
import { 
        Modal,
        Text,
        SafeAreaView,
        StyleSheet,
        View,
        TextInput,
        ScrollView,
        Pressable,
        Alert
} from 'react-native'

import DatePicker from 'react-native-date-picker'

const Formulario = ({modalVisible, setModalVisible, pacientes, setPacientes, pacienteObj, setPacientex}) => {
  const [paciente, setPaciente] = useState('')
  const [id, setid] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [fecha, setFecha] = useState(new Date())
  const [sintomas, setSintomas] = useState('')
  useEffect(() => {
    if(Object.keys(pacienteObj).length>0){
      setid(pacienteObj.id)
      setPaciente(pacienteObj.paciente)
      setPropietario(pacienteObj.propietario)
      setEmail(pacienteObj.email)
      setTelefono(pacienteObj.telefono)
      setFecha(pacienteObj.fecha)
      setSintomas(pacienteObj.sintomas)
    }
  }, [pacienteObj])
  
  const handleCita=()=>{
    if([paciente, propietario, email, fecha, sintomas].includes('')){
      Alert.alert('Error', 'Todos los campos son obligatorios')
      return
    }
    console.log(sintomas);
    const nuevoPaciente={
      paciente,
      propietario,
      email,
      telefono,
      fecha, 
      sintomas
    }
    if(id){
      nuevoPaciente.id=id
      const pacientesActualizados=pacientes.map(paciente=> paciente.id===id ? nuevoPaciente : paciente)
      setPacientes(pacientesActualizados)
      setPacientex({})
    }else{
      nuevoPaciente.id= Date.now()
      setPacientes([...pacientes, nuevoPaciente])
    }
    limpiarFormulario()
    setModalVisible(false)
    return
  }
  const limpiarFormulario=()=>{
  
    setid('')
    setPaciente('')
    setPropietario('')
    setEmail('')
    setTelefono('')
    setFecha(new Date())
    setSintomas('')
  }
  return (
    <Modal
    animationType='fade'
    visible={modalVisible}
  >
    <SafeAreaView  style={styles.contenido}>
      <ScrollView>
      <Text style={styles.titulo}>{pacienteObj.id ? 'Editar' : 'Nueva'}{''} <Text style={styles.tituloBold}>cita</Text></Text>
      <Pressable style={styles.btnCancelar} onLongPress={()=>{
      
        setModalVisible(false)
        setPacientex({})
        limpiarFormulario()
        }
      }>
        <Text style={styles.btnCancelarTexto}> X Cancelar</Text>
      </Pressable>
      <View style={styles.campo} >
        <Text style={styles.label}>Nombre paciente: </Text>
        <TextInput
          style={styles.input}
          placeholder='Nombre del paciente'
          placeholderTextColor='#666'
          value={paciente}
          onChangeText={setPaciente}
        ></TextInput>
      </View>
      <View style={styles.campo}>
        <Text style={styles.label}>Nombre propietario: </Text>
        <TextInput
          style={styles.input}
          placeholder='Nombre del propietario'
          placeholderTextColor='#666'
          value={propietario} 
          onChangeText={setPropietario}
        ></TextInput>
      </View>
      <View style={styles.campo}>
          <Text style={styles.label}>Email propietario: </Text>
        <TextInput
          style={styles.input}
          placeholder='Email del propietario'
          placeholderTextColor='#666'
          value={email}  
          onChangeText={setEmail}
          keyboardType='email-address'
        ></TextInput>
      </View>
      <View style={styles.campo}>
        <Text style={styles.label}>Teléfono propietario: </Text>
        <TextInput
          style={styles.input}
          placeholder='Teléfono del propietario'
          placeholderTextColor='#666'
          value={telefono}  
          onChangeText={setTelefono}
          keyboardType='number-pad'
          maxLength={8}
        ></TextInput>
      </View>
      <View style={styles.campo}>
        <Text style={styles.label}>Fecha alta: </Text>
        <View style={styles.fechaContenedor}>
                    <DatePicker 
                            date={fecha}
                            locale='es'
                            onDateChange={ (date) => setFecha(date)}
                        />
                    </View>
      </View>
      <View style={styles.campo}>
        <Text style={styles.label}>Síntomas: </Text>
        <TextInput
          style={[styles.input, styles.sintomasInput]}
          placeholder='Síntomas del paciente'
          placeholderTextColor='#666'
          onChangeText={setSintomas}
          value={sintomas}
          multiline={true}
          numberOfLines={4}
          ></TextInput>
      </View>
      <Pressable style={styles.btnNuevaCita} onPress={handleCita}>
        <Text style={styles.btnNuevaCitaTexto}>{pacienteObj.id ? 'Editar' : 'Agregar'} paciente</Text>
      </Pressable>
      </ScrollView>
    </SafeAreaView>
  
  </Modal>
  )
}

const styles = StyleSheet.create({
  contenido: {
      backgroundColor: '#6D28D9',
      flex: 1,
  },
  titulo: {
      fontSize: 30,
      fontWeight: '600',
      textAlign: 'center',
      marginTop: 30,
      color: '#FFF'
  },
  tituloBold: {
      fontWeight: '900'
  },
  btnCancelar: {
      marginVertical: 30,
      backgroundColor: '#5827A4',
      marginHorizontal: 30,
      padding: 15,
      borderRadius: 10,
  },
  btnCancelarTexto: {
      color: '#FFF',
      textAlign: 'center',
      fontWeight: '900',
      fontSize: 16,
      textTransform: 'uppercase',
  },
  campo: {
      marginTop: 10,
      marginHorizontal: 30,
  },
  label: {
      color: '#FFF',  
      marginBottom: 10,
      marginTop: 15,
      fontSize: 20,
      fontWeight: '600'
  },
  input: {
      backgroundColor: '#FFF',
      padding: 15,
      borderRadius: 10
  },
  sintomasInput: {
      height: 100
  },
  fechaContenedor: {
      backgroundColor: '#FFF',
      borderRadius: 10
  },
  btnNuevaCita: {
      marginVertical: 50,
      backgroundColor: '#F59E0B',
      paddingVertical: 15,
      marginHorizontal: 30,
      borderRadius: 10
  },
  btnNuevaCitaTexto: {
      color: '#5827A4',
      textAlign: 'center',
      fontWeight: '900',
      fontSize: 16,
      textTransform: 'uppercase',
  }
})

export default Formulario;
