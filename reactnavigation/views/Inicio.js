import React from 'react'
import {
    Text, View, Button, StyleSheet
} from 'react-native'
const Inicio = ({navigation}) => {

  const variable={id:'2344'}
  const visitarNosotros=()=>{
    navigation.navigate('Nosotros', variable)
  }
  return (
    <View style={styles.contenedor}>
    <Text>Inicio</Text>
    <Button
        title="Ir a Nosotros"
        onPress={ () => visitarNosotros() }
    />
    </View>

  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
    }
})
export default Inicio;
