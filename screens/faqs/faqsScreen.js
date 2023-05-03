import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const faqsList = [
    {
        id: '1',
        question: 'How to upload NFTs?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis fames tempor.',
        isExpanded: true,
    },
    {
        id: '2',
        question: 'How to logout from this app?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis fames tempor.',
        isExpanded: false,
    },
    {
        id: '3',
        question: 'How to create collection in this app?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis fames tempor.',
        isExpanded: false,
    },
    {
        id: '4',
        question: 'Is this app is free to use?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis fames tempor.',
        isExpanded: false,
    },
    {
        id: '5',
        question: 'How to upload NFTs?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis fames tempor.',
        isExpanded: false,
    },
    {
        id: '6',
        question: 'How to logout from this app?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis fames tempor.',
        isExpanded: false,
    },
    {
        id: '7',
        question: 'How to use this app?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis fames tempor.',
        isExpanded: false,
    },
    {
        id: '8',
        question: 'How to logout from this app?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis fames tempor.',
        isExpanded: false,
    },
    {
        id: '9',
        question: 'How to create collection in this app?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis fames tempor.',
        isExpanded: false,
    },
    {
        id: '10',
        question: 'Is this app is free to use?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis fames tempor.',
        isExpanded: false,
    },
    {
        id: '11',
        question: 'How to upload NFTs?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis fames tempor.',
        isExpanded: false,
    },
    {
        id: '12',
        question: 'How to logout from this app?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis fames tempor.',
        isExpanded: false,
    },
    {
        id: '13',
        question: 'How to use this app?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis fames tempor.',
        isExpanded: false,
    },
    {
        id: '15',
        question: 'How to create collection in this app?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis fames tempor.',
        isExpanded: false,
    },
    {
        id: '16',
        question: 'Is this app is free to use?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis fames tempor.',
        isExpanded: false,
    },
    {
        id: '17',
        question: 'How to upload NFTs?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis fames tempor.',
        isExpanded: false,
    },
    {
        id: '18',
        question: 'How to logout from this app?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis fames tempor.',
        isExpanded: false,
    },
];

const FaqsScreen = ({ navigation }) => {

    const [state, setState] = useState({
        faqsData: faqsList,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { faqsData } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {faqs()}
            </View>
        </SafeAreaView>
    )

    function updateFaqs({ id }) {
        const newList = faqsData.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, isExpanded: !item.isExpanded };
                return updatedItem;
            }
            return item;
        });
        updateState({ faqsData: newList })
    }

    function faqs() {
        const renderItem = ({ item }) => (
            <View style={styles.faqsWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateFaqs({ id: item.id })}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ flex: 1, ...Fonts.whiteColor16Medium }}>
                            {item.question}
                        </Text>
                        <MaterialIcons name={item.isExpanded ? "arrow-drop-up" : 'arrow-drop-down'} size={20} color={Colors.whiteColor} />
                    </View>
                    {
                        item.isExpanded
                            ?
                            <>
                                <View style={{ backgroundColor: 'rgba(255,255,255,0.1)', height: 1.0, marginVertical: Sizes.fixPadding }} />
                                <Text style={{ ...Fonts.grayColor13Medium }}>
                                    {item.answer}
                                </Text>
                            </>
                            :
                            null
                    }
                </TouchableOpacity>
            </View>
        )
        return (
            <FlatList
                data={faqsData}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, paddingBottom: Sizes.fixPadding }}
            />
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
                    FAQs
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
    faqsWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding * 2.0,
    }
});

export default FaqsScreen;
