import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import {
  ChevronRightIcon,
  StarIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      long,
      lat,
      dishes,
    },
  } = useRoute();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        long,
        lat,
        dishes,
      })
    );
  }, []);

  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className="relative">
          <Image
            className="w-full bg-gray-300 p-4 h-56"
            source={{ uri: urlFor(imgUrl).url() }}
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute p-2 top-8 left-5
        bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon size={20} color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="px-2 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color={"green"} opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">{rating}</Text> . {genre}
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <MapPinIcon color={"gray"} opacity={0.4} size={22} />
                <Text className="text-xs text-gray-500">
                  Nearby . {address}{" "}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
          </View>
          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon color={"gray"} opacity={0.6} size={20} />
            <Text className="flex-1 pl-2 text-base font-bold">
              Have a food allergy?
            </Text>
            <ChevronRightIcon color={"#00CCBB"} size={20} />
          </TouchableOpacity>
        </View>
        <View className="pb-36">
          <Text className="pt-6 mb-3 font-bold text-xl px-2">Menu</Text>
          {/* Dishes */}
          {dishes?.map((item) => (
            <DishRow
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.short_description}
              price={item.price}
              image={item.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
