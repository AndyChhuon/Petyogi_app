import React, { useCallback } from "react";
import { SafeAreaView, View, StatusBar, Dimensions, Image, Text, BackHandler } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

const PlaceBidSuccessScreen = ({ navigation }) => {

    const backAction = () => {
        navigation.push('BottomTabBar');
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {successInfo()}
            </View>
            {backToHomeText()}
        </SafeAreaView>
    )

    function backToHomeText() {
        return (
            <Text
                onPress={() => navigation.push('BottomTabBar')}
                style={{ margin: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.primaryColor14Bold }}
            >
                BACK TO HOME
            </Text>
        )
    }

    function successInfo() {
        return (
            <View>
                <Image
                    source={require('../../assets/images/icons/success.png')}
                    style={{ width: width - 40.0, height: height / 4.5, resizeMode: 'contain', }}
                />
                <Text style={{ marginTop: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.whiteColor22SemiBold }}>
                    Place Bid Success!
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding, textAlign: 'center', ...Fonts.grayColor14Regular }}>
                    {`You have successfully bid on the item\nand it will be on the list`}
                </Text>
            </View>
        )
    }
}

export default PlaceBidSuccessScreen;
