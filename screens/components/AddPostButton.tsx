import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type AddPostButtonProps = {
  onPress: () => void;
};

const AddPostButton: React.FC<AddPostButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Add Post</Text>
    </TouchableOpacity>
  );
};

export default AddPostButton;
