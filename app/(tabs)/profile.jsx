import React, { useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { FlatList } from "react-native-gesture-handler";
import EmptyState from "@/components/EmptyState";
import VideoCard from "@/components/VideoCard";
import { useState } from "react";
import { FlatList } from "react-native";
import useAppwrite from "../../lib/useAppwrite";
import { router } from "expo-router";

import { icons } from "@/constants";

import { RefreshControl } from "react-native";

import InfoBox from "../../components/InfoBox";

import { useGlobalContext } from "@/context/GlobalProvider";
import { signOut } from "@/lib/appwrite";

const Profile = () => {
  // const [searchData, setSearchData] = useState([])

  const { isLoading, isLoggedIn, setIsLoggedIn, user, setUser } =
    useGlobalContext();

  const {
    fetchSearch,

    isloading,
    latestPosts,
    fetchData,
    fetchLatest,
    fetchUserPost,
    userPost: posts,
  } = useAppwrite();

  useEffect(() => {
    fetchUserPost();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    // see if aly vidrio appears
    // fetchSearch();
  };

  // functions that says logout

  const logOut = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/signin");
  };
  return (
    <SafeAreaView className="  h-full bg-primary">
      <FlatList
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="no videos found for this query"
          />
          // <Text> this s empt</Text>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center flex-col items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logOut}
              className=" border-2 w-full  items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center ">
              <Image
                className="w-[90%] h-[90%] rounded-lg "
                resizeMode="cover"
                source={{ uri: user?.avatar }}
              />
            </View>
            {/* render info box component */}
            <View className="justify-center w-full">
              <InfoBox
                title={user?.username}
                containerStyles="mt-5"
                titleStyles="text-lg  "
              />
              <InfoBox
                title={posts.length || 0}
                subtitle="posts"
                containerStyles="mt-5"
                titleStyles="text-xl"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                containerStyles="mt-5"
                titleStyles="text-xl "
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
