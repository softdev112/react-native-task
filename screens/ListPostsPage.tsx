import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface ListPostsPageProps {
  navigation: any;
  refresh: boolean;
}

const ListPostsPage = ({ navigation, refresh }: ListPostsPageProps) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, [refresh]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
      console.log('response = ', response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePostPress = (post: Post) => {
    navigation.navigate('ViewPost', { post });
  };

  const renderPostItem = ({ item }: { item: Post }) => (
    <TouchableOpacity onPress={() => handlePostPress(item)}>
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postBody}>{item.body}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderPostItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  postContainer: {
    padding: 16,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postBody: {
    marginTop: 8,
  },
});

export default ListPostsPage;
