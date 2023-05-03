import React, { useRef, useState } from "react";
import { SafeAreaView, View, StatusBar, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const RegisterScreen = ({ navigation }) => {

    const [state, setState] = useState({
        phoneNumber: null,
        securePassword: true,
        email: null,
        userName: null,
        isAgree: true,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        phoneNumber,
        securePassword,
        email,
        userName,
        isAgree,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {backArrow()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {registerTitle()}
                    {usernameTextField()}
                    {emailTextField()}
                    {phoneNumberTextField()}
                    {agreeOrNotInfo()}
                    {signupButton()}
                    {orText()}
                    {socialMediaOptions()}
                </ScrollView>
            </View>
            {alreadyAccountInfo()}
        </SafeAreaView>
    )

    function agreeOrNotInfo() {
        return (
            <View style={styles.agreeOrNotInfoWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ isAgree: !isAgree })}
                    style={{
                        backgroundColor: isAgree ? Colors.primaryColor : 'transparent',
                        borderColor: isAgree ? Colors.primaryColor : Colors.whiteColor,
                        ...styles.checkBoxStyle,
                    }}
                >
                    {
                        isAgree
                            ?
                            <MaterialIcons
                                name="check"
                                color={Colors.whiteColor}
                                size={14}
                            />
                            :
                            null
                    }
                </TouchableOpacity>
                <Text style={{ marginLeft: Sizes.fixPadding + 2.0, }}>
                    <Text style={{ ...Fonts.whiteColor14Medium }}>
                        By creating an account, you agree to our { }
                    </Text>
                    <Text style={{ ...Fonts.primaryColor14Medium }}>
                        Terms and Condition
                    </Text>
                </Text>
            </View>
        )
    }

    function alreadyAccountInfo() {
        return (
            <Text style={{ textAlign: 'center', margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.whiteColor14Medium }}>
                    Already have an account? { }
                </Text>
                <Text
                    onPress={() => navigation.push('Login')}
                    style={{ ...Fonts.primaryColor14Medium }}
                >
                    Login
                </Text>
            </Text>
        )
    }

    function socialMediaOptions() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center', }}>
                <View style={styles.googleAndFacebookButtonWrapStyle}>
                    <Image
                        source={require('../../assets/images/icons/google.png')}
                        style={{ width: 24.0, height: 24.0, resizeMode: 'contain' }}
                    />
                    <Text style={{ ...Fonts.whiteColor14Medium, marginLeft: Sizes.fixPadding + 5.0, }}>
                        Google
                    </Text>
                </View>
                <View style={styles.googleAndFacebookButtonWrapStyle}>
                    <Image
                        source={require('../../assets/images/icons/facebookWithColor.png')}
                        style={{ width: 24.0, height: 24.0, resizeMode: 'contain' }}
                    />
                    <Text style={{ ...Fonts.whiteColor14Medium, marginLeft: Sizes.fixPadding + 5.0, }}>
                        Facebook
                    </Text>
                </View>
            </View>
        )
    }

    function orText() {
        return (
            <Text style={{ textAlign: 'center', ...Fonts.whiteColor14Medium }}>
                OR
            </Text>
        )
    }

    function signupButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Verification')}
                style={styles.signupButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                    Sign Up
                </Text>
            </TouchableOpacity>
        )
    }

    function phoneNumberTextField() {
        const input = useRef();
        return (
            <View style={{ ...styles.textFieldWrapStyle, }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => input.current.focus()}
                >
                    <Image
                        source={require('../../assets/images/icons/phone.png')}
                        style={{ width: 20.0, height: 20.0, resizeMode: 'contain' }}
                    />
                </TouchableOpacity>
                <TextInput
                    ref={input}
                    value={phoneNumber}
                    onChangeText={(value) => updateState({ phoneNumber: value })}
                    placeholder="Enter PhoneNumber"
                    placeholderTextColor={Colors.grayColor}
                    style={{ ...Fonts.whiteColor14Medium, flex: 1, marginLeft: Sizes.fixPadding + 2.0 }}
                    selectionColor={Colors.primaryColor}
                    keyboardType="phone-pad"
                />
            </View>
        )
    }

    function emailTextField() {
        return (
            <View style={{
                ...styles.textFieldWrapStyle,
                marginBottom: Sizes.fixPadding * 2.0,
            }}>
                <MaterialCommunityIcons
                    name="email-outline"
                    color={Colors.whiteColor}
                    size={20}
                />
                <TextInput
                    value={email}
                    onChangeText={(value) => updateState({ email: value })}
                    placeholder="Enter Email"
                    placeholderTextColor={Colors.grayColor}
                    style={{ ...Fonts.whiteColor14Medium, flex: 1, marginLeft: Sizes.fixPadding + 2.0 }}
                    selectionColor={Colors.primaryColor}
                    keyboardType="email-address"
                />
            </View>
        )
    }

    function usernameTextField() {
        return (
            <View style={{
                ...styles.textFieldWrapStyle,
                marginBottom: Sizes.fixPadding * 2.0,
            }}>
                <Image
                    source={require('../../assets/images/icons/user.png')}
                    style={{ width: 20.0, height: 20.0, resizeMode: 'contain', tintColor: Colors.whiteColor }}
                />
                <TextInput
                    value={userName}
                    onChangeText={(value) => updateState({ userName: value })}
                    placeholder="Enter FullName"
                    placeholderTextColor={Colors.grayColor}
                    style={{ ...Fonts.whiteColor14Medium, flex: 1, marginLeft: Sizes.fixPadding + 2.0 }}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    function backArrow() {
        return (
            <View style={{ ...styles.backArrowWrapStyle }}>
                <MaterialIcons
                    name="chevron-left"
                    color={Colors.whiteColor}
                    size={26}
                    onPress={() => navigation.pop()}
                />
            </View>
        )
    }

    function registerTitle() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 2.0, alignItems: 'center', }}>

                <Text style={{ ...Fonts.whiteColor26SemiBold }}>
                    Get Started!
                </Text>
                <Text style={{ ...Fonts.whiteColor14Medium }}>
                    Create an account to continue.
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
        marginTop: Sizes.fixPadding * 3.0,
        marginBottom: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    textFieldWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding + 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    forgetPasswordTextStyle: {
        marginTop: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        textAlign: 'right',
        ...Fonts.primaryColor14Medium
    },
    signupButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Sizes.fixPadding * 4.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    googleAndFacebookButtonWrapStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    checkBoxStyle: {
        width: 18.0,
        height: 18.0,
        borderRadius: Sizes.fixPadding - 8.0,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    agreeOrNotInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default RegisterScreen;
