import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Image, Alert, BackHandler } from "react-native";
import MainScreen from "./MainScreen";
import AboutScreen from "./AboutScreen";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Exit"
        onPress={() =>
          Alert.alert(
            "Exit",
            "Bạn có chắc chắn muốn thoát ứng dụng ?",
            [
              {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
              },
              { text: "OK", onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false }
          )
        }
      />
    </DrawerContentScrollView>
  );
}

export default function HomeScreen() {
  return (
    <Drawer.Navigator
      backBehavior={"none"}
      drawerContentOptions={{
        activeBackgroundColor: "pink",
        activeTintColor: "black",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName={"MainScreen"}
    >
      <Drawer.Screen
        options={{ title: "Home", headerBackTitle: "abc" }}
        name="MainScreen"
        component={MainScreen}
      />
      <Drawer.Screen
        options={{ title: "About" }}
        name="AboutScreen"
        component={AboutScreen}
      />
    </Drawer.Navigator>
  );
}
