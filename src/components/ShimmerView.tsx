import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import Shimmer from 'react-native-shimmer';
import colors from '../utils/colors';
import {vw} from '../utils/Dimension';

type Props = {
  style: ViewStyle;
};

const ShimmerView = (props: Props) => {
  return (
    <View style={[props?.style, {overflow: 'hidden'}]}>
      <Shimmer>
        <Text style={styles.mainContainer} />
      </Shimmer>
    </View>
  );
};

export default ShimmerView;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.WHITE,
  },
});
