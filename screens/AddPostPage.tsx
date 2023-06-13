import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';

interface AddPostPageProps {
  navigation: any;
  onPostAdded: () => void; // Callback function to notify the parent component (ListPostsPage)
}

const AddPostPage = ({ navigation, onPostAdded }: AddPostPageProps) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isAlertVisible, setAlertVisible] = useState(false);

  const handleAddPost = async () => {
    if (!title || !body) {
      setAlertVisible(true);
      return;
    }

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title,
        body,
        userId: 1,
      });
      console.log('New post:', response.data);
      onPostAdded();

      setTitle('');
      setBody('');

      navigation.navigate('ListPosts');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Post</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        multiline
        style={[styles.input, styles.textArea]}
      />
      <Button title="Add Post" onPress={handleAddPost} />

      <Modal isVisible={isAlertVisible} backdropOpacity={0.5}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>Title and body are required</Text>
          <Button title="OK" onPress={() => setAlertVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 8,
  },
  textArea: {
    height: 100,
  },
  alertContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  alertText: {
    fontSize: 18,
    marginBottom: 16,
  },
});

export default AddPostPage;
