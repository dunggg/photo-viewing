import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function WelcomeScreen({ navigation }) {
  useEffect(() => {
    setTimeout(function () {
      navigation.reset({ index: 1, routes: [{ name: "HomeScreen" }] });
    }, 5000);
  });
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={require("../assets/welcome.jpg")}
      >
        <View style={styles.viewText}>
          <Text style={{ fontSize: 50, color: "white" }}>ASIA HD+</Text>
          <Text style={{ color: "white", fontSize: 20 }}>
            Over 1,000,000 photo sharing free
          </Text>
        </View>
      </ImageBackground>
      <StatusBar style="auto" hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  viewText: {
    backgroundColor: "black",
    opacity: 0.7,
    height: "20%",
    width: "100%",
    alignItems: "center",
  },
});
