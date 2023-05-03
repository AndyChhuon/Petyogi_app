import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel-v4";
import { BottomSheet } from "@rneui/themed";
import Dialog from "react-native-dialog";

const { width } = Dimensions.get("window");

const itemWidth = Math.round(width * 0.8);

const bannerList = [
  {
    image: require("../../assets/images/banners/banner1.png"),
  },
  {
    image: require("../../assets/images/banners/banner2.png"),
  },
  {
    image: require("../../assets/images/banners/banner3.png"),
  },
];

const liveAuctionsList = [
  {
    id: "1",
    auctionImage: require("../../assets/images/auctions/auction1.png"),
    auctionName: "Spacio",
    auctionOwner: "@samantha",
    coinValue: "2.20 ETH",
    timeLeft: "4h 16m",
  },
  {
    id: "2",
    auctionImage: require("../../assets/images/auctions/auction2.png"),
    auctionName: "3D Cube",
    auctionOwner: "@subeworld",
    coinValue: "2.20 ETH",
    timeLeft: "4h 16m",
  },
  {
    id: "3",
    auctionImage: require("../../assets/images/auctions/auction3.png"),
    auctionName: "Monaro",
    auctionOwner: "@greeicy",
    coinValue: "2.20 ETH",
    timeLeft: "4h 16m",
  },
  {
    id: "4",
    auctionImage: require("../../assets/images/auctions/auction1.png"),
    auctionName: "Spacio",
    auctionOwner: "@samantha",
    coinValue: "2.20 ETH",
    timeLeft: "4h 16m",
  },
  {
    id: "5",
    auctionImage: require("../../assets/images/auctions/auction2.png"),
    auctionName: "3D Cube",
    auctionOwner: "@subeworld",
    coinValue: "2.20 ETH",
    timeLeft: "4h 16m",
  },
  {
    id: "6",
    auctionImage: require("../../assets/images/auctions/auction3.png"),
    auctionName: "Monaro",
    auctionOwner: "@greeicy",
    coinValue: "2.20 ETH",
    timeLeft: "4h 16m",
  },
];

const topCreatorsList = [
  {
    id: "1",
    creatorImage: require("../../assets/images/users/user2.png"),
    creatorName: "CryptoPenks",
    coinValue: "24.596 ETH",
  },
  {
    id: "2",
    creatorImage: require("../../assets/images/users/user3.png"),
    creatorName: "Azuka",
    coinValue: "24.596 ETH",
  },
  {
    id: "3",
    creatorImage: require("../../assets/images/users/user4.png"),
    creatorName: "Moroson",
    coinValue: "24.596 ETH",
  },
  {
    id: "4",
    creatorImage: require("../../assets/images/users/user5.png"),
    creatorName: "Mary Akinyi",
    coinValue: "24.596 ETH",
  },
  {
    id: "5",
    creatorImage: require("../../assets/images/users/user6.png"),
    creatorName: "Jane Wawuda",
    coinValue: "24.596 ETH",
  },
];

const followingList = [
  {
    id: "1",
    auctionImage: require("../../assets/images/auctions/auction1.png"),
    auctionName: "Spacio",
    auctionOwner: "@samantha",
    coinValue: "2.20 ETH",
    timeLeft: "4h 16m",
  },
  {
    id: "2",
    auctionImage: require("../../assets/images/auctions/auction2.png"),
    auctionName: "3D Cube",
    auctionOwner: "@subeworld",
    coinValue: "2.20 ETH",
    timeLeft: "4h 16m",
  },
  {
    id: "3",
    auctionImage: require("../../assets/images/auctions/auction3.png"),
    auctionName: "Monaro",
    auctionOwner: "@greeicy",
    coinValue: "2.20 ETH",
    timeLeft: "4h 16m",
  },
];

const collectionCategoryList = [
  {
    id: "1",
    categoryImage: require("../../assets/images/collectionCategory/category1.png"),
    category: "Arts",
  },
  {
    id: "2",
    categoryImage: require("../../assets/images/collectionCategory/category2.png"),
    category: "3D",
  },
  {
    id: "3",
    categoryImage: require("../../assets/images/collectionCategory/category3.png"),
    category: "Music",
  },
  {
    id: "4",
    categoryImage: require("../../assets/images/collectionCategory/category4.png"),
    category: "Landscapes",
  },
];

const HomeScreen = ({ navigation }) => {
  const [state, setState] = useState({
    activeSlide: null,
    showSavePopup: false,
    showCreateCollectionDialog: false,
    collectionName: null,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const {
    activeSlide,
    showSavePopup,
    showCreateCollectionDialog,
    collectionName,
  } = state;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#212f36" }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {userInfo()}
        <FlatList
          style={{ backgroundColor: "#132025" }}
          ListHeaderComponent={
            <>
              {banners()}
              {liveAuctionsInfo()}
              {topCreatorInfo()}
              {followingInfo()}
            </>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
      {savePopUp()}
      {createCollectionDialog()}
    </SafeAreaView>
  );

  function createCollectionDialog() {
    return (
      <Dialog.Container
        visible={showCreateCollectionDialog}
        contentStyle={styles.dialogWrapStyle}
        headerStyle={{ margin: 0.0 }}
        onRequestClose={() => {
          updateState({ showCreateCollectionDialog: false });
        }}
      >
        <View style={styles.dialogContentWrapStyle}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
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
        containerStyle={{ backgroundColor: "rgba(0.5, 0.50, 0, 0.50)" }}
        modalProps={{
          onRequestClose: () => {
            updateState({ showSavePopup: false });
          },
        }}
      >
        <View style={styles.bottomSheetWrapStyle}>
          <Text
            style={{
              marginBottom: Sizes.fixPadding * 2.0,
              textAlign: "center",
              ...Fonts.whiteColor20Bold,
            }}
          >
            Save to Collections
          </Text>
          {collectionCategoryList.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => updateState({ showSavePopup: false })}
              key={`${index}`}
              style={{
                marginBottom: Sizes.fixPadding * 2.0,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={item.categoryImage}
                style={{
                  width: 50.0,
                  height: 50.0,
                  borderRadius: Sizes.fixPadding - 5.0,
                }}
              />
              <Text
                style={{
                  marginLeft: Sizes.fixPadding * 2.0,
                  ...Fonts.whiteColor16Medium,
                }}
              >
                {item.category}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => updateState({ showCreateCollectionDialog: true })}
            style={styles.createNewButtonWrapStyle}
          >
            <MaterialIcons name="add" color={Colors.whiteColor} size={30} />
            <Text
              style={{
                marginLeft: Sizes.fixPadding,
                ...Fonts.whiteColor20SemiBold,
              }}
            >
              Create new
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    );
  }

  function followingInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("LiveAuctionsDetail", { item: item })}
        style={{
          marginBottom: Sizes.fixPadding * 2.0,
          borderRadius: Sizes.fixPadding - 5.0,
          backgroundColor: "rgba(255,255,255,0.05)",
        }}
      >
        <ImageBackground
          source={item.auctionImage}
          style={styles.auctionImageStyle}
          borderTopLeftRadius={Sizes.fixPadding - 5.0}
          borderTopRightRadius={Sizes.fixPadding - 5.0}
        >
          <View style={styles.timeLeftAndFavoriteShareIconWrapStyle}>
            <View
              style={{
                backgroundColor: Colors.primaryColor,
                ...styles.timeLeftWrapStyle,
              }}
            >
              <Text style={{ ...Fonts.whiteColor12Medium }}>
                {item.timeLeft} left
              </Text>
            </View>
            <View
              style={{
                marginVertical: Sizes.fixPadding,
                ...styles.favoriteAndShareIconWrapStyle,
              }}
            >
              <View
                style={{
                  ...styles.favoriteAndShareIconContainStyle,
                  marginRight: Sizes.fixPadding,
                }}
              >
                <MaterialIcons
                  name="favorite-border"
                  size={18}
                  color={Colors.whiteColor}
                  onPress={() => updateState({ showSavePopup: true })}
                />
              </View>
              <View style={styles.favoriteAndShareIconContainStyle}>
                <AntDesign
                  name="sharealt"
                  size={18}
                  color={Colors.whiteColor}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
        <View
          style={{
            paddingHorizontal: Sizes.fixPadding + 5.0,
            paddingVertical: Sizes.fixPadding,
          }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.whiteColor18SemiBold }}>
            {item.auctionName}
          </Text>
          <View style={styles.auctionDetailWrapStyle}>
            <Text
              numberOfLines={1}
              style={{ flex: 1, ...Fonts.grayColor14Regular }}
            >
              {item.auctionOwner}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/images/icons/eth.png")}
                style={{ width: 12.0, height: 20.0, resizeMode: "contain" }}
              />
              <Text
                style={{
                  marginLeft: Sizes.fixPadding - 5.0,
                  ...Fonts.whiteColor16Bold,
                }}
              >
                {item.coinValue}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 3.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <Text
          style={{
            marginBottom: Sizes.fixPadding + 5.0,
            ...Fonts.whiteColor20Bold,
          }}
        >
          Following
        </Text>
        <FlatList
          data={followingList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      </View>
    );
  }

  function topCreatorInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("CreatorProfile")}
        style={{
          marginRight: Sizes.fixPadding * 2.0,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={item.creatorImage}
          style={{ width: 55.0, height: 55.0, borderRadius: 27.5 }}
        />
        <View style={{ marginLeft: Sizes.fixPadding + 5.0 }}>
          <Text style={{ ...Fonts.whiteColor16SemiBold }}>
            {item.creatorName}
          </Text>
          <Text
            style={{
              marginTop: Sizes.fixPadding - 7.0,
              lineHeight: 15.0,
              ...Fonts.grayColor14Regular,
            }}
          >
            {item.coinValue}
          </Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <View style={{ marginTop: Sizes.fixPadding * 3.0 }}>
        <View style={styles.titleWrapStyle}>
          <Text style={{ ...Fonts.whiteColor20Bold }}>Top Creator</Text>
          <Text style={{ ...Fonts.primaryColor16SemiBold }}>See all</Text>
        </View>
        <FlatList
          data={topCreatorsList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0 }}
        />
      </View>
    );
  }

  function liveAuctionsInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.push("LiveAuctionsDetail", { item: item });
        }}
        style={{
          marginRight: Sizes.fixPadding * 2.0,
          borderRadius: Sizes.fixPadding - 5.0,
          backgroundColor: "rgba(255,255,255,0.05)",
        }}
      >
        <ImageBackground
          source={item.auctionImage}
          style={{ ...styles.auctionImageStyle, width: 200.0 }}
          borderTopLeftRadius={Sizes.fixPadding - 5.0}
          borderTopRightRadius={Sizes.fixPadding - 5.0}
        >
          <View
            style={{
              margin: Sizes.fixPadding,
              ...styles.favoriteAndShareIconWrapStyle,
            }}
          >
            <View
              style={{
                ...styles.favoriteAndShareIconContainStyle,
                marginRight: Sizes.fixPadding,
              }}
            >
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
        </ImageBackground>
        <View
          style={{
            paddingHorizontal: Sizes.fixPadding + 5.0,
            paddingVertical: Sizes.fixPadding,
          }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.whiteColor18SemiBold }}>
            {item.auctionName}
          </Text>
          <View style={styles.auctionDetailWrapStyle}>
            <Text
              numberOfLines={1}
              style={{ flex: 1, ...Fonts.grayColor14Regular }}
            >
              {item.auctionOwner}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/images/icons/eth.png")}
                style={{ width: 12.0, height: 20.0, resizeMode: "contain" }}
              />
              <Text
                style={{
                  marginLeft: Sizes.fixPadding - 5.0,
                  ...Fonts.whiteColor16Bold,
                }}
              >
                {item.coinValue}
              </Text>
            </View>
          </View>
          <View style={styles.timeLeftWrapStyle}>
            <Text style={{ ...Fonts.primaryColor12Medium }}>
              {item.timeLeft} left
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
    return (
      <View style={{ marginTop: Sizes.fixPadding * 3.0 }}>
        <View style={styles.titleWrapStyle}>
          <Text style={{ ...Fonts.whiteColor20Bold }}>Live Auctions</Text>
          <Text style={{ ...Fonts.primaryColor16SemiBold }}>See all</Text>
        </View>
        <FlatList
          data={liveAuctionsList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0 }}
        />
      </View>
    );
  }

  function banners() {
    const renderItem = ({ item }) => (
      <ImageBackground
        source={item.image}
        style={styles.bannerImageStyle}
        resizeMode="cover"
        borderRadius={Sizes.fixPadding - 5.0}
      >
        <View style={styles.bannerCategoryWrapStyle}>
          <Text style={{ ...Fonts.whiteColor16SemiBold }}>Art</Text>
        </View>
      </ImageBackground>
    );
    return (
      <View style={{ marginTop: Sizes.fixPadding + 5.0 }}>
        <Carousel
          data={bannerList}
          sliderWidth={width}
          itemWidth={itemWidth}
          renderItem={renderItem}
          autoplay={true}
          loop={true}
          autoplayInterval={4000}
        />
      </View>
    );
  }

  function userInfo() {
    return (
      <View style={styles.userInfoWrapStyle}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../assets/images/users/user1.png")}
            style={styles.userImageStyle}
          />
          <View style={{ marginLeft: Sizes.fixPadding + 5.0, flex: 1 }}>
            <Text style={{ ...Fonts.grayColor14Regular }}>Your wallet</Text>
            <View
              style={{
                marginTop: Sizes.fixPadding - 15.0,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/images/icons/eth.png")}
                style={{ width: 14.0, height: 20.0, resizeMode: "contain" }}
              />
              <Text
                style={{
                  marginLeft: Sizes.fixPadding - 5.0,
                  ...Fonts.whiteColor20Bold,
                }}
              >
                29.005 ETH
              </Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate("Notification")}
            style={styles.notificationIconWrapStyle}
          >
            <Image
              source={require("../../assets/images/icons/notification.png")}
              style={{
                width: 22.0,
                height: 22.0,
                resizeMode: "contain",
                tintColor: Colors.whiteColor,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  notificationIconWrapStyle: {
    width: 40.0,
    height: 40.0,
    borderRadius: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  userImageStyle: {
    width: 50.0,
    height: 50.0,
    borderRadius: 25.0,
    borderColor: Colors.primaryColor,
    borderWidth: 1.5,
  },
  userInfoWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: Sizes.fixPadding * 2.0,
  },
  bannerImageStyle: {
    width: itemWidth,
    height: 150,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bannerCategoryWrapStyle: {
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: Sizes.fixPadding * 2.8,
    paddingVertical: Sizes.fixPadding - 5.0,
    borderRadius: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
  },
  auctionImageStyle: {
    height: 200.0,
    borderTopLeftRadius: Sizes.fixPadding - 5.0,
    borderTopRightRadius: Sizes.fixPadding - 5.0,
  },
  auctionDetailWrapStyle: {
    marginTop: Sizes.fixPadding - 18.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeLeftWrapStyle: {
    alignSelf: "flex-start",
    marginTop: Sizes.fixPadding,
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    paddingHorizontal: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding - 7.0,
  },
  titleWrapStyle: {
    marginBottom: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  favoriteAndShareIconWrapStyle: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
  },
  timeLeftAndFavoriteShareIconWrapStyle: {
    marginHorizontal: Sizes.fixPadding,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomSheetWrapStyle: {
    paddingHorizontal: 20.0,
    paddingTop: Sizes.fixPadding + 5.0,
    paddingBottom: Sizes.fixPadding * 2.0,
    borderTopLeftRadius: Sizes.fixPadding * 3.0,
    borderTopRightRadius: Sizes.fixPadding * 3.0,
    backgroundColor: Colors.bodyBackColor,
  },
  createNewButtonWrapStyle: {
    backgroundColor: Colors.primaryColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding,
  },
  dialogWrapStyle: {
    borderRadius: Sizes.fixPadding - 5.0,
    width: width - 40,
    padding: 0.0,
  },
  collectionNameFieldStyle: {
    backgroundColor: "rgba(255,255,255,0.05)",
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
    alignItems: "center",
    justifyContent: "center",
  },
  dialogContentWrapStyle: {
    paddingTop: Sizes.fixPadding + 5.0,
    paddingBottom: Sizes.fixPadding * 3.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.bodyBackColor,
  },
  favoriteAndShareIconContainStyle: {
    backgroundColor: "rgba(255,255,255,0.07)",
    width: 30.0,
    height: 30.0,
    borderRadius: 15.0,
    alignItems: "center",
    justifyContent: "center",
  },
  animatedView: {
    backgroundColor: "#333333",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
