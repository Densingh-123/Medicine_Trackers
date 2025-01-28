import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import EmptyState from '../../components/EmptyState';

const AddNew = () => {
  return (
    <View style={styles.container}>
      <EmptyState />
    </View>
  );
};

export default AddNew;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the full screen height
    justifyContent: 'center', // Vertically center the content
    alignItems: 'center', // Horizontally center the content
    backgroundColor: 'white', // Optional background color
  },
});
