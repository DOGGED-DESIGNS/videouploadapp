import { StyleSheet, Text, View, Image, ScrollView, Alert } from "react-native";
import React from "react";
import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
// import { ScrollView } from "react-native-gesture-handler";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appwrite";

import { useGlobalContext } from "@/context/GlobalProvider";

const SignIn = () => {
  const { isLoading, isLoggedIn, setIsLoggedIn, setIsLoading, user, setUser } =
    useGlobalContext();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // create a submit function

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }
    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);
      Alert.alert("Success", "user signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // use state snippet

  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center      min-h-[83vh] px-4 my-6">
          <Image
            resizeMode="contain"
            source={images.logo}
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Login to dogged app
          </Text>

          <FormField
            title="Email"
            value={form.email}
            otherStyles=" mt-7 "
            handleChangeText={(e) =>
              setForm({
                ...form,
                email: e,
              })
            }
          />
          <FormField
            title="password"
            value={form.password}
            otherStyles="mt-7"
            handleChangeText={(e) =>
              setForm({
                ...form,
                password: e,
              })
            }
          />

          <CustomButton
            isLoading={isSubmitting}
            containerStyles="mt-7"
            title="sign in"
            handlePress={() => {
              submit();
            }}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Dont't have account?
            </Text>

            <Link
              href={"/signup"}
              className="text-lg font-psemibold text-secondary "
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
