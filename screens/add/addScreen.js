import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";

const AddScreen = ({ navigation }) => {
  const [state, setState] = useState({
    title: null,
    description: null,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { title, description } = state;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {uploadFileInfo()}
          {titleInfo()}
          {descriptionInfo()}
        </ScrollView>
      </View>
      {continueButton()}
    </SafeAreaView>
  );

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("SetNFTPrice")}
        style={styles.continueButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor20SemiBold }}>Continue</Text>
      </TouchableOpacity>
    );
  }

  function descriptionInfo() {
    return (
      <View
        style={{
          marginBottom: Sizes.fixPadding * 2.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.whiteColor14Regular }}>Description</Text>
        <TextInput
          value={description}
          onChangeText={(value) => updateState({ description: value })}
          placeholder="Description of NFT"
          placeholderTextColor={Colors.grayColor}
          style={styles.textFieldStyle}
          selectionColor={Colors.primaryColor}
          multiline={true}
          numberOfLines={6}
          textAlignVertical="top"
        />
      </View>
    );
  }

  function titleInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 3.0,
          marginBottom: Sizes.fixPadding * 2.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.whiteColor14Regular }}>Title</Text>
        <TextInput
          value={title}
          onChangeText={(value) => updateState({ title: value })}
          placeholder="Title of your NFT"
          placeholderTextColor={Colors.grayColor}
          style={styles.textFieldStyle}
          selectionColor={Colors.primaryColor}
        />
      </View>
    );
  }

  function uploadFileInfo() {
    return (
      <View style={styles.uploadFileInfoWrapStyle}>
        <View style={styles.uploadIconWrapStyle}>
          <MaterialIcons
            name="cloud-upload"
            size={24}
            color={Colors.whiteColor}
          />
        </View>
        <Text style={{ ...Fonts.whiteColor14Regular }}>Upload your file</Text>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 7.0,
            ...Fonts.grayColor12Regular,
          }}
        >
          ( JPEG, PHG, WEBP, MP4, MP3 )
        </Text>
      </View>
    );
  }

  function header() {
    return (
      <View
        style={{
          margin: Sizes.fixPadding * 2.0,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={styles.backArrowWrapStyle}>
          <MaterialIcons
            name="chevron-left"
            color={Colors.whiteColor}
            size={26}
            onPress={() => navigation.goBack()}
          />
        </View>
        <Text
          numberOfLines={1}
          style={{
            marginLeft: Sizes.fixPadding * 2.0,
            flex: 1,
            ...Fonts.whiteColor22Bold,
          }}
        >
          Upload
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  backArrowWrapStyle: {
    width: 40.0,
    height: 40.0,
    borderRadius: 20.0,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadFileInfoWrapStyle: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: Sizes.fixPadding + 5.0,
    borderStyle: "dashed",
    borderColor: Colors.whiteColor,
    borderWidth: 1.0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding * 4.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  uploadIconWrapStyle: {
    width: 60.0,
    height: 60.0,
    borderRadius: 30.0,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Sizes.fixPadding + 5.0,
  },
  textFieldStyle: {
    marginTop: Sizes.fixPadding,
    ...Fonts.grayColor12Regular,
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  continueButtonStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding + 5.0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding - 5.0,
    margin: Sizes.fixPadding * 2.0,
  },
});

export default AddScreen;
