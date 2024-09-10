import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { useState } from "react";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { icons } from "../constants";
import { usePathname } from "expo-router";
import { router } from "expo-router";

const Searchinput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  initialQuery,
  ...props
}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      className=" border-2 flex-row border-black-100 w-full h-16 px-4 bg-black-100
   rounded-2xl space-x-4 focus:border-secondary items-center"
    >
      <TextInput
        className=" tex-base mt-0.5 flex-1  text-white font-pregular "
        value={query}
        placeholder={"Search for a video topic"}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}

        // secureTextEntry={title === "password" && !showPassword}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "please inpute something to search result across database"
            );
          }

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
      {/* {title === "password" && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={!showPassword ? icons.eye : icons.eyeHide}
            resizeMode="contain"
            className="w-6 h-6"
          />
        </TouchableOpacity>
      )} */}
    </View>
  );
};

export default Searchinput;

const styles = StyleSheet.create({});
