import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import { FlatList } from "react-native-gesture-handler";
import EmptyState from "@/components/EmptyState";
import { FlatList } from "react-native";
import Trending from "@/components/Tending";
import useAppwrite from "../../lib/useAppwrite";
import { useState } from "react";
import VideoCard from "@/components/VideoCard";
import Searchinput from "@/components/Searchinput";

import { images } from "@/constants";

import { RefreshControl } from "react-native";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";

const Home = () => {
  const { posts, isloading, latestPosts, fetchData, fetchLatest } =
    useAppwrite();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    await fetchLatest();
    // see if aly vidrio appears

    setRefreshing(false);
  };

  return (
    <SafeAreaView className="  h-full bg-primary">
      <FlatList
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className=" my-6 px-4 space-y-6  ">
            <View className=" justify-between items-start flex-row mb-6 ">
              <View>
                <Text className=" font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>

                <Text className=" text-2xl font-psemibold text-white ">
                  {" "}
                  DoggedDesigns{" "}
                </Text>
              </View>
              <View className=" mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <Searchinput />

            {/* this is for the latest video section */}

            <View className="w-full flex-1 pt-5 pb-9">
              <Text className=" text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
