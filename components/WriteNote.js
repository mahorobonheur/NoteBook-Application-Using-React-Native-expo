// WriteNote.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const NotesWriter = ({ navigation, route }) => {
  const [note, setNote] = useState('');

  const saveNote = () => {
    if (note.trim()) {
      route.params.updateNotes(note); 
      navigation.goBack();            
    }
  };

  return (
     <LinearGradient 
      colors={['#e9f1f5', '#f2f6f7']} 
      start={{ x: 0, y: 0 }} 
      end={{ x: 1, y: 0 }} 
      locations={[0, 1]} 
      style={createNoteStyles.container}
    >

    <View style={createNoteStyles.container}>
      <Text style={createNoteStyles.headerText}>Write Your Note</Text>
      <TextInput
        style={createNoteStyles.input}
        placeholder="Start typing your note..."
        value={note}
        onChangeText={setNote}
        multiline
      />
      
      <TouchableOpacity 
        style={createNoteStyles.createButton} 
        onPress= { saveNote }
      > 
        <LinearGradient 
          colors={['#020463', '#095699']} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 0 }} 
          style={createNoteStyles.gradientButton} 
        >
          <Text style={createNoteStyles.buttonText}>Create</Text>
        </LinearGradient>
      </TouchableOpacity>
     
    </View>

    </LinearGradient>
  );
};

const createNoteStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  headerText: {
    padding: 20,
    fontSize: 24,
    color: '#1368d1',
    fontFamily: 'System',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    backgroundColor:'#e9f1f5',
    height: 650,
    borderColor: '#1368d1',
    borderWidth: 3,
    marginBottom: 10,
    textAlignVertical: 'top',
    color: 'black',
    width: 390,
    fontFamily: 'System',
    fontSize: 15,
    padding: 15,
  
  },
  createButton: {
    borderRadius: 50,
    marginTop: 5,
    width:'40%',
    alignItems: 'center',
  },
  gradientButton: {
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'System',
    fontWeight: 'bold',
    textAlign: 'center',
    },
});

export default NotesWriter;
