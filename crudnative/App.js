import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

import Inicio from './views/Inicio';
import { NuevoCliente } from './views/NuevoCliente';
import DetallesCliente from './views/DetallesCliente';
import { BarraSuperior } from './components/ui/BarraSuperior';

const Stack=createStackNavigator()
const theme={
  ...DefaultTheme,
  colors:{
    primary:'#dc67cd'
  }
}

export const App = () => {
  return (
  <>
  <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:theme.colors.primary,
          },
          headerTintColor:theme.colors.surface
        }}
      >
        <Stack.Screen
          name="Inicio"
          component={Inicio}
         /* options={({navigation, route})=>({
            headerLeft:(props)=>(
            <BarraSuperior 
            {...props}
            navigation={navigation}
            route={route}
            />)
          })}*/
        >
        
        </Stack.Screen>
        <Stack.Screen
          name="NuevoCliente"
          component={NuevoCliente}
          options={{
            title:'Nuevo cliente'
          }}
        >
        
        </Stack.Screen>
        <Stack.Screen
          name="DetallesCliente"
          component={DetallesCliente}
          options={{title:'Detalles cliente'}}
        >
        
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  </PaperProvider>
  </>
  )
}
export default App;