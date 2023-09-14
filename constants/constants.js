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

export const prerecordedAudioUrls = {
  intro: {
    1: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/1.wav",
    2: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/2.wav",
    3: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/3.wav",
    4: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/4.wav",
    5: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/5.wav",
  },
  meditations: {
    1: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Meditations/5.wav",
    2: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Meditations/1.wav",
    3: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Meditations/6.wav",
    4: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Meditations/2.wav",
    5: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Meditations/3.wav",
    6: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Meditations/4.wav",
    7: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Meditations/7.wav",
    8: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Meditations/8.wav",
  },
  outro: {
    1: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Outro/1.wav",
  },
};

export const prerecordedAudioPhrases = {
  intro: {
    1: "Greetings to you, my favourite Yogi. Welcome back to your sacred place, with me PetYogi!",
    2: "Thank you for joining me in this new personalized meditation, made specially for you.",
    3: "It's always an honour to share this moment with you, and help you bring peace and joy to your life.",
    4: "I want you to know that you are deeply loved, and I appreciate you for making the commitment to meditating with me every day.",
    5: "Now, while your meditation is being generated, let's meditate on a few meditation tips that I want you to understand deeply.",
  },
  meditations: {
    1: "Meditation is like a gym, in which you develop the powerful mental muscles of calm and insight.",
    2: "A most useful approach to meditation practice is to schedule it as you would an extremely important appointment, and unfailingly keep your appointment with the infinite.",
    3: "Meditation is not spacing out or running away. In fact, it is being totally honest with ourselves.",
    4: "It is indeed a radical act of love just to sit down and be quiet for a time by yourself.",
    5: "Learn to be calm and you will always be happy.",
    6: "Meditation is allowing what is.",
    7: "Remember the blue sky. It may at times, be obscured by clouds, but it is always there.",
    8: "When meditation is mastered, the mind is unwavering like the flame of a candle in a windless place.",
  },
  outro: {
    1: "We are now ready to start your meditation, so let us begin.",
  },
};

export const purchaseScreenCTA = {
  free: {
    title: "Unverified Yogi",
    subtitleOne: "Verify your email and get",
    subtitleBold: "2 free",
    subtitleTwo: "meditations credits.",
    cta: "Claim 2 Credits",
    image: require("../assets/images/purchaseScreen/monkey_banana.png"),
    background: require("../assets/images/purchaseScreen/bronze_gradient.png"),
    borderColor: "rgb(181 157 137)",
    backgroundDarker: "rgb(181 136 128)",
    noCreditsText:
      "You have no credits left. Verify your email and get 2 free credits.",
    noCreditsCTA: "VERIFY ACCOUNT",
  },
  freeVerifiedTrial: {
    title: "Yogi Free Plan",
    subtitleOne: "Try the Turtle Plan for free.",
    subtitleBold: "1  meditation credit every day",
    subtitleTwo: "for one week.",
    cta: "Try for $0.00",
    image: require("../assets/images/purchaseScreen/turtle_hero.png"),
    background: require("../assets/images/purchaseScreen/silver_gradient.png"),
    borderColor: "#45a16c",
    backgroundDarker: "#62ada9",
    noCreditsText:
      "You have no credits left. Claim your 1-week free trial and get 1 credit per day.",
    noCreditsCTA: "CLAIM FREE",
  },
  freeVerifiedNoTrial: {
    title: "You are: Free Plan",
    subtitleOne: "Become a Turtle Hero!",
    subtitleBold: "1  meditation credit every day",
    subtitleTwo: "for your daily habit.",
    cta: "Upgrade Plan",
    image: require("../assets/images/purchaseScreen/turtle_hero.png"),
    background: require("../assets/images/purchaseScreen/silver_gradient.png"),
    borderColor: "#45a16c",
    backgroundDarker: "#62ada9",
    noCreditsText:
      "You have no credits left. Upgrade your account and get daily credits.",
    noCreditsCTA: "UPGRADE PLAN",
  },
  sloth_plan: {
    title: "You are: Sloth Plan",
    subtitleOne: "Upgrade to Turtle Plan!",
    subtitleBold: "1  meditation credit every day",
    subtitleTwo: "to build your daily habit.",
    cta: "Upgrade Plan",
    image: require("../assets/images/purchaseScreen/turtle_hero.png"),
    background: require("../assets/images/purchaseScreen/silver_gradient.png"),
    borderColor: "#45a16c",
    backgroundDarker: "#62ada9",
    noCreditsText:
      "You have no credits left. Less than 2 hours before your next credit fill.",
    noCreditsCTA: "UPGRADE",
  },
  turtle_plan: {
    title: "You are: Turtle Plan",
    subtitleOne: "Upgrade to Yogi Plan!",
    subtitleBold: "2  meditation credits every day",
    subtitleTwo: "to improve your daily habit.",
    cta: "Upgrade Plan",
    image: require("../assets/images/purchaseScreen/dog_flying.png"),
    background: require("../assets/images/purchaseScreen/pink_gradient.png"),
    borderColor: "#a14592",
    backgroundDarker: "#ad62a1",
    noCreditsText:
      "You have no credits left. Less than 2 hours before your next credit fill.",
    noCreditsCTA: "UPGRADE",
  },
  yogi_plan: {
    title: "You are: Yogi Plan",
    subtitleOne: "You will receive",
    subtitleBold: "2  meditation credits every day",
    subtitleTwo: "to keep your daily habit going.",
    cta: "Upgrade Plan",
    image: require("../assets/images/purchaseScreen/dog_flying.png"),
    background: require("../assets/images/purchaseScreen/pink_gradient.png"),
    borderColor: "#a14592",
    backgroundDarker: "#ad62a1",
    noCreditsText:
      "You have no credits left. Less than 2 hours before your next credit fill.",
    noCreditsCTA: "",
  },
};
