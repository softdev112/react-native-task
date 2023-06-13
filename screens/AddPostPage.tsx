import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const AddPostPage = ({ navigation }: { navigation: any }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleAddPost = async () => {
    if (!title || !body) {
      alert('Title and body are required');
      return;
    }

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title,
        body,
        userId: 1,
      });
      console.log('New post:', response.data);

      setTitle('');
      setBody('');

      navigation.navigate('ListPosts');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Add Post</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={{ marginBottom: 8 }}
      />
      <TextInput
        placeholder="Body"
        value={body}
        onChangeText={(text) => setBody(text)}
        multiline
        style={{ marginBottom: 16, height: 100 }}
      />
      <Button title="Add Post" onPress={handleAddPost} />
    </View>
  );
};

export default AddPostPage;
function alert(arg0: string) {
    throw new Error('Function not implemented.');
}

