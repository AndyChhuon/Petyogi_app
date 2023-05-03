import { MaterialCommunityIcons, MaterialIcons, } from '@expo/vector-icons';
import React from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, FlatList } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const recentActivitiesList = [
    {
        id: '1',
        auctionImage: require('../../assets/images/auctions/auction4.png'),
        auctionName: 'Wild Rhinoceros',
        isSale: true,
        coinValue: '1.259 ETH',
        date: 'Feb 21, 2021',
        time: '03:05 pm'
    },
    {
        id: '2',
        auctionImage: require('../../assets/images/auctions/auction7.png'),
        auctionName: 'Landscape',
        isSale: false,
        coinValue: '1.589 ETH',
        date: 'Aug 18, 2021',
        time: '04:12 pm'
    },
    {
        id: '3',
        auctionImage: require('../../assets/images/auctions/auction6.png'),
        auctionName: 'Monaro',
        isSale: false,
        coinValue: '0.258 ETH',
        date: 'Nov 4, 2021',
        time: '12:13 am'
    },
    {
        id: '4',
        auctionImage: require('../../assets/images/auctions/auction5.png'),
        auctionName: 'Painting',
        isSale: true,
        coinValue: '1.285 ETH',
        date: 'Jan 11, 2021',
        time: '01:49 pm'
    },
    {
        id: '5',
        auctionImage: require('../../assets/images/auctions/auction4.png'),
        auctionName: 'Wild Rhinoceros',
        isSale: true,
        coinValue: '0.233 ETH',
        date: 'Nov 4, 2021',
        time: '12:13 am'
    },
    {
        id: '6',
        auctionImage: require('../../assets/images/auctions/auction7.png'),
        auctionName: 'Landscape',
        isSale: true,
        coinValue: '1.596 ETH',
        date: 'Aug 18, 2021',
        time: '04:12 pm'
    },
    {
        id: '7',
        auctionImage: require('../../assets/images/auctions/auction6.png'),
        auctionName: 'Monaro',
        isSale: false,
        coinValue: '1.589 ETH',
        date: 'Aug 18, 2021',
        time: '04:12 pm'
    },
    {
        id: '8',
        auctionImage: require('../../assets/images/auctions/auction5.png'),
        auctionName: 'Painting',
        isSale: true,
        coinValue: '1.285 ETH',
        date: 'Jan 11, 2021',
        time: '01:49 pm'
    },
    {
        id: '9',
        auctionImage: require('../../assets/images/auctions/auction4.png'),
        auctionName: 'Wild Rhinoceros',
        isSale: true,
        coinValue: '1.259 ETH',
        date: 'Feb 21, 2021',
        time: '03:05 pm'
    },
];

const WalletScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {walletInfo()}
                {recentActivitiesInfo()}
            </View>
        </SafeAreaView>
    )

    function recentActivitiesInfo() {
        const renderItem = ({ item, index }) => (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={item.auctionImage}
                        style={{ width: 60.0, height: 60.0, borderRadius: Sizes.fixPadding - 5.0, }}
                    />
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text numberOfLines={1} style={{ ...Fonts.whiteColor16Medium }}>
                                {item.auctionName}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={item.isSale ? { ...Fonts.greenColor14Medium } : { ...Fonts.primaryColor14Medium }}>
                                    {item.isSale ? 'Sale' : 'Buy'}
                                </Text>
                                <MaterialCommunityIcons
                                    name={item.isSale ? "arrow-top-right" : "arrow-bottom-left"}
                                    size={20}
                                    color={item.isSale ? Colors.greenColor : Colors.primaryColor}
                                    style={{ marginLeft: Sizes.fixPadding - 5.0 }}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ ...Fonts.whiteColor14Medium }}>
                                1.259 ETH
                            </Text>
                            <Text style={{ ...Fonts.grayColor12Regular }}>
                                Feb 21, 2021 at 03:05 pm
                            </Text>
                        </View>
                    </View>
                </View>
                {
                    index == recentActivitiesList.length - 1
                        ?
                        null
                        :
                        <View style={{
                            height: 1.0,
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            marginVertical: Sizes.fixPadding * 2.0,
                        }} />
                }
            </View>
        )
        return (
            <>
                <Text style={{ margin: Sizes.fixPadding * 2.0, ...Fonts.whiteColor18SemiBold }}>
                    Recent Activities
                </Text>
                <FlatList
                    data={recentActivitiesList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 3.0, }}
                />
            </>
        )
    }

    function walletInfo() {
        return (
            <View style={styles.walletInfoWrapStyle}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ ...Fonts.whiteColor14Medium }}>
                            Coinbase Wallet
                        </Text>
                        <Text style={{ marginTop: Sizes.fixPadding - 15.0, ...Fonts.whiteColor22SemiBold }}>
                            29.005 ETH
                        </Text>
                    </View>
                    <MaterialIcons
                        name="more-vert"
                        color={Colors.whiteColor}
                        size={24}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.whiteColor14Medium }}>
                        0xd010d2ax48...0Ijkof4fgd
                    </Text>
                    <MaterialIcons
                        name="content-copy"
                        size={15}
                        color={Colors.whiteColor}
                        style={{ marginLeft: Sizes.fixPadding + 5.0 }}
                    />
                </View>
            </View >
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
                    My Wallet
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
    walletInfoWrapStyle: {
        backgroundColor: Colors.primaryColor,
        justifyContent: 'space-between',
        height: 170.0,
        borderRadius: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
        padding: Sizes.fixPadding + 5.0,
    }
});

export default WalletScreen;
