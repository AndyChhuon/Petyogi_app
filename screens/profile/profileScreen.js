import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, Dimensions, TouchableOpacity, FlatList, ImageBackground, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';

const recentlyListedAuctionsList = [
    {
        id: '1',
        auctionImage: require('../../assets/images/auctions/auction4.png'),
        auctionName: 'Wild Rhinoceros',
        auctionOwner: '@reesejoseph',
        coinValue: '2.20 ETH',
        likes: 259,
    },
    {
        id: '2',
        auctionImage: require('../../assets/images/auctions/auction5.png'),
        auctionName: 'Painting',
        auctionOwner: '@reesejoseph',
        coinValue: '2.20 ETH',
        likes: 689,
    },
    {
        id: '3',
        auctionImage: require('../../assets/images/auctions/auction6.png'),
        auctionName: 'Monaro',
        auctionOwner: '@reesejoseph',
        coinValue: '2.20 ETH',
        likes: 159,
    },
    {
        id: '4',
        auctionImage: require('../../assets/images/auctions/auction7.png'),
        auctionName: 'Landscape',
        auctionOwner: '@reesejoseph',
        coinValue: '2.20 ETH',
        likes: 158,
    },
    {
        id: '5',
        auctionImage: require('../../assets/images/auctions/auction4.png'),
        auctionName: 'Wild Rhinoceros',
        auctionOwner: '@reesejoseph',
        coinValue: '2.20 ETH',
        timeLeft: '4h 16m',
        likes: 954,
    },
    {
        id: '6',
        auctionImage: require('../../assets/images/auctions/auction5.png'),
        auctionName: 'Painting',
        auctionOwner: '@reesejoseph',
        coinValue: '2.20 ETH',
        likes: 485,
    },
    {
        id: '7',
        auctionImage: require('../../assets/images/auctions/auction6.png'),
        auctionName: 'Monaro',
        auctionOwner: '@reesejoseph',
        coinValue: '2.20 ETH',
        likes: 475,
    },
    {
        id: '8',
        auctionImage: require('../../assets/images/auctions/auction7.png'),
        auctionName: 'Landscape',
        auctionOwner: '@reesejoseph',
        coinValue: '2.20 ETH',
        likes: 485,
    },
];

const collectionsList = [
    {
        id: '1',
        collectionImage: require('../../assets/images/collectionCategory/collection1.png'),
        collectionName: 'All',
        NFTsCount: 26,
    },
    {
        id: '2',
        collectionImage: require('../../assets/images/collectionCategory/collection2.png'),
        collectionName: 'Arts',
        NFTsCount: 18,
    },
    {
        id: '3',
        collectionImage: require('../../assets/images/collectionCategory/collection3.png'),
        collectionName: '3D',
        NFTsCount: 15,
    },
    {
        id: '4',
        collectionImage: require('../../assets/images/collectionCategory/collection4.png'),
        collectionName: 'Landscapes',
        NFTsCount: 12,
    },
    {
        id: '5',
        collectionImage: require('../../assets/images/collectionCategory/collection5.png'),
        collectionName: 'Gaming',
        NFTsCount: 12,
    },
];

const activitiesList = [
    {
        id: '1',
        auctionImage: require('../../assets/images/auctions/auction4.png'),
        auctionName: 'Wild Rhinoceros',
        soldTo: '@cryptopenks',
        date: 'Feb 21, 2021',
        time: '03:05 pm'
    },
    {
        id: '2',
        auctionImage: require('../../assets/images/auctions/auction7.png'),
        auctionName: 'Landscape',
        soldTo: '@subeworld',
        date: 'Feb 21, 2021',
        time: '03:05 pm'
    },
    {
        id: '3',
        auctionImage: require('../../assets/images/auctions/auction6.png'),
        auctionName: 'Monaro',
        soldTo: '@cubeworld',
        date: 'Feb 21, 2021',
        time: '03:05 pm'
    },
    {
        id: '4',
        auctionImage: require('../../assets/images/auctions/auction5.png'),
        auctionName: 'Painting',
        soldTo: '@cryptopenks',
        date: 'Feb 21, 2021',
        time: '03:05 pm'
    },
    {
        id: '5',
        auctionImage: require('../../assets/images/auctions/auction4.png'),
        auctionName: 'Wild Rhinoceros',
        soldTo: '@cryptopenks',
        date: 'Feb 21, 2021',
        time: '03:05 pm'
    },
    {
        id: '6',
        auctionImage: require('../../assets/images/auctions/auction7.png'),
        auctionName: 'Landscape',
        soldTo: '@subeworld',
        date: 'Feb 21, 2021',
        time: '03:05 pm'
    },
    {
        id: '7',
        auctionImage: require('../../assets/images/auctions/auction6.png'),
        auctionName: 'Monaro',
        soldTo: '@cubeworld',
        date: 'Feb 21, 2021',
        time: '03:05 pm'
    },
    {
        id: '8',
        auctionImage: require('../../assets/images/auctions/auction5.png'),
        auctionName: 'Painting',
        soldTo: '@cryptopenks',
        date: 'Feb 21, 2021',
        time: '03:05 pm'
    },
];

const { width } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {

    const [state, setState] = useState({
        selectedTabIndex: 0,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { selectedTabIndex } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <CollapsibleToolbar
                renderContent={() => (
                    <View style={{ flex: 1 }}>
                        {profileDetail()}
                        {tabBar()}
                        {
                            selectedTabIndex == 0
                                ?
                                recentlyListedInfo()
                                :
                                selectedTabIndex == 1
                                    ?
                                    collectionsInfo()
                                    :
                                    activityInfo()
                        }
                    </View>
                )}
                renderNavBar={() => header()}
                renderToolBar={() => profileInfo()}
                collapsedNavBarBackgroundColor={Colors.primaryColor}
                toolBarHeight={200.0 + StatusBar.currentHeight}
            />
        </SafeAreaView>
    )

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.whiteColor20Bold }}>
                    Profile
                </Text>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push('Setting')}
                    style={{ ...styles.backArrowWrapStyle }}
                >
                    <Ionicons
                        name="settings-outline"
                        color={Colors.whiteColor}
                        size={20}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function activityInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.activityInfoWrapStyle}>
                <Image
                    source={item.auctionImage}
                    style={{ width: 60.0, height: 60.0, borderRadius: Sizes.fixPadding - 5.0, }}
                />
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                    <Text numberOfLines={1}>
                        <Text style={{ ...Fonts.whiteColor14Medium }}>
                            {item.auctionName}
                        </Text>
                        <Text style={{ ...Fonts.grayColor14Regular }}>
                            { } sold to { }
                        </Text>
                        <Text style={{ ...Fonts.whiteColor14Medium }}>
                            {item.soldTo}
                        </Text>
                    </Text>
                    <Text style={{ ...Fonts.grayColor13Regular }}>
                        {item.date} at {item.time}
                    </Text>
                </View>
            </View>
        )
        return (
            <View>
                <FlatList
                    key="activities"
                    data={activitiesList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    function collectionsInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.push('Collections')}
                style={styles.collectionsInfoWrapStyle}
            >
                <Image
                    source={item.collectionImage}
                    style={{
                        width: '100%',
                        height: 100.0,
                        resizeMode: 'contain'
                    }}
                />
                <Text style={{ ...Fonts.whiteColor16SemiBold }}>
                    {item.collectionName}
                </Text>
                <Text style={{ lineHeight: 13.0, ...Fonts.grayColor12Medium }}>
                    {item.NFTsCount} NFTs
                </Text>
            </TouchableOpacity>
        )
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding }}>
                <FlatList
                    key="collections"
                    data={collectionsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    numColumns={2}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    function tabBar() {
        return (
            <View style={styles.tabBarWrapStyle}>
                {tabBarOption({ option: 'Recently Listed', index: 0 })}
                {tabBarOption({ option: 'Collections', index: 1 })}
                {tabBarOption({ option: 'Activity', index: 2 })}
            </View>
        )
    }

    function tabBarOption({ option, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
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

    function recentlyListedInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.push('LiveAuctionsDetail', { item: item })}
                style={{ marginBottom: Sizes.fixPadding * 2.0, borderRadius: Sizes.fixPadding - 5.0, backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
                <ImageBackground
                    source={item.auctionImage}
                    style={styles.auctionImageStyle}
                    borderTopLeftRadius={Sizes.fixPadding - 5.0}
                    borderTopRightRadius={Sizes.fixPadding - 5.0}
                >
                    <View style={{ margin: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons
                            name="favorite-border"
                            color={Colors.whiteColor}
                            size={15}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.whiteColor14Medium }}>
                            {item.likes}
                        </Text>
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
                    key='recentlyListed'
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

    function profileInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0 }}>
                <Image
                    source={require('../../assets/images/profileCoverImage2.png')}
                    style={{ width: '100%', height: 200.0 + StatusBar.currentHeight }}
                />
                <View style={styles.profileInfoWrapStyle}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/images/users/user1.png')}
                            style={{ width: 80.0, height: 80.0, borderRadius: 40.0, }}
                        />
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, }}>
                            <Text style={{ ...Fonts.whiteColor18SemiBold }}>
                                JOSEPHREESE
                            </Text>
                            <Text style={{ lineHeight: 16.0, ...Fonts.whiteColor14Regular }}>
                                @reesejoseph
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => navigation.push('EditProfile')}
                        style={styles.editButtonStyle}
                    >
                        <Text style={{ ...Fonts.whiteColor16SemiBold }}>
                            Edit
                        </Text>
                    </TouchableOpacity>
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
    },
    profileInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: -Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    editButtonStyle: {
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
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
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
        marginTop: Sizes.fixPadding * 3.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    collectionsInfoWrapStyle: {
        flex: 1,
        marginHorizontal: Sizes.fixPadding,
        maxWidth: width / 2.5,
        marginBottom: Sizes.fixPadding,
    },
    activityInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 0,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ProfileScreen;
