import React from 'react'
import {
  Text, View, Button, StyleSheet
} from 'react-native'
const Nosotros = ({navigation, route}) => {
  const regresar=()=>{
    navigation.goBack()
  }
  return (
    <View style={styles.contenedor}>
    <Text>NOSOTROS {route.params.id}</Text>
    <Button
        title="Go back"
        onPress={ () => regresar() }
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
export default Nosotros;
