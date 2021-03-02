import React, { useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View, Linking } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 35, color: "black" }}>ASIA HD+</Text>
      <Text style={{ color: "black", fontSize: 10 }}>
        Over 1,000,000 photo sharing free
      </Text>
      <Text
        style={{ color: "blue" }}
        onPress={() => Linking.openURL("https://www.flickr.com/")}
      >
        https://www.flickr.com/
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
