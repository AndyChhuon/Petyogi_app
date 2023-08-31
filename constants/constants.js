export const multipleChoiceButtons = [
  {
    id: "1",
    text: "Happy",
    lottie: require("../assets/emotions/happy_lottie.json"),
  },
  {
    id: "2",
    text: "Sad",
    lottie: require("../assets/emotions/sad_lottie.json"),
  },
  {
    id: "3",
    text: "Angry",
    lottie: require("../assets/emotions/angry_lottie.json"),
  },
  {
    id: "4",
    text: "Confident",
    lottie: require("../assets/emotions/confident_lottie.json"),
  },
  {
    id: "5",
    text: "Fearful",
    lottie: require("../assets/emotions/fearful_lottie.json"),
  },
  {
    id: "6",
    text: "Disappointed",
    lottie: require("../assets/emotions/disappointed_lottie.json"),
  },

  {
    id: "8",
    text: "Hopeful",
    lottie: require("../assets/emotions/hopeful_lottie.json"),
  },
  {
    id: "9",
    text: "Tired",
    lottie: require("../assets/emotions/tired_lottie.json"),
  },
  {
    id: "10",
    text: "Anxious",
    lottie: require("../assets/emotions/anxious_lottie.json"),
  },
  {
    id: "7",
    text: "Love",
    lottie: require("../assets/emotions/in_love_lottie.json"),
  },

  {
    id: "12",
    text: "Anhedonic",
    lottie: require("../assets/emotions/depressed_lottie.json"),
  },
  {
    id: "13",
    text: "Exasperated",
    lottie: require("../assets/emotions/exasperated_lottie.json"),
  },
  {
    id: "11",
    text: "Bored",
    lottie: require("../assets/emotions/bored_lottie.json"),
    scale: 0.96,
  },
];

export const meditationTypeButtons = [
  {
    id: "1",
    text: "Visualization",
    lottie: require("../assets/meditation_lottie/visualization.json"),
  },
  {
    id: "2",
    text: "Body Scan",
    lottie: require("../assets/meditation_lottie/bodyScan.json"),
  },
  {
    id: "3",
    text: "Focused Attention",
    lottie: require("../assets/meditation_lottie/focusedAttention.json"),
  },
  {
    id: "4",
    text: "Loving Kindness",
    lottie: require("../assets/meditation_lottie/lovingKindness.json"),
  },
  {
    id: "5",
    text: "God's presence",
    lottie: require("../assets/meditation_lottie/godsPresence.json"),
  },
];

export const meditationLotties = [
  {
    lottie: require("../assets/Lottie/cute_dog_2.json"),
    speed: 0.6,
  },
  {
    lottie: require("../assets/Lottie/cute_dog.json"),
    speed: 0.8,
  },
  {
    lottie: require("../assets/Lottie/cute_penguin.json"),
    speed: 1,
  },
  {
    lottie: require("../assets/Lottie/sleeping_cat.json"),
    speed: 1,
  },
  {
    lottie: require("../assets/Lottie/cute_giraffe.json"),
    speed: 0.8,
  },
];

export const meditationQuestionsByType = {
  Visualization: {
    "What is on top of your mind right now?": "",
    "Why is it on your mind?": "",
    "Describe what you would like to visualize throughout the meditation": "",
    "In what setting would you like this visualization to take place?": "",
  },
  "Body Scan": {
    "What is on top of your mind right now?": "",
    "Why is it on your mind?": "",
    "Where in your body do you feel most tense?": "",
    "Describe the environment in which you will be meditating, are you seated or laying down?":
      "",
  },
  "Focused Attention": {
    "What is on top of your mind right now?": "",
    "Why is it on your mind?": "",
    "What can I do to help you?": "",
    "What specific anchor would you like to focus on (breath, sound, item, etc)?":
      "",
  },
  "Loving Kindness": {
    "What is on top of your mind right now?": "",
    "Why is it on your mind?": "",
    "Who would you like to share loving kindness to?": "",
    "Is there something in particular you would like to visualize?": "",
  },
  "God's presence": {
    "What is on top of your mind right now?": "",
    "Why is it on your mind?": "",
    "How does God play into your previous answers?": "",
    "How can I help this conversation with God?": "",
  },
};
