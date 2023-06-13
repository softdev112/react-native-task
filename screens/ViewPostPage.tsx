import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
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
      <View style={styles.container}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.body}>{post.body}</Text>
        <Text style={styles.commentsTitle}>Comments:</Text>
        {comments.map((comment) => (
          <View key={comment.id} style={styles.commentContainer}>
            <Text style={styles.commentName}>{comment.name}</Text>
            <Text style={styles.commentBody}>{comment.body}</Text>
          </View>
        ))}
        <Button title="Return to List" onPress={handleReturnButtonPress} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    marginTop: 8,
  },
  commentsTitle: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentContainer: {
    marginTop: 8,
  },
  commentName: {
    fontWeight: 'bold',
  },
  commentBody: {},
});

export default ViewPostPage;
