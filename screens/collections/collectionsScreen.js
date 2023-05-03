import React, { createRef } from "react";
import { SafeAreaView, View, StatusBar, Dimensions, TouchableOpacity, Image, TextInput, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MasonryList from "react-native-masonry-list";

const { width } = Dimensions.get('window');

const imageWidth = (width - 60) / 2.0;
const imageHeight = ((width - 40) / 2.0);

const collectionsList = [
    {
        source: require('../../assets/images/collectionCategory/collection6.png'),
        dimensions: {
            width: imageWidth,
            height: imageHeight * 1
        }
    },
    {
        source: require('../../assets/images/banners/banner2.png'),
        dimensions: {
            width: imageWidth,
            height: imageHeight * (200 / 145)
        }
    },
    {
        source: require('../../assets/images/auctions/auction5.png'),
        dimensions: {
            width: imageWidth,
            height: imageHeight * (170 / 145),
        }
    },
    {
        source: require('../../assets/images/collectionCategory/collection7.png'),
        dimensions: {
            width: imageWidth,
            height: imageHeight * (180 / 145)
        }
    },
    {
        source: require('../../assets/images/collectionCategory/collection8.png'),
        dimensions: {
            width: imageWidth,
            height: imageHeight * (160 / 145)
        }
    },
    {
        source: require('../../assets/images/collectionCategory/collection9.png'),
        dimensions: {
            width: imageWidth,
            height: imageHeight * (150 / 145)
        }
    },
    {
        source: require('../../assets/images/banners/banner3.png'),
        dimensions: {
            width: imageWidth,
            height: imageHeight * 1
        }
    },
    {
        source: require('../../assets/images/collectionCategory/category1.png'),
        dimensions: {
            width: imageWidth,
            height: imageHeight * (120 / 145)
        }
    },
];

const CollectionsScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {searchField()}
                {searchResults()}
            </View>
        </SafeAreaView>
    )

    function searchResults() {
        return (
            <MasonryList
                images={collectionsList}
                columns={3}
                imageContainerStyle={{ borderRadius: Sizes.fixPadding - 5.0 }}
                listContainerStyle={styles.listStyle}
                backgroundColor={Colors.bodyBackColor}
                initialNumInColsToRender={50}
                spacing={3}
            />
        )
    }

    function searchField() {
        const inpurRef = createRef()
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    ref={inpurRef}
                    placeholder="Search"
                    placeholderTextColor={Colors.grayColor}
                    style={{ ...Fonts.grayColor13Regular, height: 20.0, flex: 1, }}
                    selectionColor={Colors.primaryColor}
                />
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => inpurRef.current.focus()}
                >
                    <Image
                        source={require('../../assets/images/icons/search.png')}
                        style={{ width: 20.0, height: 20.0, resizeMode: 'contain', tintColor: Colors.grayColor }}
                    />
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
                    Arts
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
    textFieldWrapStyle: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: Sizes.fixPadding - 5.0,
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding + 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
    },
    listStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding,
    }
});

export default CollectionsScreen;
