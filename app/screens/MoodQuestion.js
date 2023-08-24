import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

//componets
import AppButton from "../components/AppButton";

//config
import Colors from "../config/Colors";
import { FontFamily } from "../config/font";

const MoodQuestion = ({ onNext }) => {
  const [mood, setMood] = useState("");

  // Array of mood objects with title and image URL
  const moods = [
    { title: "Happy", image: require("../../assets/images/happy.jpg") },
    { title: "Sad", image: require("../../assets/images/sad.jpg") },
    { title: "Love", image: require("../../assets/images/love.jpg") },
    { title: "Anger", image: require("../../assets/images/anger.jpg") },
    // Add more moods as needed with their corresponding images
  ];

  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood);
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View style={{ width: "90%" }}>
        <Text
          style={{
            color: Colors.blacky,
            fontSize: RFPercentage(2),
            fontFamily: FontFamily.semiBold,
            marginBottom: RFPercentage(2),
          }}
        >
          How's your mood?
        </Text>
        <TextInput
          style={{
            width: "100%",
            backgroundColor: Colors.white,
            height: RFPercentage(5),
            borderRadius: RFPercentage(1),
            paddingHorizontal: RFPercentage(2),
          }}
          value={mood}
          onChangeText={(text) => setMood(text)}
          placeholder="Enter your mood"
        />
      </View>

      {/* Mood Cards */}
      <View style={styles.moodCardContainer}>
        {moods.map((moodItem) => (
          <TouchableOpacity
            key={moodItem.title}
            onPress={() => handleMoodSelect(moodItem.title)}
            style={styles.moodCard}
            activeOpacity={0.7}
          >
            <Image source={moodItem.image} style={styles.moodImage} />
            <Text style={styles.moodTitle}>{moodItem.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => onNext("mood", mood)}
        style={styles.loginbutton}
        activeOpacity={0.7}
      >
        <AppButton title="Next" buttonColor={Colors.blue} />
      </TouchableOpacity>
    </View>
  );
};

export default MoodQuestion;

const styles = StyleSheet.create({
  loginbutton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFPercentage(5),
  },
  moodCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: RFPercentage(2),
  },
  moodCard: {
    alignItems: "center",
    marginHorizontal: RFPercentage(0.5),
  },
  moodImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: RFPercentage(1),
  },
  moodTitle: {
    fontSize: RFPercentage(1.8),
    fontFamily: FontFamily.regular,
    color: Colors.blacky,
  },
});
