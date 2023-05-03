import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, TouchableOpacity, Image, StyleSheet, Text, TextInput } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, Entypo, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { BottomSheet } from '@rneui/themed';

const EditProfileScreen = ({ navigation }) => {

    const [state, setState] = useState({
        name: 'Joseph Reese',
        userName: '@reesejoseph',
        email: 'josephreese@gmail.com',
        phoneNumber: '+(444) 489-7896',
        showBottomSheet: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        name,
        userName,
        email,
        phoneNumber,
        showBottomSheet,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {profilePicWithChangeOption()}
                    {fullNameInfo()}
                    {userNameInfo()}
                    {emailAddressInfo()}
                    {phoneNumberInfo()}
                </ScrollView>
            </View>
            {updateButton()}
            {changeProfilePicOptionsSheet()}
        </SafeAreaView>
    )

    function changeProfilePicOptionsSheet() {
        return (
            <BottomSheet
                isVisible={showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => updateState({ showBottomSheet: false })}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ showBottomSheet: false })}
                    style={styles.changeProfilePicBottomSheetStyle}
                >
                    <Text style={{ textAlign: 'center', ...Fonts.whiteColor20SemiBold }}>
                        Choose Option
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding + 10.0, marginBottom: Sizes.fixPadding }}>
                        {changeProfilePicOptionsSort({
                            bgColor: '#009688',
                            icon: <Entypo name="camera" size={18} color={Colors.whiteColor} />,
                            option: 'Camera'
                        })}
                        {changeProfilePicOptionsSort({
                            bgColor: '#00A7F7',
                            icon: <MaterialCommunityIcons name="image" size={20} color={Colors.whiteColor} />,
                            option: 'Gallery'
                        })}
                        {changeProfilePicOptionsSort({
                            bgColor: '#DD5A5A',
                            icon: <Feather name="trash-2" size={20} color={Colors.whiteColor} />,
                            option: `Remove photo`
                        })}
                    </View>
                </TouchableOpacity>
            </BottomSheet>
        )
    }

    function changeProfilePicOptionsSort({ bgColor, icon, option }) {
        return (
            <View style={{
                flexDirection: 'row', alignItems: 'center', marginBottom: Sizes.fixPadding * 2.0,
            }}>
                < View style={{
                    ...styles.changeProfilePicOptionsIconWrapStyle,
                    backgroundColor: bgColor,
                }
                }>
                    {icon}
                </View >
                <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.whiteColor14Medium }}>
                    {option}
                </Text>
            </View >
        )
    }

    function updateButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.updateButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                    Update
                </Text>
            </TouchableOpacity>
        )
    }

    function phoneNumberInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor12Regular }}>
                    Phone Number
                </Text>
                <TextInput
                    value={phoneNumber}
                    onChangeText={(value) => updateState({ phoneNumber: value })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                    keyboardType="phone-pad"
                />
            </View>
        )
    }

    function emailAddressInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor12Regular }}>
                    Email Address
                </Text>
                <TextInput
                    value={email}
                    onChangeText={(value) => updateState({ email: value })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                    keyboardType="email-address"
                />
            </View>
        )
    }

    function userNameInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor12Regular }}>
                    Username
                </Text>
                <TextInput
                    value={userName}
                    onChangeText={(value) => updateState({ userName: value })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    function fullNameInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor12Regular }}>
                    Full Name
                </Text>
                <TextInput
                    value={name}
                    onChangeText={(value) => updateState({ name: value })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    function profilePicWithChangeOption() {
        return (
            <View style={styles.profilePicWithChangeOptionWrapStyle}>
                <Image
                    source={require('../../assets/images/users/user1.png')}
                    style={{ width: 100.0, height: 100.0, borderRadius: 50.0, }}
                />
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ showBottomSheet: true })}
                    style={styles.cameraIconWrapStyle}
                >
                    <MaterialIcons name="photo-camera" size={15} color={Colors.whiteColor} />
                </TouchableOpacity>
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
                    Edit Profile
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
    cameraIconWrapStyle: {
        backgroundColor: Colors.primaryColor,
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0.0,
        right: 0.0,
    },
    profilePicWithChangeOptionWrapStyle: {
        marginBottom: Sizes.fixPadding * 3.0,
        marginTop: Sizes.fixPadding,
        alignItems: 'center',
        alignSelf: 'center'
    },
    textFieldStyle: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding + 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        ...Fonts.whiteColor14Medium,
        marginTop: Sizes.fixPadding + 3.0,
    },
    updateButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        margin: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    changeProfilePicBottomSheetStyle: {
        backgroundColor: Colors.bodyBackColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding + 10.0,
        borderTopLeftRadius: Sizes.fixPadding * 3.0,
        borderTopRightRadius: Sizes.fixPadding * 3.0,
    },
    changeProfilePicOptionsIconWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default EditProfileScreen;
