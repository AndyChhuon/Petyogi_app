import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, Dimensions, TextInput, TouchableOpacity, FlatList, ImageBackground, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { BottomSheet } from "@rneui/themed";
import Dialog from "react-native-dialog";
import CollapsibleToolbar from 'react-native-collapsible-toolbar';

const recentlyListedAuctionsList = [
    {
        id: '1',
        auctionImage: require('../../assets/images/auctions/auction4.png'),
        auctionName: 'Wild Rhinoceros',
        auctionOwner: '@cryptopenks',
        coinValue: '2.20 ETH',
        timeLeft: '4h 16m',
    },
    {
        id: '2',
        auctionImage: require('../../assets/images/auctions/auction5.png'),
        auctionName: 'Painting',
        auctionOwner: '@cryptopenks',
        coinValue: '2.20 ETH',
        timeLeft: '4h 16m',
    },
    {
        id: '3',
        auctionImage: require('../../assets/images/auctions/auction6.png'),
        auctionName: 'Monaro',
        auctionOwner: '@cryptopenks',
        coinValue: '2.20 ETH',
        timeLeft: '4h 16m',
    },
    {
        id: '4',
        auctionImage: require('../../assets/images/auctions/auction7.png'),
        auctionName: 'Landscape',
        auctionOwner: '@cryptopenks',
        coinValue: '2.20 ETH',
        timeLeft: '4h 16m',
    },
    {
        id: '5',
        auctionImage: require('../../assets/images/auctions/auction4.png'),
        auctionName: 'Wild Rhinoceros',
        auctionOwner: '@cryptopenks',
        coinValue: '2.20 ETH',
        timeLeft: '4h 16m',
    },
    {
        id: '6',
        auctionImage: require('../../assets/images/auctions/auction5.png'),
        auctionName: 'Painting',
        auctionOwner: '@cryptopenks',
        coinValue: '2.20 ETH',
        timeLeft: '4h 16m',
    },
    {
        id: '7',
        auctionImage: require('../../assets/images/auctions/auction6.png'),
        auctionName: 'Monaro',
        auctionOwner: '@cryptopenks',
        coinValue: '2.20 ETH',
        timeLeft: '4h 16m',
    },
    {
        id: '8',
        auctionImage: require('../../assets/images/auctions/auction7.png'),
        auctionName: 'Landscape',
        auctionOwner: '@cryptopenks',
        coinValue: '2.20 ETH',
        timeLeft: '4h 16m',
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

const { width } = Dimensions.get('window');

const CreatorProfileScreen = ({ navigation }) => {

    const [state, setState] = useState({
        showSavePopup: false,
        showCreateCollectionDialog: false,
        collectionName: null,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        showSavePopup,
        showCreateCollectionDialog,
        collectionName,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <CollapsibleToolbar
                renderContent={() => (
                    <View style={{ flex: 1 }}>
                        {profileDetail()}
                        {recentlyListedInfo()}
                    </View>
                )}
                renderNavBar={() => header()}
                renderToolBar={() => creatorProfileInfo()}
                collapsedNavBarBackgroundColor={Colors.primaryColor}
                toolBarHeight={200.0 + StatusBar.currentHeight}
            />
            {/* <View style={{ flex: 1 }}>
                {creatorProfileInfo()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {profileDetail()}
                            {recentlyListedInfo()}
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                />
            </View> */}
            {savePopUp()}
            {createCollectionDialog()}
        </SafeAreaView>
    )

    function header() {
        return (
            <View style={styles.backArrowWrapStyle}>
                <MaterialIcons
                    name="chevron-left"
                    color={Colors.whiteColor}
                    size={26}
                    onPress={() => navigation.pop()}
                />
            </View>
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
            <BottomSheet
                isVisible={showSavePopup}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                modalProps={{ onRequestClose: () => { updateState({ showSavePopup: false }) }, }}
            >
                <View style={styles.bottomSheetWrapStyle}>
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
            </BottomSheet>
        )
    }

    function recentlyListedInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('LiveAuctionsDetail', { item: item })}
                style={{ marginBottom: Sizes.fixPadding * 2.0, borderRadius: Sizes.fixPadding - 5.0, backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
                <ImageBackground
                    source={item.auctionImage}
                    style={styles.auctionImageStyle}
                    borderTopLeftRadius={Sizes.fixPadding - 5.0}
                    borderTopRightRadius={Sizes.fixPadding - 5.0}
                >
                    <View style={styles.timeLeftAndFavoriteShareIconWrapStyle}>
                        <View style={{ backgroundColor: Colors.primaryColor, ...styles.timeLeftWrapStyle }}>
                            <Text style={{ ...Fonts.whiteColor12Medium }}>
                                {item.timeLeft} left
                            </Text>
                        </View>
                        <View style={{ marginVertical: Sizes.fixPadding, ...styles.favoriteAndShareIconWrapStyle }}>
                            <View style={{
                                ...styles.favoriteAndShareIconContainStyle,
                                marginRight: Sizes.fixPadding
                            }}>
                                <MaterialIcons
                                    name="favorite-border"
                                    size={18}
                                    color={Colors.whiteColor}
                                    onPress={() => updateState({ showSavePopup: true })}
                                />
                            </View>
                            <View style={styles.favoriteAndShareIconContainStyle}>
                                <AntDesign name="sharealt" size={18} color={Colors.whiteColor} />
                            </View>
                        </View>
                    </View>
                </ImageBackground>
                <View style={{ paddingHorizontal: Sizes.fixPadding + 5.0, paddingVertical: Sizes.fixPadding }}>
                    <Text numberOfLines={1} style={{ ...Fonts.whiteColor18SemiBold }}>
                        {item.auctionName}
                    </Text>
                    <View style={styles.auctionDetailWrapStyle}>
                        <Text numberOfLines={1} style={{ flex: 1, ...Fonts.grayColor14Regular }}>
                            {item.auctionOwner}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require('../../assets/images/icons/eth.png')}
                                style={{ width: 12.0, height: 20.0, resizeMode: 'contain' }}
                            />
                            <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.whiteColor16Bold }}>
                                {item.coinValue}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.whiteColor20Bold }}>
                    Recently Listed
                </Text>
                <FlatList
                    data={recentlyListedAuctionsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    function profileDetail() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Ullamcorper non sit pharetra diam eget.
                </Text>
                {linkAndSocialMediaInfo()}
                {profileOtherInfo()}
            </View>
        )
    }

    function profileOtherInfo() {
        return (
            <View style={styles.otherInfoWrapStyle}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ ...Fonts.whiteColor16SemiBold }}>
                        10.0K
                    </Text>
                    <Text style={{ lineHeight: 12.0, ...Fonts.grayColor12Regular }}>
                        Items
                    </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ ...Fonts.whiteColor16SemiBold }}>
                        6.3K
                    </Text>
                    <Text style={{ lineHeight: 12.0, ...Fonts.grayColor12Regular }}>
                        Owners
                    </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/images/icons/eth.png')}
                            style={{ width: 10.0, height: 18.0, tintColor: Colors.primaryColor, resizeMode: 'contain' }}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.whiteColor16SemiBold }}>
                            92
                        </Text>
                    </View>
                    <Text style={{ lineHeight: 12.0, ...Fonts.grayColor12Regular }}>
                        Floor price
                    </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ ...Fonts.whiteColor16SemiBold }}>
                        391.6K
                    </Text>
                    <Text style={{ lineHeight: 12.0, ...Fonts.grayColor12Regular }}>
                        Traded
                    </Text>
                </View>
            </View>
        )
    }

    function linkAndSocialMediaInfo() {
        return (
            <View style={styles.linkAndSocialMediaInfoWrapStyle}>
                <View style={styles.linkWrapStyle}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        ZqsdDsef6iuP0F00s
                    </Text>
                    <MaterialCommunityIcons
                        name="content-copy"
                        size={18}
                        color={Colors.primaryColor}
                        style={{ marginLeft: Sizes.fixPadding }}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/icons/facebook.png')}
                        style={{ width: 17.0, height: 17.0, resizeMode: 'contain' }}
                    />
                    <Image
                        source={require('../../assets/images/icons/instagram.png')}
                        style={{ width: 17.0, height: 17.0, resizeMode: 'contain', marginHorizontal: Sizes.fixPadding + 5.0 }}
                    />
                    <Image
                        source={require('../../assets/images/icons/twitter.png')}
                        style={{ width: 17.0, height: 17.0, resizeMode: 'contain' }}
                    />
                </View>
            </View>
        )
    }

    function creatorProfileInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0 }}>
                <Image
                    source={require('../../assets/images/profileCoverImage.png')}
                    style={{ width: '100%', height: 200.0 + StatusBar.currentHeight }}
                />
                <View style={styles.profileInfoWrapStyle}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/images/users/user2.png')}
                            style={{ width: 80.0, height: 80.0, borderRadius: 40.0, }}
                        />
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, }}>
                            <Text style={{ ...Fonts.whiteColor18SemiBold }}>
                                CryptoPenks
                            </Text>
                            <Text style={{ lineHeight: 16.0, ...Fonts.whiteColor14Regular }}>
                                @cryptopenks
                            </Text>
                        </View>
                    </View>
                    <View style={styles.followButtonStyle}>
                        <Text style={{ ...Fonts.whiteColor16SemiBold }}>
                            Follow
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backArrowWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        backgroundColor: 'rgba(255,255,255,0.08)',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    profileInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: -Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    followButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding - 5.0,
    },
    linkWrapStyle: {
        flexDirection: 'row', alignItems: 'center',
        borderColor: Colors.grayColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding * 3.0,
        paddingHorizontal: Sizes.fixPadding + 10.0,
        paddingVertical: Sizes.fixPadding - 2.0,
        maxWidth: width / 1.8,
    },
    otherInfoWrapStyle: {
        marginTop: Sizes.fixPadding * 3.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 2.0,
        paddingHorizontal: Sizes.fixPadding + 8.0,
    },
    linkAndSocialMediaInfoWrapStyle: {
        marginTop: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    favoriteAndShareIconContainStyle: {
        backgroundColor: 'rgba(255,255,255,0.07)',
        width: 30.0,
        height: 30.0,
        borderRadius: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    favoriteAndShareIconWrapStyle: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeLeftAndFavoriteShareIconWrapStyle: {
        marginHorizontal: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    auctionImageStyle: {
        height: 200.0,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderTopRightRadius: Sizes.fixPadding - 5.0,
    },
    auctionDetailWrapStyle: {
        marginTop: Sizes.fixPadding - 18.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    timeLeftWrapStyle: {
        alignSelf: 'flex-start',
        marginTop: Sizes.fixPadding,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        paddingHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 7.0,
    },
    bottomSheetWrapStyle: {
        paddingHorizontal: 20.0,
        paddingTop: Sizes.fixPadding + 5.0,
        paddingBottom: Sizes.fixPadding * 2.0,
        borderTopLeftRadius: Sizes.fixPadding * 3.0,
        borderTopRightRadius: Sizes.fixPadding * 3.0,
        backgroundColor: Colors.bodyBackColor
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
    createNewButtonWrapStyle: {
        backgroundColor: Colors.primaryColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding,
    },
});

export default CreatorProfileScreen;
