import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.h_view}>
        <Text style={styles.h_text}>Notes</Text>
        <Feather name='sun' size={24} color='white' position='absolute' top={20} right={20} />

        <TextInput
          placeholder='Search Notes'
          placeholderTextColor='#fff'
          style={styles.searchInput} />
      </View>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101011'
  },
  h_view: {

  },
  h_text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 18,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 15,
    color: '#fff'
  }
})