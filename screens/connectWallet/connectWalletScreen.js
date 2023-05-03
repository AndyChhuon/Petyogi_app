import React, { } from "react";
import { SafeAreaView, View, StatusBar, Dimensions, ScrollView, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const ConnectWalletScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView>
                    {walletImage()}
                    {walletOptions()}
                </ScrollView>
            </View>
            {continueButton()}
        </SafeAreaView>
    )

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('PlaceBidSuccess')}
                style={styles.continueButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    function walletOptions() {
        return (
            <View>
                {walletOptionSort({ optionIcon: require('../../assets/images/icons/metaMask.png'), optionName: 'Metamask' })}
                {walletOptionSort({ optionIcon: require('../../assets/images/icons/coin.png'), optionName: 'Coinbase' })}
                {walletOptionSort({ optionIcon: require('../../assets/images/icons/rainbow.png'), optionName: 'Rainbow' })}
                {walletOptionSort({ optionIcon: require('../../assets/images/icons/other.png'), optionName: 'Others' })}
            </View>
        )
    }

    function walletOptionSort({ optionIcon, optionName }) {
        return (
            <View style={styles.walletOptionWrapStyle}>
                <Image
                    source={optionIcon}
                    style={{ width: 36.0, height: 36.0, resizeMode: 'contain' }}
                />
                <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.whiteColor18Medium }}>
                    {optionName}
                </Text>
            </View>
        )
    }

    function walletImage() {
        return (
            <Image
                source={require('../../assets/images/wallet.png')}
                style={styles.walletImageStyle}
            />
        )
    }

    function header() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center', }}>
                <View style={styles.backArrowWrapStyle}>
                    <MaterialIcons
                        name="chevron-left"
                        color={Colors.whiteColor}
                        size={26}
                        onPress={() => navigation.pop()}
                    />
                </View>
                <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding * 2.0, flex: 1, ...Fonts.whiteColor22Bold }}>
                    Connect Wallet
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backArrowWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        backgroundColor: 'rgba(255,255,255,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    walletOptionWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    walletImageStyle: {
        width: '100%',
        height: height / 3.0,
        resizeMode: 'contain',
        marginBottom: Sizes.fixPadding + 5.0,
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        margin: Sizes.fixPadding * 2.0,
    }
});

export default ConnectWalletScreen;
