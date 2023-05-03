import React, { useCallback } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, Dimensions, Image, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

const NFTUploadSuccessScreen = ({ navigation }) => {
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
                <Text style={{ textAlign: 'center', marginTop: Sizes.fixPadding * 2.0, ...Fonts.whiteColor22SemiBold }}>
                    Publish Successfully!
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, textAlign: 'center', ...Fonts.grayColor14Regular }}>
                    {`You have successfully listed a NFT for sale.\nYou can see it in your profile`}
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding + 5.0, textAlign: 'center', ...Fonts.grayColor14Regular }}>
                    Your NFT Link:
                </Text>
                <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                    <Text numberOfLines={1} style={{ flex: 0.5, ...Fonts.whiteColor14Medium }}>
                        https://nft.io/0xd010d263ax48ax45ghs76erd87
                    </Text>
                    <MaterialIcons name="content-copy" size={16} color={Colors.whiteColor}
                        style={{ marginLeft: Sizes.fixPadding - 5.0 }}
                    />
                </View>
            </View>
        )
    }
}

export default NFTUploadSuccessScreen;
