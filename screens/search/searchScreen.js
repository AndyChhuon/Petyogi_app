import React, { createRef, useState } from "react";
import { SafeAreaView, View, Image, TextInput, TouchableOpacity, FlatList, StatusBar, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, } from '@expo/vector-icons';
import { BottomSheet } from "@rneui/themed";

const searchTopicsList = [
    {
        id: '1',
        topicIcon: require('../../assets/images/icons/list.png'),
        topic: 'All',
    },
    {
        id: '2',
        topicIcon: require('../../assets/images/icons/art.png'),
        topic: 'Art',
    },
    {
        id: '3',
        topicIcon: require('../../assets/images/icons/gaming.png'),
        topic: 'Gaming',
    },
    {
        id: '4',
        topicIcon: require('../../assets/images/icons/video.png'),
        topic: 'Videos',
    },
    {
        id: '5',
        topicIcon: require('../../assets/images/icons/music.png'),
        topic: 'Music',
    },
    {
        id: '6',
        topicIcon: require('../../assets/images/icons/sport.png'),
        topic: 'Sport',
    },
    {
        id: '7',
        topicIcon: require('../../assets/images/icons/illustration.png'),
        topic: 'Illustration',
    },
];

const recentSearchesList = [
    {
        id: '1',
        search: '3D character',
    },
    {
        id: '2',
        search: 'Pikachu gif',
    },
    {
        id: '3',
        search: 'Thunder bolt',
    },
    {
        id: '4',
        search: 'Anime',
    },
];

const statusList = ['Buy now', 'Has offer', 'New product'];

const sortByOptionsList = [
    'Most viewed', 'Bitcoin', 'Ending soon', 'Price: Low to High', 'Price: High to Low', 'Oldest', 'Recently created', 'Ethereum'
];

const SearchScreen = ({ navigation }) => {

    const [state, setState] = useState({
        search: null,
        recentSearchData: recentSearchesList,
        showFilterSheet: false,
        selectedStatusIndex: 0,
        minPrice: null,
        maxPrice: null,
        selectedSortOptionIndex: 0,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        search,
        recentSearchData,
        showFilterSheet,
        selectedStatusIndex,
        minPrice,
        maxPrice,
        selectedSortOptionIndex,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {serachFieldAndFilterOption()}
                {searchTopicsInfo()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {recentSearchesInfo()}
                        </>
                    }
                />
            </View>
            {filterSheet()}
        </SafeAreaView>
    )

    function filterSheet() {
        return (
            <BottomSheet
                isVisible={showFilterSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => updateState({ showFilterSheet: false })}
            >
                <View style={styles.bottomSheetWrapStyle}>
                    <Text style={{ marginBottom: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.whiteColor20Bold }}>
                        Select Filter
                    </Text>
                    {statusInfo()}
                    {priceInfo()}
                    {sortByInfo()}
                    {resetAndApplyInfo()}
                </View>
            </BottomSheet>
        )
    }

    function resetAndApplyInfo() {
        return (
            <View style={styles.resetAndApplyInfoWrapStyle}>
                <Text style={{ ...Fonts.primaryColor20SemiBold }}>
                    Reset
                </Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => { updateState({ showFilterSheet: false }) }}
                    style={styles.applyButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                        Apply
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function statusInfo() {
        return (
            <View>
                <Text style={{ ...Fonts.whiteColor18SemiBold }}>
                    Status
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', }}>
                    {
                        statusList.map((item, index) => (
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => updateState({ selectedStatusIndex: index })}
                                key={`${index}`}
                                style={{
                                    marginRight: index == statusList.length - 1 ? 0.0 : Sizes.fixPadding * 2.0,
                                    backgroundColor: selectedStatusIndex == index ? 'rgba(140, 49, 255, 0.05)' : 'rgba(255,255,255,0.05)',
                                    ...styles.optionStyle,
                                }}>
                                <Text style={selectedStatusIndex == index ? { ...Fonts.primaryColor16Regular } : { ...Fonts.whiteColor16Regular }}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }

    function sortByInfo() {
        return (
            <View>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.whiteColor18SemiBold }}>
                    Sort By
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                    {
                        sortByOptionsList.map((item, index) => (
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => updateState({ selectedSortOptionIndex: index })}
                                key={`${index}`}
                                style={{
                                    marginRight: index == sortByOptionsList.length - 1 ? 0.0 : Sizes.fixPadding * 2.0,
                                    backgroundColor: selectedSortOptionIndex == index ? 'rgba(140, 49, 255, 0.05)' : 'rgba(255,255,255,0.05)',
                                    ...styles.optionStyle,
                                }}>
                                <Text style={selectedSortOptionIndex == index ? { ...Fonts.primaryColor16Regular } : { ...Fonts.whiteColor16Regular }}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }

    function priceInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, marginBottom: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.whiteColor18SemiBold }}>
                    Price
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        value={minPrice}
                        onChangeText={(value) => updateState({ minPrice: value })}
                        placeholder="Min"
                        placeholderTextColor={Colors.whiteColor}
                        style={styles.minMaxPriceTextFieldStyle}
                        selectionColor={Colors.primaryColor}
                        keyboardType="numeric"
                    />
                    <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.grayColor14Regular }}>
                        to
                    </Text>
                    <TextInput
                        value={maxPrice}
                        onChangeText={(value) => updateState({ maxPrice: value })}
                        placeholder="Max"
                        placeholderTextColor={Colors.whiteColor}
                        style={styles.minMaxPriceTextFieldStyle}
                        selectionColor={Colors.primaryColor}
                        keyboardType="numeric"
                    />
                </View>
            </View>
        )
    }

    function removeSearch({ id }) {
        var newArray = recentSearchData.filter((item) => item.id != id)
        updateState({ recentSearchData: newArray })
    }

    function recentSearchesInfo() {

        const renderItem = ({ item }) => (
            <View style={{ marginBottom: Sizes.fixPadding - 3.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                    <MaterialCommunityIcons name="clock-time-three-outline" size={18} color={Colors.grayColor} />
                    <Text style={{ marginLeft: Sizes.fixPadding, flex: 1, ...Fonts.grayColor14Regular }}>
                        {item.search}
                    </Text>
                </View>
                <MaterialIcons
                    name="close"
                    color={Colors.grayColor}
                    size={18}
                    onPress={() => removeSearch({ id: item.id })}
                />
            </View>
        )
        return (
            recentSearchData.length != 0
                ?
                <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                    <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.whiteColor20Bold }}>
                        Recent Search
                    </Text>
                    <FlatList
                        data={recentSearchData}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={renderItem}
                    />
                </View>
                :
                null
        )
    }

    function searchTopicsInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.searchTopicWrapStyle}>
                <Image
                    source={item.topicIcon}
                    style={{ width: 22.0, height: 22.0, resizeMode: 'contain' }}
                />
                <Text style={{ marginLeft: Sizes.fixPadding + 2.0, ...Fonts.primaryColor14Regular }}>
                    {item.topic}
                </Text>
            </View>
        )
        return (
            <View>
                <FlatList
                    data={searchTopicsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingLeft: Sizes.fixPadding * 2.0,
                        paddingVertical: Sizes.fixPadding * 3.0,
                    }}
                />
            </View>
        )
    }

    function serachFieldAndFilterOption() {
        const textInput = createRef();
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={styles.searchFieldWrapStyle}>
                    <TextInput
                        ref={textInput}
                        value={search}
                        onChangeText={(value) => updateState({ search: value })}
                        placeholder="Search"
                        placeholderTextColor={Colors.grayColor}
                        style={{ ...Fonts.grayColor13Regular, flex: 1, height: 20.0, }}
                        selectionColor={Colors.primaryColor}
                    />
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => textInput.current.focus()}
                    >
                        <Image
                            source={require('../../assets/images/icons/search.png')}
                            style={{ width: 20.0, height: 20.0, resizeMode: 'contain', tintColor: Colors.grayColor }}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => { updateState({ showFilterSheet: true }) }}
                    style={styles.filterIconWrapStyle}
                >
                    <MaterialIcons name="filter-list" size={24} color={Colors.whiteColor} />
                </TouchableOpacity>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ flex: 1, ...Fonts.whiteColor22Bold }}>
                    Search
                </Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('Notification')}
                    style={styles.notificationIconWrapStyle}
                >
                    <Image
                        source={require('../../assets/images/icons/notification.png')}
                        style={{ width: 22.0, height: 22.0, resizeMode: 'contain', tintColor: Colors.whiteColor }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        margin: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    notificationIconWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)'
    },
    searchFieldWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding + 3.0,
        flex: 1,
    },
    filterIconWrapStyle: {
        width: 45.0,
        height: 45.0,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: Sizes.fixPadding,
        marginLeft: Sizes.fixPadding * 2.0,
        alignItems: 'center', justifyContent: 'center'
    },
    searchTopicWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 3.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        marginRight: Sizes.fixPadding * 2.0,
    },
    bottomSheetWrapStyle: {
        paddingHorizontal: 20.0,
        paddingTop: Sizes.fixPadding + 5.0,
        paddingBottom: Sizes.fixPadding * 2.0,
        borderTopLeftRadius: Sizes.fixPadding * 3.0,
        borderTopRightRadius: Sizes.fixPadding * 3.0,
        backgroundColor: Colors.bodyBackColor
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
    minMaxPriceTextFieldStyle: {
        ...Fonts.whiteColor16Regular,
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: Sizes.fixPadding,
        flex: 0.8,
        paddingVertical: Sizes.fixPadding - 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    optionStyle: {
        paddingVertical: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    applyButtonStyle: {
        flex: 1,
        marginLeft: Sizes.fixPadding * 3.0,
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
    },
    resetAndApplyInfoWrapStyle: {
        marginBottom: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default SearchScreen;
