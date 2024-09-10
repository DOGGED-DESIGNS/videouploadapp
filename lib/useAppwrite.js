import { useEffect, useState } from "react";
import {
  getAllPosts,
  getLatestPosts,
  searchPost,
  getUserPosts,
} from "./appwrite";
import { Alert } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
const useAppwrite = (fn) => {
  const { isLoading, isLoggedIn, setIsLoggedIn, user, setUser } =
    useGlobalContext();
  const [posts, setPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const [userPost, setUserPost] = useState([]);

  const fetchUserPost = async () => {
    try {
      console.log("below is the user id");
      console.log(user.$id);
      const response = await getUserPosts(user.$id);

      setUserPost(response);
      console.log("below is the users post");
      console.log(response);
    } catch (error) {
      Alert.alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSearch = async (query) => {
    setIsLoading(true);
    try {
      const response = await searchPost(query);

      setSearchData(response);
    } catch (error) {
      Alert.alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLatest = async () => {
    setIsLoading(true);
    try {
      const response = await getLatestPosts();
      setLatestPosts(response);
      console.log("below is the latest posts");
      console.log(response);
    } catch (error) {
      Alert.alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getAllPosts();
      setPosts(response);
    } catch (error) {
      Alert.alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchLatest();
  }, []);

  // const refetch = async () => await fetchData();
  // const refetchLatest = async ( ) =>await fetchLatest()
  return {
    latestPosts,
    posts,
    searchData,
    isloading,
    fetchSearch,
    fetchData,
    fetchLatest,
    fetchUserPost,

    userPost,
  };
};

export default useAppwrite;
