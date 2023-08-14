import React, { Fragment } from "react";

import {
  SafeAreaView,
  View,
  StatusBar,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import Dialog from "react-native-dialog";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Sizes, Fonts } from "../../constants/styles";
const { width, height } = Dimensions.get("window");

const ShopScreen = ({ navigation, route }) => {
  // const { remainingCredits, dayMode } = route.params;
  const remainingCredits = 1;
  const [dialogVisible, setDialogVisible] = React.useState(false);
  return (
    <Fragment>
      <StatusBar translucent={false} backgroundColor="#5760b5" />
      <SafeAreaView style={{ flex: 0, backgroundColor: "#5760b5" }} />
      <SafeAreaView
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          zIndex: 2,
          backgroundColor: Colors.bodyBackColor2,
        }}
      >
        <View style={[styles.closeButtonStyle]}>
          {/* Confirm dialog  */}
          <View>
            <Dialog.Container visible={dialogVisible}>
              <Dialog.Title>Account delete</Dialog.Title>
              <Dialog.Description>
                Do you want to delete this account? You cannot undo this action.
              </Dialog.Description>
              <Dialog.Button
                label="Cancel"
                onPress={() => setDialogVisible(false)}
              />
              <Dialog.Button
                color="red"
                label="Delete"
                onPress={() => setDialogVisible(false)}
              />
            </Dialog.Container>
          </View>
          <Ionicons
            name="close"
            color={Colors.whiteDarker}
            size={32}
            onPress={() => navigation.pop()}
          />
          <Text
            style={[Fonts.displayScreensText, { flex: 1, textAlign: "center" }]}
          >
            Meditations
          </Text>
          <Ionicons
            name="share-outline"
            color={Colors.whiteDarker}
            size={32}
            style={{ opacity: 0 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingBottom: (25 * height) / 850,
            borderBottomWidth: 2,
            borderBottomColor: "#121f24",
            backgroundColor: "#5760b5",
          }}
        >
          <View
            style={{
              flex: 6,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={Fonts.streakNumberText}>{remainingCredits}</Text>
            <Text style={[Fonts.streakSecondaryText, { fontSize: 21 }]}>
              Meditation credits
            </Text>
          </View>
          <View
            style={{
              flex: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/images/icons/tiger_meditation.jpg")}
              style={{
                width: (140.0 * width) / 414,
                height: (140.0 * width) / 414,
                borderRadius: 20,
                resizeMode: "contain",
                borderColor: Colors.bodyBackColor,
                borderWidth: 2,
                //grey out
              }}
            />
          </View>
        </View>
        <ScrollView
          style={{
            flexGrow: 1,
            backgroundColor: Colors.bodyBackColor2,
            paddingTop: 25,
          }}
        >
          <View style={{ marginHorizontal: 10 }}>
            <Text style={Fonts.purchaseScreenTitle}>Subscription Plans</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setDialogVisible(true)}
            >
              <View
                style={{
                  padding: 10,
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 3,
                  borderColor: "#39474f",
                  marginTop: 9,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{
                    width: width / 4,
                    height: width / 4,
                    borderRadius: 10,
                  }}
                  source={require("../../assets/images/purchaseScreen/sloth_meditating.png")}
                ></Image>
                <View
                  style={{
                    width: width - width / 4 - 36,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={[Fonts.purchaseScreenSubtitle, { marginLeft: 10 }]}
                  >
                    Sloth Plan
                  </Text>
                  <Text
                    style={[
                      Fonts.purchaseScreenDescription,
                      {
                        marginLeft: 10,
                        paddingTop: 5,
                        flexGrow: 1,
                        width: width - width / 4 - 46,
                      },
                    ]}
                  >
                    For the casual meditator.{" "}
                    <Text style={Fonts.decriptionSemiBold}>
                      1 credit every 2 days.
                    </Text>{" "}
                    Max accumulated credits:{" "}
                    <Text style={Fonts.decriptionSemiBold}>3</Text>.
                  </Text>
                  <Text
                    style={[
                      Fonts.purchaseScreenPricing,
                      {
                        marginLeft: 10,
                        width: width - width / 4 - 46,
                        color: "#dc9afe",
                      },
                    ]}
                  >
                    $12.99
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setDialogVisible(true)}
            >
              <View
                style={{
                  padding: 10,
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 3,
                  borderColor: "#39474f",
                  marginTop: 9,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{
                    width: width / 4,
                    height: width / 4,
                    borderRadius: 10,
                  }}
                  source={require("../../assets/images/purchaseScreen/turtle_meditating.png")}
                ></Image>
                <View
                  style={{
                    width: width - width / 4 - 36,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={[Fonts.purchaseScreenSubtitle, { marginLeft: 10 }]}
                  >
                    Turtle Plan
                  </Text>
                  <Text
                    style={[
                      Fonts.purchaseScreenDescription,
                      {
                        marginLeft: 10,
                        paddingTop: 5,
                        flexGrow: 1,
                        width: width - width / 4 - 46,
                      },
                    ]}
                  >
                    For the regular meditator.{" "}
                    <Text style={Fonts.decriptionSemiBold}>
                      1 credit per day.
                    </Text>{" "}
                    Max accumulated credits:{" "}
                    <Text style={Fonts.decriptionSemiBold}>5</Text>.
                  </Text>
                  <Text
                    style={[
                      Fonts.purchaseScreenPricing,
                      {
                        marginLeft: 10,
                        width: width - width / 4 - 46,
                        color: "#66feff",
                      },
                    ]}
                  >
                    $16.99
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setDialogVisible(true)}
            >
              <View
                style={{
                  padding: 10,
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 3,
                  borderColor: "#39474f",
                  marginTop: 9,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{
                    width: width / 4,
                    height: width / 4,
                    borderRadius: 10,
                  }}
                  source={require("../../assets/images/purchaseScreen/dog_meditating.png")}
                ></Image>
                <View
                  style={{
                    width: width - width / 4 - 36,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={[Fonts.purchaseScreenSubtitle, { marginLeft: 10 }]}
                  >
                    Yogi Plan
                  </Text>
                  <Text
                    style={[
                      Fonts.purchaseScreenDescription,
                      {
                        marginLeft: 10,
                        paddingTop: 5,
                        flexGrow: 1,
                        width: width - width / 4 - 46,
                      },
                    ]}
                  >
                    For the dedicated meditator.{" "}
                    <Text style={Fonts.decriptionSemiBold}>
                      2 credits per day.
                    </Text>{" "}
                    Max accumulated credits:{" "}
                    <Text style={Fonts.decriptionSemiBold}>8</Text>.
                  </Text>
                  <Text
                    style={[
                      Fonts.purchaseScreenPricing,
                      {
                        marginLeft: 10,
                        width: width - width / 4 - 46,
                        color: "#a6dcf4",
                      },
                    ]}
                  >
                    $18.99
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <Text style={[Fonts.purchaseScreenTitle, { paddingTop: 20 }]}>
              Credit Top-Up
            </Text>
            <View
              style={{
                paddingBottom: 35,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setDialogVisible(true)}
                style={{
                  width: width / 3.3,
                  paddingTop: 8,
                  borderRadius: 10,
                  borderWidth: 3,
                  borderColor: "#39474f",
                  marginTop: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{
                    width: width / 4,
                    height: width / 4,
                    borderRadius: 10,
                  }}
                  source={require("../../assets/images/purchaseScreen/cat_holding_bones.png")}
                ></Image>
                <Text
                  style={[
                    Fonts.purchaseScreenSubtitle,
                    { marginLeft: 10, marginTop: 5 },
                  ]}
                >
                  3 Credits
                </Text>
                <Text
                  style={[
                    Fonts.purchaseScreenSubtitle,
                    { marginLeft: 10, marginBottom: 5, color: "#3ec1fa" },
                  ]}
                >
                  $3.99
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setDialogVisible(true)}
                style={{
                  width: width / 3.3,
                  paddingTop: 8,
                  borderRadius: 10,
                  borderWidth: 3,
                  borderColor: "#39474f",
                  marginTop: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{
                    width: width / 4,
                    height: width / 4,
                    borderRadius: 10,
                  }}
                  source={require("../../assets/images/purchaseScreen/red_panda_holding_bamboo.png")}
                ></Image>
                <Text
                  style={[
                    Fonts.purchaseScreenSubtitle,
                    { marginLeft: 10, marginTop: 5 },
                  ]}
                >
                  8 Credits
                </Text>
                <Text
                  style={[
                    Fonts.purchaseScreenSubtitle,
                    { marginLeft: 10, marginBottom: 5, color: "#3ec1fa" },
                  ]}
                >
                  $7.99
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setDialogVisible(true)}
                style={{
                  width: width / 3.3,
                  paddingTop: 8,
                  borderRadius: 10,
                  borderWidth: 3,
                  borderColor: "#39474f",
                  marginTop: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{
                    width: width / 4,
                    height: width / 4,
                    borderRadius: 10,
                  }}
                  source={require("../../assets/images/purchaseScreen/hamster_holding_seeds.png")}
                ></Image>
                <Text
                  style={[
                    Fonts.purchaseScreenSubtitle,
                    { marginLeft: 10, marginTop: 5 },
                  ]}
                >
                  22 Credits
                </Text>
                <Text
                  style={[
                    Fonts.purchaseScreenSubtitle,
                    { marginLeft: 10, marginBottom: 5, color: "#3ec1fa" },
                  ]}
                >
                  $15.99
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  closeButtonStyle: {
    paddingHorizontal: (20.0 * width) / 414,
    paddingVertical: (5.0 * width) / 414,
    zIndex: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5760b5",
  },
});

export default ShopScreen;
