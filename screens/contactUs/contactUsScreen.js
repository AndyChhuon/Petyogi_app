import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const ContactUsScreen = ({ navigation }) => {

    const [state, setState] = useState({
        fullName: null,
        email: null,
        message: null,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        fullName,
        email,
        message,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {fullNameInfo()}
                    {emailAddressInfo()}
                    {messageInfo()}
                </ScrollView>
            </View>
            {sendButton()}
        </SafeAreaView>
    )

    function sendButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.sendButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                    Send
                </Text>
            </TouchableOpacity>
        )
    }

    function messageInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.whiteColor14Medium }}>
                    Message
                </Text>
                <TextInput
                    placeholder="Write  here"
                    placeholderTextColor={Colors.grayColor}
                    value={message}
                    onChangeText={(value) => updateState({ message: value })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                    multiline
                    numberOfLines={5}
                    textAlignVertical="top"
                />
            </View>
        )
    }

    function emailAddressInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.whiteColor14Medium }}>
                    Email Address
                </Text>
                <TextInput
                    placeholder="Enter your email address"
                    placeholderTextColor={Colors.grayColor}
                    value={email}
                    onChangeText={(value) => updateState({ email: value })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                    keyboardType="email-address"
                />
            </View>
        )
    }

    function fullNameInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.whiteColor14Medium }}>
                    Full Name
                </Text>
                <TextInput
                    placeholder="Enter your full name"
                    placeholderTextColor={Colors.grayColor}
                    value={fullName}
                    onChangeText={(value) => updateState({ fullName: value })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                />
            </View>
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
                    Contact Us
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
    textFieldStyle: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding + 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        ...Fonts.whiteColor14Medium,
        marginTop: Sizes.fixPadding + 3.0,
    },
    sendButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        margin: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
    }
});

export default ContactUsScreen;
