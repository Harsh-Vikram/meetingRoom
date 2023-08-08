import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import screenNames from '../utils/screenNames'

type Props = {}

const Home = (props: Props) => {
  return (
    <View>
      <Text onPress={() => props.navigation.navigate(screenNames.ROOM_DETAIL)}>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})