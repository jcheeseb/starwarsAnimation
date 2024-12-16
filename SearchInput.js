import React, { useState } from 'react';
import { View, TextInput, Button, Modal, Text, StyleSheet } from 'react-native';

export default function SearchInput({ placeholder }) {
  const [inputText, setInputText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="gray"
        value={inputText}
        onChangeText={setInputText}
      />
      <Button title="Search" onPress={handleSearch} />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>You searched for: {inputText}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
