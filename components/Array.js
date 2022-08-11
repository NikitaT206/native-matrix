import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Symbol } from './Symbol';
import { arrayOfSymbols } from '../constants';

export function Array() {

  const [height, setHeight] = useState(Dimensions.get('window').height)
  
  const [array, setArray] = useState(() => {
    const array = []
    array.length = Math.floor(height / 32)
    return array.fill(1)
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [loop, setLoop] = useState(true)

  const [randomIndex, setRandomIndex] = useState(Math.floor(Math.random() * array.length - 1))
  const [randomDelay, setRandomDelay] = useState(Math.floor(Math.random() * 4000 + 50))

  useEffect(() => {
    if (loop) {
      setRandomDelay(Math.floor(Math.random() * 100 + 50))
      setRandomIndex(Math.floor(Math.random() * array.length - 1))
    }
  }, [loop])

  useEffect(() => {
    const randomTimeout = Math.floor(Math.random() * 4000) 
    const timeout = setTimeout(() => {
      if (loop) {
        const randomDelay = Math.floor(Math.random() * 110 + 50)
        for (let i = 0; i < array.length; i++) {
          const timeout = setTimeout(() => {
            setCurrentIndex(state => state + 1)
            clearTimeout(timeout)
          }, i * randomDelay)
        }
      }
      clearTimeout(timeout)
    }, randomTimeout)
   
  }, [loop])

  useEffect(() => {
    setLoop(false)
    if (currentIndex >= array.length) {
      const randomDelay = Math.floor(Math.random() * 1000 + 0) 
      setCurrentIndex(0)
      const timeout = setTimeout(() => {
        setLoop(true)
        clearTimeout(timeout)
      }, randomDelay + 2000)
    }
  }, [currentIndex])
  
  return (
    <View style={styles.array}>
      {array.map((item, index, arr) => {
        return <Symbol 
          key={index}
          randomIndex={randomIndex} 
          randomDelay={randomDelay} 
          arr={arr} 
          index={index} 
          currentIndex={currentIndex} 
          loop={loop} 
          />
      } )}
    </View>
  )

}

const styles = StyleSheet.create({
  array: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minWidth: 20,
    maxWidth: 20,
    height: '100%',
    overflow: 'visible'
    
  },
})