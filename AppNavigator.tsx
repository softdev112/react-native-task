import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListPostsPage from './screens/ListPostsPage';
import ViewPostPage from './screens/ViewPostPage';
import AddPostPage from './screens/AddPostPage';
import AddPostButton from './screens/components/AddPostButton';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [refresh, setRefresh] = useState(false);

  const handlePostAdded = () => {
    setRefresh((prevState) => !prevState);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListPosts">
        <Stack.Screen name="ListPosts" options={({ navigation }) => ({
            title: 'List of Posts',
            headerRight: () => (
              <AddPostButton onPress={() => navigation.navigate('AddPost')} />
            ),
          })}
          >
            {(props) => <ListPostsPage {...props} refresh={refresh} />}
          </Stack.Screen>
        <Stack.Screen name="ViewPost" component={ViewPostPage} />
        <Stack.Screen name="AddPost">
          {(props) => <AddPostPage {...props} onPostAdded={handlePostAdded} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
