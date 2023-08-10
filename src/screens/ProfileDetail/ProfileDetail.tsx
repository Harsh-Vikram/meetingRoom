//Library imports
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';

//Component imports
import SlotCard from '../../components/SlotCard';
import Button from '../../components/Button';

//Util imports
import colors from '../../utils/colors';
import { normalize, screenWidth, vh, vw } from '../../utils/Dimension';
import { SlotDataType } from '../../utils/types';
import { IMAGES } from '../../utils/images';
import screenNames from '../../utils/screenNames';
import Home from '../Home';
import InputWithLabel from '../../components/InputWithLabel';

type Props = {};

const ProfileDetail = (props: Props) => {
    const [selectedSlot, setSelectedSlot] = useState<string>('');


    return (
        <View style={styles.mainContainer}>
            <Image source={IMAGES.MAN} style={styles.image}/>
            <Image source={IMAGES.EDIT} style={styles.icon}/>
            <InputWithLabel mainContainerStyle={styles.textView} value='Full Name' onChangeText={()=>{}}/>
            <InputWithLabel mainContainerStyle={styles.textView} value='Phone Number' onChangeText={()=>{}}/>
            <InputWithLabel mainContainerStyle={styles.textView} value='Email' onChangeText={()=>{}}/>
        </View>
    );
};

export default ProfileDetail;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.PRIMARY_BG,
        padding:10
    },
    heading: {
        fontSize: normalize(22),
        color: colors.PRIMARY_TEXT,
        fontWeight: 'bold',
        letterSpacing: vw(1),
    },
    flatListStyle: {
        backgroundColor: colors.PRIMARY_BG,
    },
    imageView: {
        height: '100%',
    },
    image: {
        width:'60%',
        height:'35%',
        resizeMode:'center',
        alignSelf:'center'
    },
    topView: {
        flex: 1,
        backgroundColor: colors.WHITE,
        borderTopRightRadius: vw(50),
        borderTopLeftRadius: vw(50),
    },
    textView: {
        marginTop: vw(20)
    },
    buttonView: {
        right: vw(20),
        position: 'absolute',
        bottom: vh(20),
        width: '50%',
        alignSelf: 'flex-end',
    },
    textTitle: {
        fontSize: normalize(40),
        width: '60%',
        fontWeight: 'bold',
        color: colors.BLUE
    },
    icon: {
      bottom:60,
      left:50,
      height:vh(50),
      width:vw(50),
      resizeMode:'center',
      alignSelf:'center',
      zIndex:10
    }
});
