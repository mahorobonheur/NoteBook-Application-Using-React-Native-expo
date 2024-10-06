import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import NotesHeader from './Header';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient'; 

const HomeScreen = ({ navigation, route }) => {
  const [notes, setNotes] = useState(route.params?.notes || []);

  const updateNotes = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const editNote = (index, updatedNote) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = updatedNote;
    setNotes(updatedNotes);
  };

  const [deletedNotes, setDeletedNotes] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const deleteNote = (index) => {
    const noteToDelete = notes[index];
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);

    setDeletedNotes([...deletedNotes, { note: noteToDelete, index }]);
    setRedoStack([]);
  };

  const undoDelete = () => {
    if (deletedNotes.length > 0) {
      const lastDeleted = deletedNotes.pop();
      const updatedNotes = [...notes];
      updatedNotes.splice(lastDeleted.index, 0, lastDeleted.note); 
      setNotes(updatedNotes);

      setRedoStack([lastDeleted, ...redoStack]);
      setDeletedNotes([...deletedNotes]);
    }
  };

  const redoDelete = () => {
    if (redoStack.length > 0) {
      const lastRestored = redoStack.shift();
      const updatedNotes = [...notes];
      updatedNotes.splice(lastRestored.index, 1);
      setNotes(updatedNotes);

      setDeletedNotes([...deletedNotes, lastRestored]); 
      setRedoStack([...redoStack]); 
    }
  };

  const renderHeader = () => (
    <View>
      <TouchableOpacity
        style={appStyles.createButton}
        onPress={() => navigation.navigate('WriteNote', { updateNotes })}
      >
        <LinearGradient
          colors={['#020463', '#095699']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={appStyles.gradientButton}
        >
          <Text style={appStyles.buttonText}>Create</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View style={appStyles.iconContainer}>
         <TouchableOpacity onPress={undoDelete} disabled={deletedNotes.length === 0}>
          <MaterialIcons
            name="undo"
            size={30}
            color={deletedNotes.length === 0 ? 'gray' : '#1368d1'}
          />
        </TouchableOpacity>
        <Text style={appStyles.iconText}>Undo</Text>

        <TouchableOpacity onPress={redoDelete} disabled={redoStack.length === 0}>
          <MaterialIcons
            name="redo"
            size={30}
            color={redoStack.length === 0 ? 'gray' : '#1368d1'}
          />
        </TouchableOpacity>
        <Text style={appStyles.iconText}>  Redo  </Text>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#e9f1f5', '#f2f6f7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      locations={[0, 1]}
      style={appStyles.container}
    >
      <NotesHeader />

      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={appStyles.card}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditNote', { note: item, index, editNote });
              }}
              style={appStyles.noteContainer}
            >
              <LinearGradient
                colors={['#b9babd', '#c7ebe5']}
                locations={[0, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={appStyles.gradientCard}
              >
                <Text
                  style={appStyles.noteText}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {item.length > 60 ? `${item.substring(0, 60)}...` : item}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteNote(index)} style={appStyles.deleteButton}>
              <Icon name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
        columnWrapperStyle={appStyles.columnWrapper}
        ListHeaderComponent={renderHeader}
      />
    </LinearGradient>
  );
};

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  createButton: {
    borderRadius: 50,
    marginTop: 20,
    alignItems: 'center',
  },
  gradientButton: {
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    width: 200,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    borderRadius: 10,
    padding: 0,
    margin: 10,
    width: '45%',
    height: 200,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradientCard: {
    flex: 1,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
  },
  noteContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  noteText: {
    fontSize: 16,
    color: 'black',
  },
  deleteButton: {
    paddingLeft: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'baseline',
    paddingVertical: 20,
    width: '100%',
  },
  iconText: {
    color: '#1368d1',
    fontSize: 15,
    fontFamily: 'System',
  },
});


export default HomeScreen;
