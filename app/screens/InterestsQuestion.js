import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

//componets
import AppButton from "../components/AppButton";

//config
import Colors from "../config/Colors";
import { FontFamily } from "../config/font";

const InterestsQuestion = ({ onNext }) => {
  const [interests, setInterests] = useState("");

  // Array of interest objects with title and image URL
  const interestData = [
    { title: "Arts&Crafts", image: require("../../assets/images/art.png") },
    {
      title: "Technology&Computing",
      image: require("../../assets/images/tech.jpeg"),
    },
    {
      title: "HealthandWelness",
      image: require("../../assets/images/health.jpeg"),
    },
    {
      title: "Science&Nature",
      image: require("../../assets/images/nature.jpeg"),
    },
    {
      title: "Travel&Adventure",
      image: require("../../assets/images/park.jpg"),
    },
    { title: "Food&Cooking", image: require("../../assets/images/food.jpeg") },
    {
      title: "Business&Finance",
      image: require("../../assets/images/finance.png"),
    },
    {
      title: "Education&Learning",
      image: require("../../assets/images/education.png"),
    },
    {
      title: "Social&CommunityActivities",
      image: require("../../assets/images/social.png"),
    },

    {
      title: "Fashion&Beauty",
      image: require("../../assets/images/fashion.jpeg"),
    },
    {
      title: "Spirituality&Religion",
      image: require("../../assets/images/relegion.jpeg"),
    },
    // Add more interests as needed with their corresponding images
  ];

  const handleInterestSelect = (selectedInterest) => {
    setInterests(selectedInterest);
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
          What are your interests?
        </Text>
        <TextInput
          style={{
            width: "100%",
            backgroundColor: Colors.white,
            height: RFPercentage(5),
            borderRadius: RFPercentage(1),
            paddingHorizontal: RFPercentage(2),
          }}
          value={interests}
          onChangeText={(text) => setInterests(text)}
          placeholder="Enter your interests"
        />
      </View>

      {/* Interest Cards */}
      <ScrollView
        contentContainerStyle={{
          marginLeft: RFPercentage(3),
          paddingRight: 30,
          flexDirection: "row",
        }}
        style={{ flexShrink: 0 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.interestCardContainer}>
          {interestData.map((interestItem) => (
            <TouchableOpacity
              key={interestItem.title}
              onPress={() => handleInterestSelect(interestItem.title)}
              style={styles.interestCard}
              activeOpacity={0.7}
            >
              <Image source={interestItem.image} style={styles.interestImage} />
              <Text style={styles.interestTitle}>{interestItem.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => onNext("interests", interests)}
        style={styles.loginbutton}
        activeOpacity={0.7}
      >
        <AppButton title="Next" buttonColor={Colors.blue} />
      </TouchableOpacity>
    </View>
  );
};

export default InterestsQuestion;

const styles = StyleSheet.create({
  loginbutton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFPercentage(5),
  },
  interestCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: RFPercentage(2),
  },
  interestCard: {
    width: RFPercentage(12),
    alignItems: "center",
    marginHorizontal: RFPercentage(1),
  },
  interestImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: RFPercentage(1),
  },
  interestTitle: {
    fontSize: RFPercentage(1.4),
    fontFamily: FontFamily.semiBold,
    color: Colors.blacky,
    textAlign: "center",
  },
});
