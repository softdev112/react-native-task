import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListPostsPage from './screens/ListPostsPage';
import ViewPostPage from './screens/ViewPostPage';
import AddPostPage from './screens/AddPostPage';
import AddPostButton from './screens/components/AddPostButton';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListPosts">
        <Stack.Screen name="ListPosts" component={ListPostsPage} 
          options={({ navigation }) => ({
            title: 'List of Posts',
            headerRight: () => (
              <AddPostButton onPress={() => navigation.navigate('AddPost')} />
            ),
          })}
        />
        <Stack.Screen name="ViewPost" component={ViewPostPage} />
        <Stack.Screen name="AddPost" component={AddPostPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
