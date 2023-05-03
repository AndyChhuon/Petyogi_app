import React, { useState, useRef } from "react";
import {
  Dimensions,
  Image,
  FlatList,
  SafeAreaView,
  Animated,
  View,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { SwipeListView } from "react-native-swipe-list-view";
import { Snackbar } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const todaysNotificatiosList = [
  {
    key: "1",
    title: "Place a bid Success!",
    description:
      "Lorem ipsum dolor sit amet, consectetur elit. Sed etiam faucibus feugiat.",
    iconBgColor: "#2196F3",
    icon: require("../../assets/images/icons/success2.png"),
  },
  {
    key: "2",
    title: "Payment Failed!",
    description:
      "Lorem ipsum dolor sit amet, consectetur elit. Sed etiam faucibus feugiat.",
    iconBgColor: "#F44336",
    icon: require("../../assets/images/icons/failed.png"),
  },
];

const yesterdaysNotificationsList = [
  {
    key: "1",
    title: "New NFTs for you!",
    description:
      "Lorem ipsum dolor sit amet, consectetur elit. Sed etiam faucibus feugiat.",
    iconBgColor: "#FFC107",
    icon: require("../../assets/images/icons/bell.png"),
  },
  {
    key: "2",
    title: "Place a bid Success!",
    description:
      "Lorem ipsum dolor sit amet, consectetur elit. Sed etiam faucibus feugiat.",
    iconBgColor: "#4CAF50",
    icon: require("../../assets/images/icons/success2.png"),
  },
];

const rowTranslateAnimatedValues = {};

const NotificationsScreen = () => {
  const [showSnackBar, setShowSnackBar] = useState(false);

  const [snackBarMsg, setSnackBarMsg] = useState("");

  const [listData, setListData] = useState(todaysNotificatiosList);

  const [oldListData, setOldListData] = useState(yesterdaysNotificationsList);

  Array(listData.length + 1)
    .fill("")
    .forEach((_, i) => {
      rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
    });

  Array(oldListData.length + 1)
    .fill("")
    .forEach((_, i) => {
      rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
    });

  const animationIsRunning = useRef(false);

  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;

    if ((value < -width || value > width) && !animationIsRunning.current) {
      animationIsRunning.current = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        const newData = [...listData];
        const prevIndex = listData.findIndex((item) => item.key === key);
        newData.splice(prevIndex, 1);
        const removedItem = listData.find((item) => item.key === key);

        setSnackBarMsg(`${removedItem.title} dismissed`);

        setListData(newData);

        setShowSnackBar(true);

        animationIsRunning.current = false;
      });
    }
  };

  const renderItem = (data) => (
    <Animated.View
      style={[
        {
          height: rowTranslateAnimatedValues[data.item.key].interpolate({
            inputRange: ["0%", "100%"],
            outputRange: ["0%", "100%"],
          }),
        },
      ]}
    >
      <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
        <View style={styles.notificationWrapStyle}>
          <View
            style={{
              backgroundColor: data.item.iconBgColor,
              ...styles.notificationIconWrapStyle,
            }}
          >
            <Image
              source={data.item.icon}
              style={{
                width: 25.0,
                height: 25.0,
                resizeMode: "contain",
                tintColor: Colors.whiteColor,
              }}
            />
          </View>
          <View style={{ marginLeft: Sizes.fixPadding + 5.0, flex: 1 }}>
            <Text numberOfLines={1} style={{ ...Fonts.whiteColor16Medium }}>
              {data.item.title}
            </Text>
            <Text numberOfLines={2} style={{ ...Fonts.grayColor13Regular }}>
              {data.item.description}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );

  const renderHiddenItem = () => <View style={styles.rowBack} />;

  const oldOnSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;

    if ((value < -width || value > width) && !animationIsRunning.current) {
      animationIsRunning.current = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        const newData = [...oldListData];
        const prevIndex = oldListData.findIndex((item) => item.key === key);
        newData.splice(prevIndex, 1);
        const removedItem = oldListData.find((item) => item.key === key);

        setSnackBarMsg(`${removedItem.title} dismissed`);

        setOldListData(newData);

        setShowSnackBar(true);

        animationIsRunning.current = false;
      });
    }
  };

  const oldRenderItem = (data) => (
    <Animated.View
      style={[
        {
          height: rowTranslateAnimatedValues[data.item.key].interpolate({
            inputRange: ["0%", "100%"],
            outputRange: ["0%", "100%"],
          }),
        },
      ]}
    >
      <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
        <View style={styles.notificationWrapStyle}>
          <View
            style={{
              backgroundColor: data.item.iconBgColor,
              ...styles.notificationIconWrapStyle,
            }}
          >
            <Image
              source={data.item.icon}
              style={{
                width: 25.0,
                height: 25.0,
                resizeMode: "contain",
                tintColor: Colors.whiteColor,
              }}
            />
          </View>
          <View style={{ marginLeft: Sizes.fixPadding + 5.0, flex: 1 }}>
            <Text numberOfLines={1} style={{ ...Fonts.whiteColor16Medium }}>
              {data.item.title}
            </Text>
            <Text numberOfLines={2} style={{ ...Fonts.grayColor13Regular }}>
              {data.item.description}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );

  const oldRenderHiddenItem = () => <View style={styles.rowBack} />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        <FlatList
          ListHeaderComponent={
            <View style={{ flex: 1 }}>
              {listData.length == 0 && oldListData.length == 0 ? (
                <View
                  style={{
                    height: height - 180,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={require("../../assets/images/icons/bell2.png")}
                    style={{ width: 50.0, height: 50.0, resizeMode: "contain" }}
                  />
                  <Text
                    style={{
                      ...Fonts.whiteColor14Regular,
                      marginTop: Sizes.fixPadding,
                    }}
                  >
                    No new notifications yet
                  </Text>
                </View>
              ) : (
                <>
                  {listData.length == 0 ? null : (
                    <View>
                      <Text
                        style={{
                          marginBottom: Sizes.fixPadding + 5.0,
                          marginHorizontal: Sizes.fixPadding * 2.0,
                          ...Fonts.whiteColor18Medium,
                        }}
                      >
                        Today, March 15 2022
                      </Text>
                      <SwipeListView
                        listKey={`todays`}
                        data={listData}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        rightOpenValue={-width}
                        leftOpenValue={width}
                        onSwipeValueChange={onSwipeValueChange}
                        useNativeDriver={false}
                        scrollEnabled={false}
                      />
                    </View>
                  )}
                  {oldListData.length == 0 ? null : (
                    <View>
                      <Text
                        style={{
                          marginBottom: Sizes.fixPadding + 5.0,
                          marginTop: Sizes.fixPadding - 5.0,
                          marginHorizontal: Sizes.fixPadding * 2.0,
                          ...Fonts.whiteColor18Medium,
                        }}
                      >
                        Yesterday, March 14 2022
                      </Text>
                      <SwipeListView
                        listKey={`olds`}
                        data={oldListData}
                        renderItem={oldRenderItem}
                        renderHiddenItem={oldRenderHiddenItem}
                        rightOpenValue={-width}
                        leftOpenValue={width}
                        onSwipeValueChange={oldOnSwipeValueChange}
                        useNativeDriver={false}
                        scrollEnabled={false}
                      />
                    </View>
                  )}
                </>
              )}
            </View>
          }
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
          showsVerticalScrollIndicator={false}
        />
        <Snackbar
          style={styles.snackBarStyle}
          visible={showSnackBar}
          onDismiss={() => setShowSnackBar(false)}
        >
          {snackBarMsg}
        </Snackbar>
      </View>
    </SafeAreaView>
  );

  function header() {
    return (
      <Text
        style={{ margin: Sizes.fixPadding * 2.0, ...Fonts.whiteColor22Bold }}
      >
        Notifications
      </Text>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    backgroundColor: Colors.lightWhiteColor,
    elevation: 3.0,
  },
  snackBarStyle: {
    position: "absolute",
    bottom: -10.0,
    left: -10.0,
    right: -10.0,
    backgroundColor: "#333333",
  },
  notificationWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: Sizes.fixPadding - 5.0,
    padding: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    flex: 1,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  notificationIconWrapStyle: {
    width: 60.0,
    height: 60.0,
    borderRadius: Sizes.fixPadding * 3.0,
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

export default NotificationsScreen;
