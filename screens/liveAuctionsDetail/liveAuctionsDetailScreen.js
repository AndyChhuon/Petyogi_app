import React, { useState, useRef } from "react";
import { SafeAreaView, View, Image, Dimensions, TextInput, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import BottomSheet from 'react-native-simple-bottom-sheet';
import { BottomSheet as SimpleBottomSheet } from "@rneui/themed";
import Dialog from "react-native-dialog";
import DashedLine from 'react-native-dashed-line';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';

const { width, height } = Dimensions.get('window');

const historyOfBidList = [
    {
        id: '1',
        userImage: require('../../assets/images/users/user2.png'),
        userName: 'Crypto Penks',
        date: 'Feb 21, 2021',
        time: '03:05 pm',
        coinValue: '29.005 ETH',
    },
    {
        id: '2',
        userImage: require('../../assets/images/users/user3.png'),
        userName: 'Azuka',
        date: 'Jan 1, 2021',
        time: '01:49 pm',
        coinValue: '28.002 ETH',
    },
    {
        id: '3',
        userImage: require('../../assets/images/users/user4.png'),
        userName: 'Moroson',
        date: 'Aug 18, 2021',
        time: '04:12 pm',
        coinValue: '28.008 ETH',
    },
    {
        id: '4',
        userImage: require('../../assets/images/users/user5.png'),
        userName: 'Mary Akinyi',
        date: 'Aug 18, 2021',
        time: '04:12 pm',
        coinValue: '27.005 ETH',
    },
    {
        id: '5',
        userImage: require('../../assets/images/users/user6.png'),
        userName: 'Jane Wawuda',
        date: 'Mar 13, 2021',
        time: '08:05 am',
        coinValue: '27.009 ETH',
    },
];

const collectionCategoryList = [
    {
        id: '1',
        categoryImage: require('../../assets/images/collectionCategory/category1.png'),
        category: 'Arts',
    },
    {
        id: '2',
        categoryImage: require('../../assets/images/collectionCategory/category2.png'),
        category: '3D',
    },
    {
        id: '3',
        categoryImage: require('../../assets/images/collectionCategory/category3.png'),
        category: 'Music',
    },
    {
        id: '4',
        categoryImage: require('../../assets/images/collectionCategory/category4.png'),
        category: 'Landscapes',
    },
];

const LiveAuctionsDetailScreen = ({ navigation, route }) => {

    const item = route.params.item;

    const [state, setState] = useState({
        showSavePopup: false,
        showCreateCollectionDialog: false,
        agreeWithTermsOfService: true,
        collectionName: null,
        ethValue: 1,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        showSavePopup,
        showCreateCollectionDialog,
        agreeWithTermsOfService,
        collectionName,
        ethValue,
    } = state;

    const panelRef = useRef(null);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {auctionImage()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {auctionInfo()}
                            {historyOfBidInfo()}
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                />
                {placeABidButton()}
            </View>
            {createCollectionDialog()}
            {savePopUp()}
            {placeBidBottomSheet()}
        </SafeAreaView>
    )

    function placeBidBottomSheet() {
        return (
            <BottomSheet
                ref={ref => panelRef.current = ref}
                isOpen={false}
                sliderMinHeight={0}
                sliderMaxHeight={Dimensions.get('window').height - 100}
                lineContainerStyle={{ width: 0.0, height: 0.0, }}
                lineStyle={{ width: 0.0, height: 0.0, }}
                wrapperStyle={styles.bottomSheetWrapStyle}
                innerContentStyle={{ borderRadius: 0.0, }}
            >
                <Text style={{ textAlign: 'center', ...Fonts.whiteColor20Bold }}>
                    Place a Bid
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding + 5.0 }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        You are about to place a bid for { }
                    </Text>
                    <Text style={{ ...Fonts.whiteColor14SemiBold }}>
                        3D CUBE
                    </Text>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        { } by { }
                    </Text>
                    <Text style={{ ...Fonts.whiteColor14SemiBold }}>
                        @cryptopenks
                    </Text>
                </Text>
                <View style={styles.coinInfoWrapStyle}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => { ethValue > 1 ? updateState({ ethValue: ethValue - 1 }) : null }}
                        style={styles.addRemoveIconWrapStyle}
                    >
                        <MaterialIcons
                            name="remove"
                            color={Colors.whiteColor}
                            size={24.0}
                        />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/images/icons/eth.png')}
                            style={{ width: 20.0, height: 30.0, resizeMode: 'contain', tintColor: Colors.primaryColor }}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.primaryColor22SemiBold }}>
                            {ethValue} ETH
                        </Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ ethValue: ethValue + 1 })}
                        style={styles.addRemoveIconWrapStyle}
                    >
                        <MaterialIcons
                            name="add"
                            color={Colors.whiteColor}
                            size={24.0}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={{ textAlign: 'center', ...Fonts.whiteColor16SemiBold }}>
                    Balance: 29.005 ETH
                </Text>
                <DashedLine
                    dashLength={5}
                    dashColor={'rgba(255,255,255,0.2)'}
                    dashGap={5}
                    style={{ marginVertical: Sizes.fixPadding * 2.0 }}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        You will pay
                    </Text>
                    <Text style={{ ...Fonts.whiteColor14SemiBold }}>
                        1.2 ETH
                    </Text>
                </View>
                <View style={{ marginVertical: Sizes.fixPadding - 6.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Service fee
                    </Text>
                    <Text style={{ ...Fonts.whiteColor14SemiBold }}>
                        0.012 ETH
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Total payment
                    </Text>
                    <Text style={{ ...Fonts.primaryColor14SemiBold }}>
                        1.212 ETH
                    </Text>
                </View>
                <View style={{ marginTop: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ agreeWithTermsOfService: !agreeWithTermsOfService })}
                        style={{
                            ...styles.checkBoxStyle,
                            backgroundColor: agreeWithTermsOfService ? Colors.primaryColor : Colors.bodyBackColor,
                            borderColor: agreeWithTermsOfService ? Colors.primaryColor : Colors.whiteColor,
                        }}
                    >
                        {
                            agreeWithTermsOfService
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
                    <Text style={{ flex: 1, marginLeft: Sizes.fixPadding - 5.0, ...Fonts.whiteColor12Medium }}>
                        By checking this box, I agree to NFT’s Terms of Service
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        panelRef.current.togglePanel()
                        navigation.push('ConnectWallet')
                    }}
                    style={styles.placeBidButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                        Place a Bid
                    </Text>
                </TouchableOpacity>
            </BottomSheet>
        )
    }

    function createCollectionDialog() {
        return (
            <Dialog.Container
                visible={showCreateCollectionDialog}
                contentStyle={styles.dialogWrapStyle}
                headerStyle={{ margin: 0.0 }}
                onRequestClose={() => { updateState({ showCreateCollectionDialog: false }) }}
            >
                <View style={styles.dialogContentWrapStyle}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ flex: 1, ...Fonts.whiteColor18SemiBold }}>
                            Give a name to your collection
                        </Text>
                        <MaterialIcons
                            name="close"
                            color={Colors.whiteColor}
                            size={22}
                            onPress={() => updateState({ showCreateCollectionDialog: false })}
                        />
                    </View>
                    <TextInput
                        placeholder="Enter collection name"
                        placeholderTextColor={Colors.grayColor}
                        value={collectionName}
                        onChangeText={(value) => updateState({ collectionName: value })}
                        style={styles.collectionNameFieldStyle}
                        selectionColor={Colors.primaryColor}
                    />
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ showCreateCollectionDialog: false })}
                        style={styles.createCollectionButtonStyle}
                    >
                        <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                            Create Collection
                        </Text>
                    </TouchableOpacity>
                </View>
            </Dialog.Container>
        );
    }

    function savePopUp() {
        return (
            <SimpleBottomSheet
                isVisible={showSavePopup}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                modalProps={{ onRequestClose: () => { updateState({ showSavePopup: false }) }, }}
            >
                <View style={{ paddingBottom: Sizes.fixPadding * 2.0, ...styles.bottomSheetWrapStyle }}>
                    <Text style={{ marginBottom: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.whiteColor20Bold }}>
                        Save to Collections
                    </Text>
                    {collectionCategoryList.map((item, index) => (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ showSavePopup: false })}
                            key={`${index}`}
                            style={{ marginBottom: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' }}
                        >
                            <Image source={item.categoryImage}
                                style={{ width: 50.0, height: 50.0, borderRadius: Sizes.fixPadding - 5.0, }}
                            />
                            <Text style={{ marginLeft: Sizes.fixPadding * 2.0, ...Fonts.whiteColor16Medium }}>
                                {item.category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ showCreateCollectionDialog: true })}
                        style={styles.createNewButtonWrapStyle}
                    >
                        <MaterialIcons
                            name="add"
                            color={Colors.whiteColor}
                            size={30}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.whiteColor20SemiBold }}>
                            Create new
                        </Text>
                    </TouchableOpacity>
                </View>
            </SimpleBottomSheet>
        )
    }

    function placeABidButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => panelRef.current.togglePanel()}
                style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...styles.placeBidButtonStyle }}
            >
                <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                    Place a Bid
                </Text>
            </TouchableOpacity>
        )
    }

    function historyOfBidInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.bidInfoWrapStyle}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={item.userImage}
                        style={{ width: 55.0, height: 55.0, borderRadius: 27.5, }}
                    />
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, }}>
                        <Text style={{ ...Fonts.whiteColor16Medium }}>
                            {item.userName}
                        </Text>
                        <Text style={{ lineHeight: 15.0, ...Fonts.grayColor13Regular }}>
                            {item.date} at {item.time}
                        </Text>
                    </View>
                </View>
                <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.primaryColor16SemiBold }}>
                    {item.coinValue}
                </Text>
            </View>
        )
        return (
            <View style={{ marginTop: Sizes.fixPadding * 3.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.whiteColor20Bold }}>
                    History of Bid
                </Text>
                <FlatList
                    data={historyOfBidList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    function auctionImage() {
        return (
            <Image
                source={item.auctionImage}
                style={styles.auctionImageStyle}
            />
        )
    }

    function auctionInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.whiteColor20Bold }}>
                        {item.auctionName}
                    </Text>
                    <View style={styles.timeLeftWrapStyle}>
                        <Text style={{ ...Fonts.primaryColor12Medium }}>
                            4h 16m 27s left
                        </Text>
                    </View>
                </View>
                <Text style={{ marginBottom: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding + 5.0, ...Fonts.grayColor14Regular }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Vel amet bibendum ut erat. Egestas eget enim elit
                    bibendum nullam. Massa molestie ipsum porttitor
                    molestie.
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/images/users/user2.png')}
                            style={{ width: 55.0, height: 55.0, borderRadius: 27.5, }}
                        />
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, }}>
                            <Text style={{ ...Fonts.whiteColor18SemiBold }}>
                                CryptoPenks
                            </Text>
                            <Text style={{ lineHeight: 15.0, ...Fonts.grayColor14Regular }}>
                                Owner
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/images/icons/eth.png')}
                            style={{ width: 13.0, height: 20.0, resizeMode: 'contain', tintColor: Colors.primaryColor }}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.primaryColor16SemiBold }}>
                            29.005 ETH
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ borderRadius: 20.0, ...styles.headerIconWrapStyle, }}>
                        <MaterialIcons
                            name="chevron-left"
                            color={Colors.whiteColor}
                            size={26}
                            onPress={() => navigation.pop()}
                        />
                    </View>
                    <Text numberOfLines={1} style={{ flex: 1, marginRight: Sizes.fixPadding, marginLeft: Sizes.fixPadding + 10.0, ...Fonts.whiteColor22Bold }}>
                        {item.auctionName}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ ...styles.headerIconWrapStyle, borderRadius: Sizes.fixPadding - 2.0 }}>
                        <AntDesign name="sharealt" size={18} color={Colors.whiteColor} />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ showSavePopup: true })}
                        style={{
                            marginLeft: Sizes.fixPadding + 5.0,
                            ...styles.headerIconWrapStyle,
                            borderRadius: Sizes.fixPadding - 2.0
                        }}
                    >
                        <MaterialIcons name="favorite-border" size={18} color={Colors.whiteColor} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        margin: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerIconWrapStyle: {
        width: 40.0,
        height: 40.0,
        backgroundColor: 'rgba(255,255,255,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeLeftWrapStyle: {
        marginTop: Sizes.fixPadding,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        paddingHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 7.0,
    },
    auctionImageStyle: {
        height: height / 3.5,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        width: width - 40.0,
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 5.0,
    },
    bidInfoWrapStyle: {
        marginBottom: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    placeBidButtonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding * 2.0,
    },
    dialogWrapStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        width: width - 40,
        padding: 0.0,
    },
    collectionNameFieldStyle: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        ...Fonts.grayColor12Regular,
        marginTop: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding * 3.0,
    },
    createCollectionButtonStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogContentWrapStyle: {
        paddingTop: Sizes.fixPadding + 5.0,
        paddingBottom: Sizes.fixPadding * 3.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.bodyBackColor,
    },
    bottomSheetWrapStyle: {
        paddingHorizontal: 20.0,
        paddingTop: Sizes.fixPadding + 5.0,
        borderTopLeftRadius: Sizes.fixPadding * 3.0,
        borderTopRightRadius: Sizes.fixPadding * 3.0,
        backgroundColor: Colors.bodyBackColor
    },
    createNewButtonWrapStyle: {
        backgroundColor: Colors.primaryColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding,
    },
    addRemoveIconWrapStyle: {
        borderColor: Colors.whiteColor,
        borderWidth: 1.0,
        width: 35.0, height: 35.0,
        borderRadius: 17.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    coinInfoWrapStyle: {
        marginVertical: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 3.0,
        paddingHorizontal: Sizes.fixPadding * 3.0,
    },
    checkBoxStyle: {
        width: 18.0,
        height: 18.0,
        borderRadius: Sizes.fixPadding - 7.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.0,
    }
});

export default LiveAuctionsDetailScreen;
