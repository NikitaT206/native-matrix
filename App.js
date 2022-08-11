import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect, useMemo } from 'react';
import { Array } from './components/Array';
import * as Font from 'expo-font'
import { StatusBar } from 'react-native';

const {width, height} = Dimensions.get('window')


export default function App() {
  const [font, setFont] = useState(false)

  // const [width, setWidth] = useState(Dimensions.get('window').width)
  // const {width, height} = Dimensions.get('window')

  const [array, setArray] = useState(() => {
    const arr = []
    arr.length = Math.floor(width / 25)
    arr.fill(1)
    return arr
  })

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Matrix': require('./assets/fonts/matrixcodenfi.ttf')
        })
      } catch(err) {
        console.log(err)
      } finally {
        setFont(true)
      }
    }
    prepare()
  }, [])

  if (font) {
    return (
      <View style={styles.container}>
        <StatusBar hidden/>
        {array.map((item, index) => {
          return <Array key={index}/>
        })}
      </View>
    );
  } else {
    return <View style={styles.container}></View>
  }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
});
