import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
const AddMediHeader = () => {
    const router = useRouter();
  return (
    <View>
    <Image source={require('./../assets/images/do1.jpg')}style={{height:260,width:'100%'}}/>
    <TouchableOpacity style={{position:'absolute',padding:25}}>
    <Ionicons name="arrow-back" size={24} color="black" onPress={()=>router.back()}/>
    </TouchableOpacity>
    </View>
  )
}

export default AddMediHeader

const styles = StyleSheet.create({})