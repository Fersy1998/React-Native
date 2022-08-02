import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';

const App = () => {
  return (
      /*
      <View style={styles.contenedor}>
        <View style={styles.caja1}><Text>Hola</Text></View>
  
        <View style={styles.caja2}><Text>Hola</Text></View>
  
        <View style={styles.caja3}><Text>Hola</Text></View>
  
        <View style={styles.caja4}><Text>Hola</Text></View>
  
      </View>*/
  
      <>
        <ScrollView>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.banner}
              source={require('./src/assets/img/bg.jpg')}
            />
          </View>
          <View style={styles.contenedor}>
            <Text style={styles.titulo}>¿Qué hacer en Paris?</Text>
            <ScrollView
                horizontal
              >
                  <View>
                      <Image
                          style={styles.ciudad}
                          source={ require('./src/assets/img/actividad1.jpg') }
                      />
                  </View>
                  <View>
                      <Image
                          style={styles.ciudad}
                          source={ require('./src/assets/img/actividad2.jpg') }
                      />
                  </View>
                  <View>
                      <Image
                          style={styles.ciudad}
                          source={ require('./src/assets/img/actividad3.jpg') }
                      />
                  </View>
                  <View>
                      <Image
                          style={styles.ciudad}
                          source={ require('./src/assets/img/actividad4.jpg') }
                      />
                  </View>
                  <View>
                      <Image
                          style={styles.ciudad}
                          source={ require('./src/assets/img/actividad5.jpg') }
                      />
                  </View>
              </ScrollView>
              
            <Text style={styles.titulo}>Los mejores alojamientos</Text>
            <View>
              <View>
                        <Image
                            style={styles.mejores}
                            source={ require('./src/assets/img/mejores1.jpg') }
                        />
              </View>
              <View>
                        <Image
                            style={styles.mejores}
                            source={ require('./src/assets/img/mejores2.jpg') }
                        />
              </View>
              <View>
                        <Image
                            style={styles.mejores}
                            source={ require('./src/assets/img/mejores3.jpg') }
                        />
              </View>
              
            </View>
              
            <Text style={styles.titulo}>Hospedajes en L.A.</Text>
            <View style={styles.listado}>
              <View style={styles.listadoItem}>
                        <Image
                            style={styles.mejores}
                            source={ require('./src/assets/img/hospedaje1.jpg') }
                        />
              </View>
              <View style={styles.listadoItem}>
                        <Image
                            style={styles.mejores}
                            source={ require('./src/assets/img/hospedaje2.jpg') }
                        />
              </View>
              <View style={styles.listadoItem}>
                        <Image
                            style={styles.mejores}
                            source={ require('./src/assets/img/hospedaje3.jpg') }
                        />
              </View>
              <View style={styles.listadoItem}>
                        <Image
                            style={styles.mejores}
                            source={ require('./src/assets/img/hospedaje4.jpg') }
                        />
              </View>
              
            </View>
            
          </View>
        </ScrollView>
      </>
    );
};

const styles = StyleSheet.create({
  banner: {
    height: 250,
    flex: 1,
  },
  titulo:{
    fontWeight: 'bold',
    fontSize:24,
    marginVertical:20
  },
  contenedor:{
    marginHorizontal:10,
  },
  ciudad:{
    marginRight:10,
    width:250,
    height:300,
  },
  mejores:{
    width:'100%',
    height:200,
    marginVertical:5
  },
  listado:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between'
  },
  listadoItem:{
    flexBasis:"49%",
  }
  /*
 contenedor:{
  backgroundColor:'#763cc2',
  flex:1,
  direction:'column',
  justifyContent:'space-between'
 },
  caja1:{
    padding:20,
    backgroundColor:'#d5245f',
    flex:1
  },
  caja2:{

    padding:20,
    backgroundColor:'#ff245f',
    flex:1
  },
  caja3:{

    padding:20,
    backgroundColor:'#35ff5f',
    flex:1
  },
  caja4:{

    padding:20,
    backgroundColor:'#35cc5f',
    flex:1
  },*/
});

export default App;
