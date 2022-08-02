
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  FlatList,
  Alert,
  Modal
  
} from 'react-native';

import Formulario from './src/components/Formulario';
import { InformacionPaciente } from './src/components/InformacionPaciente';
import { Paciente } from './src/components/Paciente';


const App=() => {
  
  const [modalVisible, setModalVisible] = useState(false)
  const [modalPaciente, setModalPaciente] = useState(false)
  
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})
  
  const pacienteEditar=id=>{
    const pacienteED=pacientes.filter(paciente=>paciente.id===id)
    setPaciente(pacienteED[0])
  }
  const pacienteEliminar=id=>{
    Alert.alert('¿Deseas eliminar este paciente?', 'No se puede revertir esta acción', 
      [{text:'Cancelar'}, 
      {text:'Elimitar de todas formas',
      onPress:()=>{
        const pacientesActualizados=pacientes.filter(paciente=>paciente.id !==id)
        setPacientes(pacientesActualizados)
      }
      }])
   
  }
  
  return (
   <SafeAreaView style={styles.container}>
  
    <Text style={styles.titulo}>
      Administrador de citas {''}
      <Text style={styles.tituloBold}>Veterinaria</Text>
    
    </Text>
    {/*<Button
      title='Nueva cita'
      onPress={()=>{console.log('Presionaste')}}
  ></Button>*/}
  <Pressable style={styles.btnNuevaCita}
    onPress={()=>{
    console.log('presionaste');
    setModalVisible(true)}
    }
  >
      <Text style={styles.btnTextoNuevaCita}>
          Nueva
    
      </Text>
  </Pressable>
  
  {pacientes.length===0 ? <Text style={styles.noPacientes}>No hay pacientes</Text>:
    <FlatList 
      style={styles.listado}
      data={pacientes}
      keyExtractor={(item)=>item.id}
      renderItem={({item})=>{
        return <Paciente item={item} 
          setModalVisible={setModalVisible} 
          setPaciente={setPaciente}
          pacienteEditar={pacienteEditar} 
          pacienteEliminar={pacienteEliminar}
          setModalPaciente={setModalPaciente}
          
          />
      }}
    />
  }
  {modalVisible && 
  <Formulario 
    modalVisible={modalVisible}
    setModalVisible={setModalVisible}
    pacientes={pacientes}
    setPacientes={setPacientes}
    pacienteObj={paciente}
    setPacientex={setPaciente}
  />
  }
  
  <Modal visible={modalPaciente}>
    <InformacionPaciente paciente={paciente} setModalPaciente={setModalPaciente} setPaciente={setPaciente}/>
  </Modal>
  
  
  </SafeAreaView>
 
  
  );
};

const styles=StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1
  },
  titulo: {
      textAlign: 'center',
      fontSize: 30,
      color: '#374151',
      fontWeight: '600'
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnNuevaCita: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30
  }
})
export default App;
