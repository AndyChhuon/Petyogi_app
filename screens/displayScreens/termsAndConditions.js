import React, { Fragment, useState } from "react";

import {
  SafeAreaView,
  View,
  StatusBar,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Fonts } from "../../constants/styles";
import * as Haptics from "expo-haptics";

const { height } = Dimensions.get("window");

const TermsAndConditions = ({ navigation }) => {
  const [wasPopped, setWasPopped] = useState(false);

  return (
    <Fragment>
      <StatusBar translucent={false} backgroundColor={Colors.bodyBackColor2} />
      <SafeAreaView
        style={{ flex: 0, backgroundColor: Colors.bodyBackColor2 }}
      />
      <SafeAreaView
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          zIndex: 2,
          backgroundColor: Colors.bodyBackColor,
        }}
      >
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: "#53666c",
            backgroundColor: Colors.bodyBackColor2,
          }}
        >
          {backArrow()}

          <Text
            style={[
              Fonts.displayScreensText,
              {
                paddingBottom: (12 * height) / 850,
                textAlign: "center",
              },
            ]}
          >
            Terms of Use
          </Text>
        </View>

        <ScrollView
          style={{
            flexGrow: 1,
            paddingTop: 5,
            paddingHorizontal: 10,
          }}
        >
          <View style={{ marginTop: 12 }}>
            <Text
              style={[Fonts.tryForFreeTitle, { paddingTop: 5, fontSize: 24 }]}
            >
              PetYogi - Terms and Conditions
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 12 }]}>
              Welcome to PetYogi! These Terms and Conditions ("Terms") govern
              your use of the PetYogi mobile application and associated services
              (collectively referred to as the "App"). Please read these Terms
              carefully before using the App. By accessing or using the App, you
              agree to comply with and be bound by these Terms. If you do not
              agree to these Terms, please do not use the App.
            </Text>
          </View>

          <View style={{ marginTop: 35 }}>
            <Text style={[Fonts.tryForFreeTitle, { paddingTop: 5 }]}>
              1. Acceptance of Terms
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              By using the App, you acknowledge that you have read and
              understood these Terms, and you agree to be bound by them. If you
              do not agree with any part of these Terms, you should discontinue
              using the App immediately.
            </Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={[Fonts.tryForFreeTitle, { paddingTop: 5 }]}>
              2. App Description
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              PetYogi is a meditation app designed to help users improve their
              mental well-being through mindfulness and meditation practices.
              The App provides a range of meditation experiences, including
              AI-generated guided meditation sessions, mindfulness exercises,
              and other content aimed at promoting relaxation and stress
              reduction. These AI-generated guided meditations are personalized
              based on user input and responses to prompts, ensuring a unique
              and tailored meditation experience for each user.
            </Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={[Fonts.tryForFreeTitle, { paddingTop: 5 }]}>
              3. Account Registration
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              In order to access certain features of the App, you may be
              required to register for an account. You agree to provide
              accurate, current, and complete information during the
              registration process and to update such information to keep it
              accurate, current, and complete.
            </Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={[Fonts.tryForFreeTitle, { paddingTop: 5 }]}>
              4. Membership and Subscriptions
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              4.1 Membership Levels
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              PetYogi offers several membership levels, each with its own set of
              features and benefits. The available membership levels vary from
              free to paid, with each level providing a certain number of
              credits per day.
            </Text>

            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 20 }]}>
              4.2 Free Trial
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              PetYogi may offer a free trial period for Turtle Plan Membership.
              If you choose to subscribe during the trial period, your
              subscription will begin immediately, and any remaining trial
              period will be forfeited.
            </Text>

            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 20 }]}>
              4.3 Renewal and Billing
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              Subscriptions are automatically renewed unless canceled at least
              24 hours before the end of the current subscription period. The
              billing cycle is determined by the subscription plan you choose.
            </Text>

            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 20 }]}>
              4.4 Pricing Changes
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              PetYogi reserves the right to change the pricing of its
              subscription plans. Any price changes will be communicated to you
              in advance, and you will have the option to cancel your
              subscription.
            </Text>

            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 20 }]}>
              4.5 Termination of Membership
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              PetYogi may terminate or suspend your membership at any time,
              without notice, for any reason, including if you violate these
              Terms or engage in any conduct that PetYogi believes is harmful to
              other users or the App.
            </Text>

            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 20 }]}>
              4.5 Refunds
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              PetYogi does not offer refunds for subscription fees. However, if
              you believe you have been billed in error, please contact our
              customer support for assistance at support@petyogi.com.
            </Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={[Fonts.tryForFreeTitle, { paddingTop: 5 }]}>
              5. Billing and Payments
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              5.1 Payment Methods
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              To subscribe to a Premium Membership or Family Membership, you
              will be required to provide valid payment information. You
              authorize PetYogi to charge the applicable subscription fee to
              your chosen payment method.
            </Text>

            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 20 }]}>
              5.2 Billing Errors
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              If you believe there has been an error in billing, please notify
              us immediately so that we can investigate and rectify the issue.
            </Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={[Fonts.tryForFreeTitle, { paddingTop: 5 }]}>
              6. Cancellation and Refund Policy
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              6.1 Cancellation
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              You may cancel your subscription at any time by following the
              cancellation instructions provided in the App or by contacting our
              customer support. Cancellations will take effect at the end of the
              current subscription period.
            </Text>

            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 20 }]}>
              6.2 Refunds
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              As mentioned earlier, PetYogi does not provide refunds for
              subscription fees, except in cases of billing errors or as
              required by applicable law.
            </Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={[Fonts.tryForFreeTitle, { paddingTop: 5 }]}>
              7. AI-Generated Meditation Scripts and Voice Model
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              7.1 AI-Generated Meditation Scripts
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              PetYogi utilizes artificial intelligence (AI) technology,
              including the OpenAI API, to generate meditation scripts and
              content provided within the App. These AI-generated scripts are
              designed to facilitate meditation and mindfulness practices. Users
              should be aware of the following:
            </Text>

            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 20 }]}>
              7.1.1 Content Quality
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              AI-generated content may vary in quality and effectiveness.
              PetYogi makes efforts to provide high-quality meditation scripts
              but does not guarantee the suitability of AI-generated content for
              individual users.
            </Text>

            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 20 }]}>
              7.1.2 Continual Improvement
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              PetYogi strives to continually improve the quality of AI-generated
              content based on user feedback and technological advancements.
            </Text>

            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 20 }]}>
              7.2 PetYogi's Voice Model (Beta)
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              PetYogi employs an in-house voice model, referred to as "PetYogi's
              voice," for guided meditation and narration within the App. It is
              important to note the voice model is currently in beta, which
              means it is undergoing testing and development. As a result, it
              may contain occasional bugs, inconsistencies, or imperfections.
            </Text>

            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 20 }]}>
              7.3 User Discretion
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              Users of the App should exercise their own discretion and judgment
              when using AI-generated content and engaging with PetYogi's voice.
              PetYogi is not liable for any perceived shortcomings or
              imperfections in AI-generated content or the voice model.
            </Text>

            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 20 }]}>
              7.4 Limited Warranty
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              PetYogi provides no warranties, either express or implied,
              regarding the effectiveness, accuracy, or reliability of
              AI-generated meditation scripts or PetYogi's voice. Users
              acknowledge that the use of AI technology in the App is subject to
              inherent limitations.
            </Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={[Fonts.tryForFreeTitle, { paddingTop: 5 }]}>
              8. Intellectual Property
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              8.1 Ownership
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              All intellectual property rights in the App, including but not
              limited to copyrights, trademarks, and patents, are owned by
              PetYogi or its licensors.
            </Text>

            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 20 }]}>
              8.2 Restrictions
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              You agree not to copy, reproduce, modify, distribute, display,
              perform, or create derivative works of any part of the App, except
              as expressly authorized by PetYogi.
            </Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={[Fonts.tryForFreeTitle, { paddingTop: 5 }]}>
              9. Privacy Policy
            </Text>

            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              Your use of the App is also governed by our Privacy Policy, which
              is incorporated by reference into these Terms. Please review our
              Privacy Policy at www.petyogi.com/privacy to understand how we
              collect, use, and protect your personal information.
            </Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={[Fonts.tryForFreeTitle, { paddingTop: 5 }]}>
              10. User Conduct
            </Text>

            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              10.1 Prohibited Conduct
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              While using the App, you agree not to:{"\n"}
              (a) Violate any applicable laws or regulations.{"\n"}
              (b) Use the App for any unlawful or fraudulent purpose.{"\n"}
              (c) Impersonate any person or entity or falsely claim an
              affiliation with any person or entity.{"\n"}
              (d) Interfere with or disrupt the operation of the App or the
              servers and networks connected to it.{"\n"}
              (e) Reverse engineer, decompile, disassemble, or attempt to
              discover the source code of the App. {"\n"}
              (f) Use the App to transmit any viruses, worms, or malicious code.
            </Text>

            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 20 }]}>
              10.2 Termination
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              PetYogi reserves the right to terminate your access to the App at
              any time if you engage in conduct that violates these Terms.
            </Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={[Fonts.tryForFreeTitle, { paddingTop: 5 }]}>
              11. Email Communication
            </Text>

            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 12 }]}>
              11.1 Special Offers and Notifications
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              By using the App and providing your email address during
              registration or account setup, you consent to receive email
              communications from PetYogi. These communications may include, but
              are not limited to:
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              (a) Special Offers: PetYogi may periodically send you emails
              containing special offers, promotions, and discounts related to
              our Premium Membership, subscription plans, or other App features.
              {"\n"}
              (b) App Updates: PetYogi may send you emails to provide
              information about App updates, new features, and improvements
              designed to enhance your meditation experience.{"\n"}
              (c) Account Notifications: You may receive emails related to your
              account, such as billing reminders, subscription renewals, or
              important service announcements.
            </Text>

            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 20 }]}>
              11.2 Opt-Out Option
            </Text>
            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 6 }]}>
              If you no longer wish to receive promotional emails or other
              non-essential communications from PetYogi, you have the option to
              opt out at any time. You can unsubscribe from these emails by
              following the unsubscribe instructions provided in the emails or
              by adjusting your communication preferences within the App.
            </Text>

            <Text style={[Fonts.purchaseScreenDescription, { paddingTop: 20 }]}>
              11.3 Essential Communications
            </Text>
            <Text
              style={[
                Fonts.purchaseScreenDescription,
                { paddingTop: 6, paddingBottom: 10 },
              ]}
            >
              Please note that even if you choose to opt out of promotional
              emails, you may continue to receive essential communications
              related to your account and the use of the App, as these messages
              are necessary for the functioning of your account and the services
              provided.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );

  function backArrow() {
    return (
      <View style={{ ...styles.backArrowWrapStyle }}>
        <MaterialIcons
          name="chevron-left"
          color={Colors.whiteColor}
          size={28}
          onPress={() => {
            if (wasPopped) return;
            setWasPopped(true);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            navigation.pop();
          }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  BackgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    padding: 10,
  },
  backArrowWrapStyle: {
    borderRadius: 20.0,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    marginLeft: 10,
    zIndex: 2,
  },
});

export default TermsAndConditions;
