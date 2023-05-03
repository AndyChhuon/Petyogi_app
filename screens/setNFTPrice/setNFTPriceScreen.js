import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import DashedLine from 'react-native-dashed-line';
import DateTimePickerModal from "@react-native-community/datetimepicker";

const monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Suptember', 'October', 'November', 'December'];

const SetNFTPriceScreen = ({ navigation }) => {

    const dateObj = new Date();
    const todayDate = `${dateObj.getUTCDate()} ${monthsList[dateObj.getUTCMonth()]}, ${dateObj.getUTCFullYear()}`

    const [state, setState] = useState({
        selectedTabIndex: 0,
        price: null,
        startDate: null,
        endDate: null,
        showCalender: false,
        from: null,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        selectedTabIndex,
        price,
        startDate,
        endDate,
        showCalender,
        from,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {fixPriceAndAuctionTab()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {priceInfo()}
                    {receiveAndServiceFeeInfo()}
                    {selectedTabIndex == 1
                        ?
                        auctionDetail()
                        :
                        null
                    }
                </ScrollView>
            </View>
            {publishButton()}
            {calender()}
        </SafeAreaView>
    )

    function calender() {

        const onChange = (e, selectedDate) => {
            {
                from == 'end'
                    ?
                    updateState({ endDate: `${selectedDate.getUTCDate()} ${monthsList[selectedDate.getUTCMonth()]}, ${selectedDate.getUTCFullYear()}`, showCalender: false })
                    :
                    updateState({ startDate: `${selectedDate.getUTCDate()} ${monthsList[selectedDate.getUTCMonth()]}, ${selectedDate.getUTCFullYear()}`, showCalender: false })
            }
        };

        return (
            showCalender && <DateTimePickerModal
                value={new Date()}
                mode="date"
                onChange={onChange}
            />
        )
    }

    function auctionDetail() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <DashedLine
                    dashLength={5}
                    dashColor={'rgba(255,255,255,0.2)'}
                    dashGap={5}
                    style={{ marginVertical: Sizes.fixPadding * 2.0 }}
                />
                {startingDateInfo()}
                {endingDateInfo()}
            </View>
        )
    }

    function endingDateInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.whiteColor14Regular }}>
                    Ending Date
                </Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        updateState({ from: "end", showCalender: true })
                    }}
                    style={styles.dateInfoWrapStyle}
                >
                    <Text style={{ ...Fonts.grayColor12Regular }}>
                        {endDate ? endDate : 'Auction starting date'}
                    </Text>
                    <MaterialCommunityIcons name="calendar-month" size={22} color={Colors.grayColor} />
                </TouchableOpacity>
            </View>
        )
    }

    function startingDateInfo() {
        return (
            <View>
                <Text style={{ ...Fonts.whiteColor14Regular }}>
                    Starting Date
                </Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ from: 'start', showCalender: true })}
                    style={styles.dateInfoWrapStyle}
                >
                    <Text style={{ ...Fonts.grayColor12Regular }}>
                        {startDate ? startDate : 'Auction starting date'}
                    </Text>
                    <MaterialCommunityIcons name="calendar-month" size={22} color={Colors.grayColor} />
                </TouchableOpacity>
            </View>
        )
    }

    function publishButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => { navigation.push('NFTUploadSuccess') }}
                style={styles.publishButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                    Publish
                </Text>
            </TouchableOpacity>
        )
    }

    function receiveAndServiceFeeInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        You will receive
                    </Text>
                    <Text style={{ ...Fonts.whiteColor14SemiBold }}>
                        0.99 ETH
                    </Text>
                </View>
                <View style={{ marginTop: Sizes.fixPadding - 5.0, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Service fee
                    </Text>
                    <Text style={{ ...Fonts.whiteColor14SemiBold }}>
                        0.01 ETH
                    </Text>
                </View>
            </View>
        )
    }

    function priceInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.whiteColor14Regular }}>
                    Enter Price
                </Text>
                <TextInput
                    value={price}
                    onChangeText={(value) => updateState({ price: value })}
                    placeholder="Enter Price"
                    placeholderTextColor={Colors.grayColor}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                    keyboardType="number-pad"
                />
            </View>
        )
    }

    function fixPriceAndAuctionTab() {
        return (
            <View>
                <View style={styles.tabBarWrapStyle}>
                    {tabBarOption({ option: 'Fix Price', index: 0 })}
                    {tabBarOption({ option: 'Auction', index: 1 })}
                </View>
            </View>
        )
    }

    function tabBarOption({ option, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ selectedTabIndex: index })}
                style={{
                    backgroundColor: selectedTabIndex == index ? 'rgba(255,255,255,0.05)' : 'transparent',
                    ...styles.tabOptionWrapStyle,
                }}>
                <Text style={{ ...Fonts.whiteColor16SemiBold }}>
                    {option}
                </Text>
            </TouchableOpacity>
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
                    Set Price
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
    tabOptionWrapStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 5.0,
    },
    tabBarWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    textFieldStyle: {
        marginTop: Sizes.fixPadding,
        ...Fonts.grayColor12Regular,
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    publishButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        margin: Sizes.fixPadding * 2.0,
    },
    dateInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 8.0,
        borderRadius: Sizes.fixPadding - 5.0,
    }
});

export default SetNFTPriceScreen;
