import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, TouchableOpacity, Dimensions, ScrollView, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";

const { width } = Dimensions.get('window');

const SettingScreen = ({ navigation }) => {

    const [state, setState] = useState({
        showLogoutDialog: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { showLogoutDialog } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0, }}
                >
                    {profileInfo()}
                    {divider()}
                    {profileOptions()}
                </ScrollView>
            </View>
            {logoutDialog()}
        </SafeAreaView>
    )

    function logoutDialog() {
        return (
            <Dialog.Container
                visible={showLogoutDialog}
                contentStyle={styles.dialogWrapStyle}
                headerStyle={{ margin: 0.0, padding: 0.0, }}
            >
                <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                    <Text style={{ lineHeight: 17.0, ...Fonts.whiteColor16SemiBold, }}>
                        Are you sure you want logout?
                    </Text>
                    <View style={styles.cancelAndLogoutButtonWrapStyle}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => updateState({ showLogoutDialog: false })}
                            style={styles.cancelAndLogoutButtonStyle}
                        >
                            <Text style={{ ...Fonts.primaryColor14Medium }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => {
                                updateState({ showLogoutDialog: false })
                                navigation.push('Login')
                            }}
                            style={{
                                marginLeft: Sizes.fixPadding * 2.0,
                                backgroundColor: Colors.primaryColor,
                                ...styles.cancelAndLogoutButtonStyle,
                            }}
                        >
                            <Text style={{ ...Fonts.whiteColor14Medium }}>
                                Yes, Logout
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        );
    }

    function profileOptions() {
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push('Wallet')}
                >
                    {profileOptionSort({ option: 'My Wallet', optionIcon: require('../../assets/images/icons/wallet.png') })}
                </TouchableOpacity>
                {divider()}
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('Notification')}
                >
                    {profileOptionSort({ option: 'Notifications', optionIcon: require('../../assets/images/icons/notification.png') })}
                </TouchableOpacity>
                {divider()}
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push('Faqs')}
                >
                    {profileOptionSort({ option: 'FAQs', optionIcon: require('../../assets/images/icons/question.png') })}
                </TouchableOpacity>
                {divider()}
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push('ContactUs')}
                >
                    {profileOptionSort({ option: 'Contact Us', optionIcon: require('../../assets/images/icons/contact.png') })}
                </TouchableOpacity>
                {divider()}
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push('TermsAndConditions')}
                >
                    {profileOptionSort({ option: 'Terms & Conditions', optionIcon: require('../../assets/images/icons/conditions.png') })}
                </TouchableOpacity>
                {divider()}
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => updateState({ showLogoutDialog: true })}
                >
                    {profileOptionSort({ option: 'Logout', optionIcon: require('../../assets/images/icons/logout.png') })}
                </TouchableOpacity>
            </View>
        )
    }

    function profileOptionSort({ option, optionIcon }) {
        return (
            <View style={styles.profileOptionsWrapStyle} >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.optionIconWrapStyle}>
                        <Image
                            source={optionIcon}
                            style={{ width: 24.0, height: 24.0, resizeMode: 'contain', tintColor: Colors.primaryColor }}
                        />
                    </View>
                    <Text style={{ marginLeft: Sizes.fixPadding * 2.0, ...Fonts.whiteColor16Medium }}>
                        {option}
                    </Text>
                </View>
                <MaterialIcons
                    name="chevron-right"
                    color={Colors.primaryColor}
                    size={25}
                />
            </View>
        )
    }

    function divider() {
        return (
            <View style={{
                height: 1.0,
                backgroundColor: 'rgba(255,255,255,0.1)',
                margin: Sizes.fixPadding * 2.0
            }} />
        )
    }

    function profileInfo() {
        return (
            <View style={styles.profileInfoWrapStyle}>
                <View>
                    <Image
                        source={require('../../assets/images/users/user1.png')}
                        style={{ width: 80.0, height: 80.0, borderRadius: 40.0, }}
                    />
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => navigation.push('EditProfile')}
                        style={styles.editIconWrapStyle}
                    >
                        <MaterialIcons name="edit" size={15} color={Colors.whiteColor} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, }}>
                    <Text style={{ ...Fonts.whiteColor18SemiBold }}>
                        Joseph Reese
                    </Text>
                    <Text style={{ lineHeight: 15.0, ...Fonts.grayColor14Regular }}>
                        @reesejoseph
                    </Text>
                </View>
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
                    Settings
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
    editIconWrapStyle: {
        backgroundColor: Colors.primaryColor,
        width: 26.0,
        height: 26.0,
        borderRadius: 13.0,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0.0,
        right: 0.0,
    },
    profileInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
    },
    profileOptionsWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    optionIconWrapStyle: {
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
        backgroundColor: 'rgba(140, 49, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dialogWrapStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        width: width - 40,
        padding: 0.0,
        backgroundColor: Colors.bodyBackColor,
    },
    cancelAndLogoutButtonStyle: {
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        paddingVertical: Sizes.fixPadding - 4.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    cancelAndLogoutButtonWrapStyle: {
        marginTop: Sizes.fixPadding * 3.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
});

export default SettingScreen;
