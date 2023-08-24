import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

//componets
import AppButton from "../components/AppButton";

//config
import Colors from "../config/Colors";
import { FontFamily } from "../config/font";

const LocationQuestion = ({ onNext }) => {
  const [location, setLocation] = useState("");

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
          Where are you?
        </Text>
        <TextInput
          style={{
            width: "100%",
            backgroundColor: Colors.white,
            height: RFPercentage(5),
            borderRadius: RFPercentage(1),
            paddingHorizontal: RFPercentage(2),
          }}
          value={location}
          onChangeText={(text) => setLocation(text)}
          placeholder="Enter your location"
        />
      </View>
      <TouchableOpacity
        onPress={() => onNext("location", location)}
        style={styles.loginbutton}
        activeOpacity={0.7}
      >
        <AppButton title="Next" buttonColor={Colors.blue} />
      </TouchableOpacity>
    </View>
  );
};

export default LocationQuestion;

const styles = StyleSheet.create({
  loginbutton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFPercentage(5),
  },
});
