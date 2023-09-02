import React, { Fragment, useEffect } from "react";

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
import AwesomeButton from "react-native-really-awesome-button";
import useAuth from "../../hooks/useAuth";
const { width, height } = Dimensions.get("window");

const ShopScreen = ({ navigation }) => {
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const { userValues, reloadUser, isWaitingOnEmailVerification } = useAuth();
  const { remainingCredits, accountType } = userValues;

  useEffect(() => {
    if (isWaitingOnEmailVerification) {
      console.log("reloading");
      reloadUser();
    }
  }, []);

  console.log(accountType);
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
            paddingBottom: (12 * height) / 850,
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
            paddingTop: 5,
          }}
        >
          <View style={{ marginHorizontal: 10 }}>
            <View
              style={{
                width: "100%",
                marginTop: 9,
                display: "flex",
                minHeight: width / 2.2,
                backgroundColor: "#262674",
              }}
            >
              <ImageBackground
                source={require("../../assets/orange_gradient.png")}
                style={[
                  styles.BackgroundImage,
                  { borderRadius: 10, borderWidth: 3, borderColor: "#39474f" },
                ]}
                borderRadius={6}
                backgroundColor="none"
              >
                <View
                  style={{
                    flexGrow: "1",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <View>
                    <Text style={[Fonts.tryForFreeTitle, { marginLeft: 8 }]}>
                      Unverified Yogi
                    </Text>
                    <Text
                      style={[
                        Fonts.purchaseScreenDescription,
                        {
                          marginLeft: 8,
                          paddingTop: 5,
                          flexGrow: 1,
                          width: width - width / 4 - 46,
                        },
                      ]}
                    >
                      Verify your email and get{" "}
                      <Text style={Fonts.decriptionSemiBold}>2 free</Text>{" "}
                      meditation credits.
                    </Text>
                  </View>
                  <Image
                    style={{
                      width: width / 4.5,
                      height: width / 4.5,
                      borderRadius: 10,
                      marginLeft: 2,
                      borderColor: Colors.bodyBackColor,
                      borderWidth: 2,
                    }}
                    source={require("../../assets/images/purchaseScreen/monkey_banana.png")}
                  ></Image>
                </View>
                <AwesomeButton
                  backgroundColor="#f1f6fb"
                  borderColor="rgb(181 157 137)"
                  backgroundDarker="rgb(181 136 128)"
                  borderWidth={2}
                  paddingHorizontal={0}
                  borderRadius={8}
                  raiseLevel={3}
                  width="100%"
                  height={width / 8}
                  style={{ marginTop: 5 }}
                  onPress={() => {
                    navigation.navigate("Verification");
                  }}
                >
                  <Text style={Fonts.tryForFreeButton}>Claim 2 Credits</Text>
                </AwesomeButton>
              </ImageBackground>
            </View>

            <Text style={[Fonts.purchaseScreenTitle, { marginTop: 10 }]}>
              Subscription Plans
            </Text>
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
                    $10.99
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
                    $13.99
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
                    $15.99
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
  BackgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    padding: 10,
  },
});

export default ShopScreen;
