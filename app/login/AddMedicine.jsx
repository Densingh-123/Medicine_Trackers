import { StyleSheet, Text, View,ScrollView } from 'react-native';
import React from 'react';
import AddMediHeader from '../../components/AddMediHeader';
import AddMedicationForm from '../../components/AddMedicationForm';
const AddMedicine = () => {
  return (
    <View > 
     <ScrollView>
 <AddMediHeader/>
 <AddMedicationForm/>
     </ScrollView>
    </View>
  );
};

export default AddMedicine;

const styles = StyleSheet.create({

});
