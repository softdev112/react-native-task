import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
}

const ListPostsPage = ({ navigation }: { navigation: any }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostPress = (post: Post) => {
    navigation.navigate('ViewPost', { post });
  };

  const renderPostItem = ({ item }: { item: Post }) => (
    <TouchableOpacity onPress={() => handlePostPress(item)}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
        <Text style={{ marginTop: 8 }}>{item.body}</Text>
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

export default ListPostsPage;
