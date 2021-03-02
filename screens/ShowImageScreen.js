import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  Modal,
  Alert,
  Linking,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import { FloatingAction } from "react-native-floating-action";
import * as Notifications from "expo-notifications";
import ImageViewer from "react-native-image-zoom-viewer";

function prensentNotification() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  Notifications.scheduleNotificationAsync({
    content: {
      title: "Download",
      body: "Downloaded Successfully !",
    },
    trigger: {
      seconds: 1,
    },
  });
}

export default function WelcomeScreen({ route, navigation }) {
  let index = route.params.index;
  const [urlIndex, updateUrl] = useState(index);
  const images = route.params.image.map((image) => {
    var img = {};
    img["url"] = image.url_c;
    return img;
  });
  const actions = [
    {
      text: "498 x 500",
      icon: require("../assets/dowloadicon.png"),
      name: route.params.image[urlIndex].url_m,
      position: 2,
      color: "red",
    },
    {
      text: "1021 x 1024",
      icon: require("../assets/dowloadicon.png"),
      name: route.params.image[urlIndex].url_l,
      position: 1,
      color: "red",
    },
    {
      text: "75 x 75",
      icon: require("../assets/dowloadicon.png"),
      name: route.params.image[urlIndex].url_sq,
      position: 3,
      color: "red",
    },
  ];

  function dowloadImage(url) {
    const fileUri = FileSystem.documentDirectory + "image.jpg";
    FileSystem.downloadAsync(url, fileUri)
      .then(({ uri }) => {
        Permissions.getAsync(Permissions.MEDIA_LIBRARY_WRITE_ONLY).then(
          (permissions) => {
            if (permissions.status === "granted") {
              MediaLibrary.saveToLibraryAsync(uri)
                .then((result) => {
                  prensentNotification();
                })
                .catch((error) => console.log("MediaLibrayry", error));
            } else {
              Alert.alert(
                "Permission",
                "Vui lòng cấp quyền cho app trước khi tải xuống nội dung này",
                [
                  { text: "Cancel", onPress: () => {} },
                  { text: "OK", onPress: () => Linking.openSettings() },
                ],
                { cancelable: false }
              );
            }
          }
        );
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    Permissions.askAsync(Permissions.MEDIA_LIBRARY_WRITE_ONLY);
  });

  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={{ uri: route.params.url_c }} /> */}
      <Modal
        onRequestClose={() => navigation.goBack()}
        visible={true}
        transparent={true}
      >
        <ImageViewer
          renderIndicator={() => null}
          enablePreload={true}
          onChange={(number) => {
            index = number;
            updateUrl(index);
          }}
          index={index}
          saveToLocalByLongPress={false}
          imageUrls={images}
        />
        <FloatingAction
          color={"red"}
          floatingIcon={require("../assets/dowloadicon.png")}
          actions={actions}
          onPressItem={(name) => {
            dowloadImage(name);
          }}
        />
      </Modal>

      <StatusBar style="auto" hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    resizeMode: "cover",
    width: "100%",
    height: "50%",
    position: "absolute",
  },
});
