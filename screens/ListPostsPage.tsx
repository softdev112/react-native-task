import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
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
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [refresh]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePostPress = (post: Post) => {
    navigation.navigate('ViewPost', { post });
  };

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery) {
      setSearchQuery('');
      setFilteredPosts([]);

      return;
    }
    setSearchQuery(searchQuery);
    // Filter the posts based on the search query
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filteredPosts);
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
    <View>
      <TextInput
        placeholder="Search"
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />
      <FlatList
        data={searchQuery === null || searchQuery === '' ? posts: filteredPosts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
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
