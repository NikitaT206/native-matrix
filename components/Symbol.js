import { StyleSheet, Text } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { arrayOfSymbols } from '../constants';

export function Symbol({index, currentIndex, loop, arr, randomIndex, randomDelay}) {

  const [firstLetter, setFirstLetter] = useState(false)
  const [randomSymbol, setRandomSymbol] = useState(arrayOfSymbols[Math.floor(Math.random() * arr.length)])

  useEffect(() => {
    if (currentIndex - 1 === index) {
      setFirstLetter(true)
    } else {
      setFirstLetter(false)
    }
  }, [currentIndex, index])

  useEffect(() => {
    if (!firstLetter) {
      setTimeout(() => {
        fadeOut()
      }, 1000)
    } else {
      fadeIn()
    }
  }, [firstLetter])

  useEffect(() => {
    if (index === randomIndex) {
      const time = Math.floor(Math.random() * 7000 + 1000)

      const interval = setInterval(() => {
        setRandomSymbol(arrayOfSymbols[Math.floor(Math.random() * arr.length)])
        const timeout = setTimeout(() => {
          clearInterval(interval)
        }, time)
      },  randomDelay)
    }
  }, [loop])

  useEffect(() => {
    if (loop) {
      setRandomSymbol(arrayOfSymbols[Math.floor(Math.random() * arr.length)])
    }
  }, [loop])

  const fadeAnim = useRef(new Animated.Value(0)).current;

  function fadeOut() {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true
    }).start()
  }

  function fadeIn() {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true
    }).start()
  }

  return (
    <Animated.View
      style={ {opacity: fadeAnim, backgroundColor: 'transparent',} }
    >
      <Text style={firstLetter ? styles.symbolActive : styles.symbol}>{randomSymbol}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  symbolActive: {
    color: '#00ff2b',
    fontSize: 44,
    width: 20,
    textAlign: 'center',
    textShadowColor: 'rgb(229, 255, 230)',
    textShadowRadius: 15,
    fontFamily: 'Matrix',
    lineHeight: 35,
    overflow: 'visible'
  },

  symbol: {
    color: '#009a22',
    fontSize: 44,
    width: 20,
    textAlign: 'center',
    textShadowColor: 'green',

    textShadowRadius: 5,
    fontFamily: 'Matrix',
    lineHeight: 35,
    overflow: 'visible'

  },

})