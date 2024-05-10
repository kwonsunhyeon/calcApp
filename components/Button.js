import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';

const ButtonTypes = {
  NUMBER: 'NUMBER',
  OPERATOR: 'OPERATOR',
};
const Colors = {
  NUMBER: ['#EAB1C1', '#CC1F4E'],
  OPERATOR: ['#A9ECCA', '#18BC83'],
};
const Button = ({title, buttonStyle, onPress, buttonType, key}) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        {
          backgroundColor: Colors[buttonType][0],
        },
        pressed && {
          backgroundColor: Colors[buttonType][1],
        },
        buttonStyle,
      ]}
      onPressOut={onPress}>
      <Text
        style={[
          styles.text2,
          buttonType === ButtonTypes.OPERATOR && styles.text,
        ]}>
        {title}
      </Text>
    </Pressable>
  );
};

Button.propTypes = {
  key: PropTypes.number,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  buttonStyle: PropTypes.object,
  buttonType: PropTypes.oneOf(Object.values(ButtonTypes)),
};

Button.defaultProps = {
  title: 'Button',
  buttonType: ButtonTypes.NUMBER,
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: 'white',
  },
  text2: {
    fontSize: 40,
    color: 'black',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export {ButtonTypes};
export default Button;
