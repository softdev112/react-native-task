import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import axios from 'axios';

interface Comment {
  id: number;
  name: string;
  body: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

const ViewPostPage = ({ navigation, route }: { navigation: any; route: any }) => {
  const { post }: { post: Post } = route.params;
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
        );
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [post]);

  const handleReturnButtonPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{post.title}</Text>
        <Text style={{ marginTop: 8 }}>{post.body}</Text>
        <Text style={{ marginTop: 16, fontSize: 16, fontWeight: 'bold' }}>Comments:</Text>
        {comments.map((comment) => (
          <View key={comment.id} style={{ marginTop: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>{comment.name}</Text>
            <Text>{comment.body}</Text>
          </View>
        ))}
        <Button title="Return to List" onPress={handleReturnButtonPress} />
      </View>
    </ScrollView>
  );
};

export default ViewPostPage;
