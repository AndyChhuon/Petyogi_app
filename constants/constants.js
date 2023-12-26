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
    text: "Apathetic",
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

export const streakRewards = [
  {
    id: "1",
    image: require("../assets/images/streakRewards/20-streak-sticker.png"),
    name: "Stickers",
    gems: "20",
  },
  {
    id: "2",
    image: require("../assets/images/streakRewards/t_shirt_final_50.jpg"),
    name: "T-Shirt",
    gems: "50",
  },
  {
    id: "3",
    image: require("../assets/images/streakRewards/100_streaks.png"),
    name: "Yogi Mug",
    gems: "100",
  },
];
export const meditationScreenCustomizeables = {
  background: [
    {
      id: "7",
      image: require("../assets/background_svg/starry_night_preview.png"),
      lottie: require("../assets/background_svg/starry_night.json"),
      textColor: "#639aba",
      textColor2: "#639aba",

      gems: "Free",
      name: "Starry Night",
    },
    {
      id: "1",
      image: require("../assets/background_svg/fireplace_preview.png"),
      lottie: require("../assets/background_svg/fireplace.json"),
      textColor: "#aca8a6",

      gems: 1500,
      name: "Fireplace",
    },
    {
      id: "2",
      image: require("../assets/background_svg/frosty_snowman_preview.png"),
      lottie: require("../assets/background_svg/frosty_snowman.json"),
      isLight: true,
      textColor: "#1d5fad",
      gems: 1500,
      name: "Cozy Cabin",
    },
    {
      id: "4",
      image: require("../assets/background_svg/mountain_preview.png"),
      lottie: require("../assets/background_svg/mountain.json"),
      textColor: "#ad6f8f",
      gems: 1500,
      name: "Mount Calm",
    },
    {
      id: "3",
      image: require("../assets/background_svg/jungle_preview.png"),
      lottie: require("../assets/background_svg/jungle.json"),
      textColor: "#c58331",
      gems: 1500,
      name: "Jungle",
    },
    {
      id: "5",
      image: require("../assets/background_svg/rosy_blur_preview.png"),
      lottie: require("../assets/background_svg/rosy_blur.json"),
      textColor: "#7f31c5",
      gems: 1500,
      name: "Rosy Blur",
    },
    {
      id: "6",
      image: require("../assets/background_svg/space_preview.png"),
      lottie: require("../assets/background_svg/space.json"),
      textColor: "#8d5395",
      gems: 1500,
      name: "Still Space",
    },

    {
      id: "8",
      image: require("../assets/background_svg/train_preview.png"),
      lottie: require("../assets/background_svg/train.json"),
      textColor: "#694286",
      gems: 1500,
      name: "Tranquil Train",
    },
    {
      id: "9",
      image: require("../assets/background_svg/colorful_bubbles_preview.png"),
      lottie: require("../assets/background_svg/colorful_bubbles.json"),
      gems: 1500,
      name: "Bubbles",
    },
    {
      id: "10",
      image: require("../assets/background_svg/rainbow_strips_preview.png"),
      lottie: require("../assets/background_svg/rainbow_strips.json"),
      textColor: "#e0b6b5",
      gems: 1500,
      name: "Rainbow",
    },
    {
      id: "11",
      image: require("../assets/background_svg/plants_preview.png"),
      lottie: require("../assets/background_svg/plants.json"),
      textColor: "#469386",
      gems: 1500,
      name: "Plants",
    },
    {
      id: "12",
      image: require("../assets/background_svg/magenta_blur_preview.png"),
      lottie: require("../assets/background_svg/magenta_blur.json"),
      title: "",
      textColor: "#d84b8f",
      gems: 1500,
      name: "Magenta Blur",
    },
  ],
  music: [
    {
      id: "1",
      image: null,
      title: "No music",
      gems: "Free",
    },
    {
      id: "4",
      image: require("../assets/music/blue_star.jpg"),
      title: "Star Gazing",
      sound:
        "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Music/Blue+star.mp3",
      name: "Star Gazing",
      gems: "Free",
    },
    {
      id: "3",
      image: require("../assets/music/fiery_hope.jpg"),
      title: "There is Hope",
      sound:
        "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Music/new/There+is+hope.mp3",
      name: "There is Hope",
      gems: "Free",
    },
    {
      id: "2",
      image: require("../assets/music/Natures_Calling.jpg"),
      title: "Nature's Calling",
      sound:
        "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Music/new/Inner+calling.mp3",
      name: "Nature's Calling",
      gems: 950,
    },

    {
      id: "6",
      image: require("../assets/music/inner_light.jpg"),
      title: "Inner Light",
      sound:
        "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Music/new/Inner+light.mp3",
      name: "Inner Light",
      gems: 950,
    },
    // maybe change
    {
      id: "7",
      image: require("../assets/music/chimes.jpg"),
      title: "Harmony's Chimes",
      sound:
        "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Music/new/Harmony+within.mp3",
      name: "Harmony's Chimes",
      gems: 950,
    },
    {
      id: "8",
      image: require("../assets/music/music_box.jpg"),
      title: "Memories",
      sound:
        "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Music/new/Memories.mp3",
      name: "Memories",
      gems: 950,
    },
    {
      id: "9",
      image: require("../assets/music/moonshadow.jpg"),
      title: "Moonshadow",
      sound:
        "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Music/new/Moonshadow.mp3",
      name: "Moonshadow",
      gems: 950,
    },
    {
      id: "5",
      image: require("../assets/music/reiki_morning.jpg"),
      title: "Reiki Morning",
      sound:
        "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Music/new/Reiki+morning.mp3",
      name: "Reiki Morning",
      gems: 950,
    },
    {
      id: "10",
      image: require("../assets/music/floating.jpg"),
      title: "Floating",
      sound:
        "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Music/new/Floating.mp3",
      name: "Floating",
      gems: 950,
    },
    {
      id: "11",
      image: require("../assets/music/new_perspective.jpg"),
      title: "New Perspectives",
      sound:
        "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Music/new/New+perspectives.mp3",
      name: "New Perspectives",
      gems: 950,
    },
    {
      id: "12",
      image: require("../assets/music/evolution.jpg"),
      title: "Evolution",
      sound:
        "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Music/new/Evolution.mp3",
      name: "Evolution",
      gems: 950,
    },
    {
      id: "13",
      image: require("../assets/music/fresh_start.jpg"),
      title: "Fresh Beginnings",
      sound:
        "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Music/new/Dreamland.mp3",
      name: "Fresh Beginnings",
      gems: 950,
    },
  ],
  meditation: [
    {
      id: "1",
      image: require("../assets/Meditation/monkey.png"),
      lottie: require("../assets/Meditation/monkey.json"),
      gems: "Free",
      name: "Monkie",
      backgroundColor: "#14547a",
    },
    {
      id: "2",
      image: require("../assets/Meditation/sloth.png"),
      lottie: require("../assets/Meditation/sloth.json"),
      gems: "Free",
      name: "Mellow",
      backgroundColor: "#ffd6ac",
    },
    {
      id: "3",
      image: require("../assets/Meditation/tiger.png"),
      lottie: require("../assets/Meditation/tiger.json"),
      gems: 1200,
      name: "Saber",
      backgroundColor: "#ffcb77",
    },
    {
      id: "4",
      image: require("../assets/Meditation/turtle.png"),
      lottie: require("../assets/Meditation/turtle.json"),
      gems: 1850,
      name: "Moss",
      backgroundColor: "#b6e29d",
    },
    {
      id: "5",
      image: require("../assets/Meditation/koala.png"),
      lottie: require("../assets/Meditation/koala.json"),
      gems: 2550,
      name: "Twiggy",
      backgroundColor: "#e3ce9d",
    },
    {
      id: "6",
      image: require("../assets/Meditation/fox.png"),
      lottie: require("../assets/Meditation/fox.json"),
      gems: 3150,
      name: "Wilde",
      backgroundColor: "#e3b29d",
    },
    {
      id: "7",
      image: require("../assets/Meditation/blob.png"),
      lottie: require("../assets/Meditation/blob.json"),
      gems: 4200,
      name: "Calm",
      backgroundColor: "#6a47b9",
    },
    {
      id: "8",
      image: require("../assets/Meditation/meditation_ring_1.png"),
      lottie: require("../assets/Meditation/meditation_ring_1.json"),
      speed: 1,
      gems: 6500,
      name: "Zen",
      backgroundColor: "#7ea8d9",
    },
    {
      id: "9",
      image: require("../assets/Meditation/rabbit.png"),
      lottie: require("../assets/Meditation/rabbit.json"),
      speed: 0.5,
      gems: 9250,
      name: "Hopps",
      backgroundColor: "#ffcdcd",
    },
  ],
};

export const notificationsMessages = {
  morning: [
    {
      title: "Good morning Sunshine",
      body: "Hope you are well rested and ready for the day!",
    },
    {
      title: "Rise and Shine!",
      body: "Wishing you a fantastic day ahead!",
    },
    {
      title: "Morning, fellow Yogi!",
      body: "Time to embrace the day with a smile!",
    },
    {
      title: "Bonjour, World!",
      body: "Your adventure begins now – make it great!",
    },
    {
      title: "Greetings, Champion!",
      body: "Ready to conquer today's challenges?",
    },
    {
      title: "Wake up, Rockstar!",
      body: "Your stage awaits – go dazzle the world!",
    },
    {
      title: "Top of the Morning!",
      body: "Sending all the positive vibes your way, yogi!",
    },
    {
      title: "Hey there, Early Bird!",
      body: "The early start guarantees a winning day!",
    },
    {
      title: "A Bright Start!",
      body: "May your day be as bright as the morning sun!",
    },
    {
      title: "Rise like the Sun!",
      body: "Shine on, you incredible soul!",
    },
    {
      title: "Sunny vibes only!",
      body: "Positive energy is your superpower today!",
    },
    {
      title: "Wakey-wakey, Dreamer!",
      body: "Time to turn dreams into reality.",
    },
    {
      title: "Embrace the Day!",
      body: "Today is full of opportunities waiting for you!",
    },
    {
      title: "Morning Magic!",
      body: "Your day is about to unfold with magic moments.",
    },
    {
      title: "Hola, Amigo!",
      body: "Ready for a day filled with possibilities?",
    },
    {
      title: "Awaken the Awesome!",
      body: "Unleash your awesomeness upon the world!",
    },
    {
      title: "Bright and Early!",
      body: "Seize the day with enthusiasm and joy.",
    },
    {
      title: "Hey Sunshine!",
      body: "Your positivity is contagious – spread it around!",
    },
    {
      title: "New Day, New Adventures!",
      body: "Embrace the unknown with a smile!",
    },
    {
      title: "Good Vibes Morning!",
      body: "Positive thoughts lead to positive days.",
    },
    {
      title: "New day, dear yogi!",
      body: "Today is what you make of it – make it amazing!",
    },
  ],
  checkup: [
    {
      title: "🌮 Taco 'bout Your Day!",
      body: "It's lunchtime! Time to spill the beans on how your day's shaping up. Any spicy updates?",
    },
    {
      title: "🍣 Sushi-ously, How Are You?",
      body: "Rolling in to ask: How's your day so far? Lettuce know!",
    },
    {
      title: "🍦 Sundae of Emotions!",
      body: "Scoop up your emotions like ice cream. How's the sundae of your day melting?",
    },
    {
      title: "🌯 Wrap Up Your Thoughts!",
      body: "Lunch is like a burrito—full of surprises! Unwrap and share your thoughts, yogi!",
    },

    {
      title: "🥗 Salad Serenity",
      body: "Toss your thoughts like a refreshing salad. What's the crunchiest part of your midday?",
    },
    {
      title: "🍔 Burger Break",
      body: "Flip the stress patty and savor the buns of relaxation. What's your juicy mental topping?",
    },
    {
      title: "🍲 Soup & Silence",
      body: "Let your thoughts simmer like a cozy soup. Which flavor of calm is bubbling?",
    },
    {
      title: "🍕 Pizza Pause",
      body: "Slice through the chaos and grab a peace. What toppings of peace are on your mental pizza?",
    },
    {
      title: "🍜 Noodle Nirvana",
      body: "Stir your midday with the chopsticks of serenity. Which noodle of thought are you slurping up?",
    },
    {
      title: "🌮 Taco Tranquility",
      body: "Take a break and taco 'bout your mental filling. What spicy revelations are you munching on?",
    },
    {
      title: "🍱 Bento Bliss",
      body: "Pack your thoughts in a mental bento. What compartments of calm are you opening up today?",
    },
    {
      title: "🍛 Curry Calm",
      body: "Spice up your break with a dash of relaxation. PetYogi is curry-ous to hear about your day.",
    },
    {
      title: "🥪 Sandwich Siesta",
      body: "Press pause and let's build a delicious sandwich. What layers of emotions are between your mental bread?",
    },
    {
      title: "🌯 Burrito Bliss",
      body: "Wrap your mind in the tortilla of tranquility. What fillings are stuffed in your mental burrito?",
    },
    {
      title: "🍝 Pasta Peace",
      body: "Twirl your thoughts like pasta on a fork. What sauce are you coating your mental spaghetti with?",
    },
    {
      title: "🥙 Gyro Grace",
      body: "Spin your thoughts like a gyro on a spit. What flavors of tranquility are you carving off?",
    },
    {
      title: "🥞 Pancake Pause",
      body: "Stack up your mental pancakes. What syrupy thoughts are dripping down the layers of your midday?",
    },
    {
      title: "🌭 Hot Dog Harmony",
      body: "Link your thoughts like sausages in a bun. What condiments are you topping your mental hot dog with?",
    },
    {
      title: "🍚 Rice Bowl Respite",
      body: "Bowl over your worries with a scoop of calm rice. What toppings are you sprinkling over your mental bowl?",
    },
    {
      title: "🍲 Stew Serenade",
      body: "Let your thoughts stew in a pot of serenity. What ingredients of calm are you simmering together?",
    },
    {
      title: "🍣 Sashimi Silence",
      body: "Slice through the noise and enjoy the raw beauty of your midday thoughts. What fresh insights are you savoring?",
    },
    {
      title: "🍦 Sundae Siesta",
      body: "Top your thoughts with the sweetness of a midday break. What flavors are melting in your mental sundae?",
    },
    {
      title: "🧁 Cupcake Calm",
      body: "Frost your midday with a dollop of serenity. What sprinkles of joy are decorating your mental cupcake?",
    },
  ],
  nightTime: [
    {
      title: "How did your day go?",
      body: "As you wind down, let's express gratitude and love for today.",
    },
    {
      title: "How has my yogi been?",
      body: "Let's unwind and let your mind become a canvas for serenity to paint upon.",
    },
    {
      title: "How's today been?",
      body: "As the day comes to a close, let us reflect on the events and emotions of today.",
    },
    {
      title: "How's today been?",
      body: "As the day comes to a close, let us reflect on the events and emotions of today.",
    },
    {
      title: "Did today treat you well?",
      body: "Take a moment to share your highs and lows, embracing the beauty of the day.",
    },

    {
      title: "How has today treated you?",
      body: "Let's revisit the hurdles you've overcome, and the moments that made you smile.",
    },
    {
      title: "How is my yogi feeling?",
      body: "Explore the events and experiences that defined your day.",
    },
    {
      title: "Did today go well?",
      body: "Explore the insights gained from today's experiences.",
    },
    {
      title: "Did today surprise you?",
      body: "As you end the day, let's reflect on unexpected or pleasant surprises.",
    },
    {
      title: "Any small victories today?",
      body: "Celebrate the little successes that often go unnoticed.",
    },
  ],
};

export const streaksLostImage = [
  {
    image: require("../assets/images/streaksModal/sad_cat.png"),
  },
  {
    image: require("../assets/images/streaksModal/sad_panda.png"),
  },
  {
    image: require("../assets/images/streaksModal/shiba_sad.png"),
  },
];

export const streaksSavedImage = [
  {
    image: require("../assets/images/streaksModal/happy_cat_fish.png"),
  },
  {
    image: require("../assets/images/streaksModal/happy_shiba_inu_bone.png"),
  },
  {
    image: require("../assets/images/streaksModal/happy_panda_bamboo.png"),
  },
  {
    image: require("../assets/images/streaksModal/happy_bear_honey.png"),
  },
  {
    image: require("../assets/images/streaksModal/happy_astronaut_monkey.png"),
  },
  {
    image: require("../assets/images/streaksModal/happy_monkey_bananas.png"),
  },
  {
    image: require("../assets/images/streaksModal/happy_shiba.png"),
  },
  {
    image: require("../assets/images/streaksModal/happy_bear.png"),
  },
  {
    image: require("../assets/images/streaksModal/happy_panda.png"),
  },
  {
    image: require("../assets/images/streaksModal/happy_monkey.png"),
  },
];

export const surprisedImage = [
  {
    image: require("../assets/images/surprisedImages/bear.jpg"),
  },
  {
    image: require("../assets/images/surprisedImages/bear2.jpg"),
  },
  {
    image: require("../assets/images/surprisedImages/dinosaur.jpg"),
  },
  {
    image: require("../assets/images/surprisedImages/koala.jpg"),
  },
  {
    image: require("../assets/images/surprisedImages/lion.jpg"),
  },
  {
    image: require("../assets/images/surprisedImages/sloth.jpg"),
  },
  {
    image: require("../assets/images/surprisedImages/unicorn.jpg"),
  },
];

export const meditationTypeButtons = [
  {
    id: "1",
    textArr: ["Manifestation", "Visualization"],
    lottie: require("../assets/meditation_lottie/visualization.json"),
  },
  {
    id: "2",
    textArr: ["Mind Positivity", "Positive Affirmation"],
    lottie: require("../assets/meditation_lottie/positiveAffirmation.json"),
  },
  {
    id: "3",
    textArr: ["Stress Less", "Mindfulness"],
    lottie: require("../assets/meditation_lottie/mindfulness.json"),
  },
  {
    id: "4",
    textArr: ["Love & Gratitude", "Loving Kindness"],
    lottie: require("../assets/meditation_lottie/lovingKindness.json"),
  },
  {
    id: "5",
    textArr: ["Better sleep", "Contemplative Prayer"],
    lottie: require("../assets/Lottie/sleeping_koala.json"),
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

export const prerecordedPhrases = {
  intro: {
    1: [
      "Greetings to you, my beautiful Yogi. Welcome, once again, to your sacred space, with me PetYogi!",
      "Greetings to you, my wonderful Yogi. Welcome back to your meditative space, with me PetYogi!",
      "Greetings to you, my fellow Yogi. Welcome, once again, to your sacred meditation session, with me PetYogi!",
      "Welcome back, my beautiful Yogi, to another splendid meditation, with me PetYogi!",
      "Welcome back, my favourite Yogi, to another beautiful meditation, with me PetYogi!",
      "Welcome back, my lovely Yogi, to another calming personalized meditation, with me PetYogi.",
      "What a delight, to have you back, my lovely Yogi, to another calming personalized meditation, with me PetYogi.",
    ],
    2: [
      "I am infinitely grateful to have you meditate with me today, dear yogi.",
      "With open hearts and abundant gratitude, I welcome you to this meditation practice.",
      "I want you to know that you are deeply loved, and I appreciate you for making the commitment to meditating with me, every day.",
      "I want you to know that I'm here for you, and I'm here to listen and support you in any way you need.",
      "I would like to express to you, my greatest gratitude, for being here with me today.",
      "I would like to take a moment, to thank you for joining me today.",
    ],
    3: [
      "Allow gratitude to fill your heart for the kindness you bestow upon yourself, a gratitude that I would like to express towards you.",
      "I know it's not easy to find time, in your busy schedule. But I appreciate you, for dedicating this time to care for yourself.",
      "I want you to know that you are deeply loved, and I appreciate you for making the commitment to meditating with me, every day.",
      "I want you to know that you are deserving of this moment of serenity and self love.",
      "Your commitment to inner well-being is a beautiful gift to yourself, and I thank you for that.",
      "Your presence here is a testament to your self worth and for that, let us express the greatest gratitude.",
    ],
    4: [
      "I cherish the opportunity to be part of this moment with you, and I'm committed to helping you find peace and joy.",
      "I'm always delighted to be a part of this special moment with you, contributing to your happiness and serenity.",
      "It's always a delight, to be by your side in this moment, and contribute to the peace and joy in your life.",
      "It's always an honour to share this moment with you, and help you bring peace and joy to your life.",
      "Sharing this moment with you fills me with gratitude, and I'm committed to assisting you in finding peace and joy.",
      "Sharing this moment with you is a privilege, and I'm here to assist in bringing happiness and tranquility to your life.",
    ],
  },

  outro: {
    1: [
      "Now, let's get into the beautiful meditation I have made, specially for my favourite yogi.",
      "Now, let's get into the special meditation I have made, specifically for my favourite yogi.",
      "Now, my beloved yogi, let's begin the meditation I have made, just for you.",
      "Now, my treasured yogi, let's begin the beautiful meditation I have made, just for you.",
      "That being said, my lovely yogi, let's begin the beautiful meditation I have made, just for you.",
    ],
  },

  conclusion: {
    1: [
      "As we finish this meditation, I want to take a moment to express my appreciation, for your being here.",
      "As we gently wrap up this meditation, I want to express my gratitude for your presence.",
      "As we reach the end of this meditation, I want to express my sincere appreciation for your presence.",
      "Now, as we bring our meditation to a conclusion, I wish to express my gratitude for your presence.",
      "Now, As we bring this meditation to a close, I would like to thank you, for your presence throughout this meditation.",
      "Now, as we finish this meditation, I extend my heartfelt thanks for your company.",
    ],
    2: [
      "Begin to transition back to your everyday state of mind, carrying the stillness and mindfulness you've cultivated into the rest of your day.",
      "Begin to transition back to your everyday state of mind, maintaining a sense of calm and mindfulness as you do so.",
      "Embrace the inner peace you've cultivated, and let it guide you through your journey.",
      "Prepare to re engage with the world outside of this meditation, with a renewed sense of clarity and purpose.",
      "Slowly return to the world around you, allowing the sounds, and sensations of your environment to gently enter your awareness.",
      "Start to reawaken your senses, beginning with the awareness of the ground beneath you, the support of the surface you're on.",
    ],
    3: [
      "And don't forget, in moments of stress or sorrow, Pet Yogi is just a message away to offer you the comfort you need.",
      "And remember, if ever you're feeling stressed or sad, Pet Yogi will always be here, ready to help you.",
      "And remember, if you ever experience stress or the blues, Pet Yogi is your trusted ally, always ready to help.",
      "Don't forget, whenever stress or sadness creeps in, Pet Yogi is your reliable source of comfort.",
      "If you're ever overwhelmed or feeling sad, remember that Pet Yogi is always there for you, ready to lend a hand.",
    ],
    4: [
      "I wish you a beautiful day, filled with peace and joy, my favourite yogi, and I hope to see you again very soon.",
      "I wish you a fantastic day, my dear yogi, and I look forward to our next meditation session together.",
      "I'm sending you all the positive vibes for the day, and I'm really looking forward to our next meditation, my dear yogi.",
      "May your day be filled with positivity, dear yogi, and I eagerly await our next meditation session.",
      "May your day be infused with tranquility, my fellow yogi, and I'm excited for our upcoming meditation together, hopefully very soon.",
    ],
  },
};

export const prerecordedUrls = {
  intro: {
    1: [
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/1/1.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/1/2.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/1/3.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/1/4.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/1/5.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/1/6.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/1/7.wav",
    ],
    2: [
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/2/1.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/2/2.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/2/3.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/2/4.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/2/5.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/2/6.wav",
    ],
    3: [
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/3/1.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/3/2.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/3/3.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/3/4.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/3/5.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/3/6.wav",
    ],
    4: [
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/4/1.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/4/2.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/4/3.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/4/4.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/4/5.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/4/6.wav",
    ],
  },
  outro: {
    1: [
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Outros_2/1.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Outros_2/2.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Outros_2/3.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Outros_2/4.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Outros_2/5.wav",
    ],
  },

  conclusion: {
    1: [
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Conclusion/1/1.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Conclusion/1/2.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Conclusion/1/3.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Conclusion/1/4.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Conclusion/1/5.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Conclusion/1/6.wav",
    ],
    2: [
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Conclusion/2/1.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Conclusion/2/2.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Conclusion/2/3.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Conclusion/2/4.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Conclusion/2/5.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Conclusion/2/6.wav",
    ],
    3: [
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Conclusion/3/1.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Conclusion/3/2.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Conclusion/3/3.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Conclusion/3/4.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Conclusion/3/5.wav",
    ],
    4: [
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Conclusion/4/1.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Conclusion/4/2.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Conclusion/4/3.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Conclusion/4/4.wav",
      "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Conclusion/4/5.wav",
    ],
  },
};

export const initPrerecordedAudioUrls = {
  intro: {
    1: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/1/1.wav",
    2: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/2/1.wav",
    3: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/3/1.wav",
    4: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Intro/4/1.wav",
    5: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Meditation_transition/1.wav",
  },
  meditations: {
    1: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Meditation_loop/1.wav",
    2: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Meditation_loop/2.wav",
    3: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Meditation_loop/3.wav",
    4: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Meditation_loop/4.wav",
    5: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Meditation_loop/5.wav",
    6: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Meditation_loop/6.wav",
    7: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Meditation_loop/7.wav",
    8: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Meditation_loop/8.wav",
    9: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Meditation_loop/10.wav",
    10: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Meditation_loop/11.wav",
  },
  outro: {
    1: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Prerecorded/Outros_2/1.wav",
  },
};

export const initPrerecordedAudioPhrases = {
  intro: {
    1: "Greetings to you, my beautiful Yogi. Welcome, once again, to your sacred space, with me Pet Yogi!",
    2: "I am infinitely grateful to have you meditate with me today, dear yogi.",
    3: "Allow gratitude to fill your heart for the kindness you bestow upon yourself, a gratitude that I would like to express towards you.",
    4: "I cherish the opportunity to be part of this moment with you, and I'm committed to helping you find peace and joy.",
    5: "While your meditation is getting started, let's take a few seconds to get settled into your space of tranquility and inner peace.",
  },
  meditations: {
    1: "Your inner strength, like a mighty oak, provides you with support and stability as you weather life's storms.",
    2: "Allow your mind to gently settle, like a calm pond on a peaceful day.",
    3: "Let go of any tension in your body, as you prepare for stillness.",
    4: "Remember, that you are deserving of this time of self care, and self love.",
    5: "In this sacred moment, I invite you to pause and reflect upon the unique tapestry of experiences, talents, beauty, and potential that make you so wonderful.",
    6: "Embrace the kindness that flows from your heart, for your capacity to love, to empathize, and to spread warmth to the world around you is a remarkable gift that we celebrate and appreciate today.",
    7: "As you settle into this space of meditation, I invite you to recognize and celebrate the inner strength that you possess, the inner warrior that has carried you through life's challenges and brought you to this moment of serenity.",
    8: "In this moment, let your heart be filled with gratitude for the endless opportunities that lie ahead, for the boundless potential that rests within you, waiting to be unlocked and harnessed for your highest good.",
    9: "Take a moment to celebrate the wonderful person that you are, to appreciate the unique blend of qualities, experiences, and dreams that make you a truly remarkable individual. You are a work of art in progress.",
    10: "Know that you are enough just as you are, a beautiful and evolving soul on a journey of self-discovery, self-love, and self-improvement.",
  },
  outro: {
    1: "Now, let's get into the beautiful meditation I have made, specially for my favourite yogi.",
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
    displayCTAText: "Start your mental health journey with 2 free credits!",
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
    displayCTAText:
      "Boost your mental health journey with Turtle Plan, for free!",
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
    displayCTAText: "Boost your mental health journey with Turtle Plan!",
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
    noCreditsText: "You have no credits left.",
    noCreditsCTA: "UPGRADE",
    displayCTAText: "Boost your mental health journey with Turtle Plan!",
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
    noCreditsText: "You have no credits left.",
    noCreditsCTA: "UPGRADE",
    displayCTAText: "Super charge your mental health journey with Yogi Plan!",
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
    noCreditsText: "You have no credits left.",
    noCreditsCTA: "",
  },
};

export const initMeditationQuestionsJson = {
  0: { Question: "How are you feeling?", Answer: [], type: "small_buttons" },
  1: {
    Question: "Select a goal for this meditation:",
    Answer: "",
    type: "large_buttons",
  },
  2: {
    Question:
      "What would like to accomplish during this meditation. Why are you feeling ",
    Answer: "",
  },
  3: {
    Question: "Choose any number of the following journal prompts:",
    Answer: [],
    type: "wide_buttons",
  },
};
