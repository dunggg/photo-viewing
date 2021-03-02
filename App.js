import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Paragraph, Menu, Divider, Provider } from "react-native-paper";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { WelcomeScreen, HomeScreen, ShowImageScreen } from "./screens/index";

const Stack = createStackNavigator();

export default function App() {
  const [visible, setVisible] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen
          options={{ headerShown: false }}
          name="WelcomeScreen"
          component={WelcomeScreen}
        />
        <Stack.Screen
          options={({ navigation, route }) => ({
            headerStyle: { backgroundColor: "white" },
            headerTitle: "",
            headerTitleAlign: "center",
            headerLeft: (props) => (
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
              >
                <Image
                  style={{ height: 30, width: 30 }}
                  source={require("./assets/menu.png")}
                />
              </TouchableOpacity>
            ),
            headerLeftContainerStyle: { marginLeft: 10 },
          })}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ShowImageScreen"
          component={ShowImageScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
