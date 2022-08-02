
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './views/Inicio';
import Nosotros from './views/Nosotros';

const Stack=createStackNavigator()
export const App = () => {

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Inicio"
        >
          <Stack.Screen 
            name="Inicio"
            component={Inicio}
            options={{
              title:'Página principal',
              headerStyle:{
                backgroundColor:'#4cf3cc'
              },
              headerTintColor:'#f65779',
              headerTitleAlign:'center',
              headerTitleStyle:'bold'
            }}
          />
          <Stack.Screen 
            name="Nosotros"
            component={Nosotros}
            options={
              ({route})=>({title:route.params.id})
            }
          />
        
        </Stack.Navigator>
      </NavigationContainer>
    
    </>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
