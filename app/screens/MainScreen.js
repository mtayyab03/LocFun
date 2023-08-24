import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { RFPercentage } from "react-native-responsive-fontsize";
import axios from "axios";

// components
import LocationQuestion from "./LocationQuestion";
import MoodQuestion from "./MoodQuestion";
import InterestsQuestion from "./InterestsQuestion";

//config
import Colors from "../config/Colors";
import { FontFamily } from "../config/font";

const API_KEY = "AIzaSyAZfh0HjBRPtgd2Y6bAVEbIvUSPJgyisj0";
const BASE_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

const MainScreen = () => {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState("");
  const [mood, setMood] = useState("");
  const [interests, setInterests] = useState("");
  const [top3Places, setTop3Places] = useState([]);

  const handleNext = async (field, value) => {
    switch (step) {
      case 1:
        setLocation(value);
        setStep(step + 1);
        break;
      case 2:
        setMood(value);
        setStep(step + 1);
        break;
      case 3:
        setInterests(value);

        // Fetch top 3 things to do based on user interests and location
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status === "granted") {
            const { coords } = await Location.getCurrentPositionAsync({});
            const latitude = coords.latitude;
            const longitude = coords.longitude;
            const radius = 5000; // Search radius in meters

            const response = await axios.get(BASE_URL, {
              params: {
                key: API_KEY,
                location: `${latitude},${longitude}`,
                radius,
                type: "tourist_attraction",
                keyword: interests,
              },
            });
            console.log("API Response:", response.data);

            const top3Results = response.data.results.slice(0, 3);
            setTop3Places(top3Results.map((place) => place.name));
          } else {
            console.log("Location permission denied");
          }
        } catch (error) {
          console.error("Error fetching top 3 things to do:", error);
        }

        setStep(step + 1);
        break;
      default:
        break;
    }
  };

  const handleChange = () => {
    // When the "Change" button is clicked, set the step back to the respective step
    // and reset the top3Places state to an empty array.
    if (step === 4) {
      setStep(2); // Go back to MoodQuestion
      setTop3Places([]); // Reset the suggested places
    } else if (step === 3) {
      setStep(1); // Go back to InterestsQuestion
      setTop3Places([]); // Reset the suggested places
    }
  };

  return (
    <View style={{ marginTop: RFPercentage(8) }}>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            marginBottom: RFPercentage(4),
            marginTop: RFPercentage(4),
            fontSize: RFPercentage(2.7),
          }}
        >
          Hi Sunshine !
        </Text>
      </View>
      {step === 1 && <LocationQuestion onNext={handleNext} />}
      {step === 2 && <MoodQuestion onNext={handleNext} />}
      {step === 3 && <InterestsQuestion onNext={handleNext} />}
      {step === 4 && (
        <View style={{ width: "100%", marginLeft: RFPercentage(5) }}>
          <Text
            style={{
              marginBottom: RFPercentage(2),
              color: Colors.blacky,
              fontSize: RFPercentage(2),
              fontFamily: FontFamily.semiBold,
            }}
          >
            Top 3 things to do in your area:
          </Text>
          {top3Places.map((place, index) => (
            <Text
              style={{
                marginTop: RFPercentage(1),
                color: Colors.blacky,
                fontSize: RFPercentage(2),
                fontFamily: FontFamily.medium,
              }}
              key={index}
            >{`${index + 1}. ${place}`}</Text>
          ))}

          {/* "Change" button */}
          <TouchableOpacity onPress={handleChange} style={styles.changeButton}>
            <Text style={styles.changeButtonText}>refresh</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  changeButton: {
    backgroundColor: Colors.blue,
    paddingHorizontal: RFPercentage(3),
    paddingVertical: RFPercentage(1),
    borderRadius: RFPercentage(1),
    alignSelf: "flex-start",
    marginTop: RFPercentage(2),
  },
  changeButtonText: {
    color: Colors.white,
    fontSize: RFPercentage(2),
    fontFamily: FontFamily.regular,
  },
});
