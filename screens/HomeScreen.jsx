import { Text, View, Image, TextInput, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setfeaturedCategories] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type=="featured"]{
      ...,
      restaurants[]->{
        ...,
        dishes[]->
      }
    }
    `
      )
      .then((data) => {
        setfeaturedCategories(data);
      });
  }, []);
  return (
    <View className="pt-10 bg-white">
      {/* Header */}
      <View className="flex-row pb-3 space-x-2 px-1 items-center w-full">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-xs text-gray-400">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color={"#00CCBB"} />
          </Text>
        </View>
        <UserIcon size={35} color={"#00CCBB"} />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 px-2">
        <View className="flex-row space-x-2 items-center bg-gray-200 text-xs flex-1 p-2">
          <MagnifyingGlassIcon color={"gray"} size={20} />
          <TextInput placeholder="Restaurants and Cuisines" />
        </View>
        <AdjustmentsVerticalIcon color={"#00CCBB"} />
      </View>

      {/* Body */}
      <ScrollView className="bg-gray-100 pb-24">
        {/* Categories */}
        <Categories />
        {/* Featured Rows */}
        {featuredCategories?.map((item) => (
          <FeaturedRow
            key={item._id}
            id={item._id}
            title={item.name}
            description={item.short_description}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
