import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type AddPostButtonProps = {
  onPress: () => void;
};

const AddPostButton: React.FC<AddPostButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.button}>Add Post</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'relative',
    right: 10,
    fontWeight: 'bold'
  },    
});
  
export default AddPostButton;
