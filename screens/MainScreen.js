import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

export default function MainScreen({ navigation }) {
  const [image, setImage] = useState([]);
  useEffect(() => {
    fetch(
      "https://www.flickr.com/services/rest/?method=flickr.favorites.getList&api_key=e3e2d83400360a7ecd1e86a76e1a9679&user_id=191848862%40N04&extras=description%2C+license%2C+date_upload%2C+date_taken%2C+owner_name%2C+icon_server%2C+original_format%2C+last_update%2C+geo%2C+tags%2C+machine_tags%2C+o_dims%2C+views%2C+media%2C+path_alias%2C+url_sq%2C+url_t%2C+url_s%2C+url_q%2C+url_m%2C+url_n%2C+url_z%2C+url_c%2C+url_l%2C+url_o&per_page=500&page=1&format=json&nojsoncallback=1"
    )
      .then((response) => response.json())
      .then((result) => {
        setImage(result.photos.photo);
      })
      .catch((error) => console.log("error", error));
  });
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        style={{ flex: 1 }}
        data={image}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.viewWrapImage}>
              <TouchableOpacity
                style={{
                  height: 120,
                  flex: 1,
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}
                onPress={() =>
                  navigation.navigate("ShowImageScreen", {
                    image: image,
                    index: index,
                  })
                }
              >
                <ImageBackground
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "flex-end",
                  }}
                  imageStyle={{ borderRadius: 6 }}
                  source={{ uri: item.url_z }}
                >
                  <Image
                    style={{ height: 20, width: 20 }}
                    source={require("../assets/view.png")}
                  />
                  <Text style={{ color: "white" }}>{item.views}</Text>
                </ImageBackground>
              </TouchableOpacity>
              <StatusBar animated={true} style="auto" hidden={false} />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
  },
  viewWrapImage: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
  },
});
