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

import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  // const [searchData, setSearchData] = useState([])

  const {
    fetchSearch,
    searchData: posts,
    isloading,
    latestPosts,
    fetchData,
    fetchLatest,
  } = useAppwrite();

  useEffect(() => {
    fetchSearch(query);
  }, [query]);

  console.log(posts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    // see if aly vidrio appears

    fetchSearch(query);
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
          <View className=" my-6 px-4  ">
            <View className=" ">
              <Text className=" font-pmedium text-sm text-gray-100">
                Search Results
              </Text>

              <Text className=" text-2xl font-psemibold text-white ">
                {" "}
                {query}
              </Text>

              <View className="mt-6 mb-8">
                <Searchinput initialQuery={query} />
              </View>
            </View>

            {/* this is for the latest video section */}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
