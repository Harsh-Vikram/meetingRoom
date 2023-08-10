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

type Props = {};

const LandingPage = (props: Props) => {
    const [selectedSlot, setSelectedSlot] = useState<string>('');


    const onPressGetStarted = () => {
        props.navigation.replace(screenNames.HOME);
     };


    return (
        <View style={styles.mainContainer}>
            <Image style={styles.image} source={IMAGES.LANDING_PAGE} />
            <View style={styles.topView}>
                <View style={styles.textView}>
                    <Text style={styles.textTitle}>Hello Everyone !</Text>
                    <Text style={styles.descriptionText}>Let's upgrade your meeting experience </Text>
                </View>
                <View style={styles.buttonView}>
                    <Button title='Get Started' onPress={onPressGetStarted} />
                </View>
            </View>
        </View>
    );
};

export default LandingPage;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.PRIMARY_BG,
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
        flex: 1,
        width: screenWidth,
        marginBottom: -vw(50),
        resizeMode: 'stretch'
    },
    topView: {
        flex: 1,
        backgroundColor: colors.WHITE,
        borderTopRightRadius: vw(50),
        borderTopLeftRadius: vw(50),
    },
    textView: {
        padding: vw(20)
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
    descriptionText: {
        fontSize: normalize(20),
        marginVertical: 20
    }
});
