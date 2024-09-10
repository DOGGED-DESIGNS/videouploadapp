import { StyleSheet, Text, View, Image, ScrollView, Alert } from "react-native";
import React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import { ScrollView } from "react-native-gesture-handler";
import { images } from "../../constants";
// import FormField from "../../components/FormField";
// import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Link, router } from "expo-router";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { createUser } from "../../lib/appwrite";

const SignIn = () => {
  const { isLoading, isLoggedIn, setIsLoggedIn, setIsLoading, user, setUser } =
    useGlobalContext();

  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  // create a submit function

  const submit = async () => {
    setIsSubmitting(true);
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Oga! please fill all form fields");
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);
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
            Sign up to Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            otherStyles=" mt-7 "
            handleChangeText={(e) =>
              setForm({
                ...form,
                username: e,
              })
            }
          />
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
              Have an account already?
            </Text>

            <Link
              href={"/signin"}
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
