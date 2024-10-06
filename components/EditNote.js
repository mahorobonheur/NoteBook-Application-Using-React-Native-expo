import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const EditNote = ({ navigation, route }) => {
  const { note, index, editNote } = route.params;
  const [updatedNote, setUpdatedNote] = useState(note);
  const [isHovered, setIsHovered] = useState(false); 

  const saveNote = () => {
    if (updatedNote.trim()) {
      editNote(index, updatedNote); 
      navigation.goBack();         
    }
  };

  return (
    <LinearGradient 
      colors={['#e9f1f5', '#f2f6f7']} 
      start={{ x: 0, y: 0 }} 
      end={{ x: 1, y: 0 }} 
      locations={[0, 1]} 
      style={editNoteStyles.container}
    >
      <View style={editNoteStyles.container}>
        <Text style={editNoteStyles.headerText}>Edit Your Note</Text>
        <TextInput
          style={editNoteStyles.input}
          placeholder="Edit your note..."
          value={updatedNote}
          onChangeText={setUpdatedNote}
          multiline
        />
        <TouchableOpacity 
          style={editNoteStyles.createButton} 
          onPress={saveNote}
          onPressIn={() => setIsHovered(true)}  
          onPressOut={() => setIsHovered(false)} 
        > 
          <LinearGradient 
            colors={isHovered ? ['#990b12', '#4a0d10'] : ['#4a0d10', '#990b12']} 
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 0 }} 
            style={editNoteStyles.gradientButton} 
          >
            <Text style={editNoteStyles.buttonText}>Save Note</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const editNoteStyles = StyleSheet.create({
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
    backgroundColor: '#e9f1f5',
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
    marginTop: 5,
    width: '60%',
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

export default EditNote;
