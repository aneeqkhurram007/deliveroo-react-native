import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import client from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setrestaurants] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `
  *[_type=="featured" && _id==$id]{
    ...,
    restaurants[]->{
      ...,
      dishes[]->,
      type->{
        name
      }
    }
  }[0]
  `,
        { id }
      )
      .then((data) => {
        setrestaurants(data?.restaurants);
      });
  }, []);
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-2">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color={"#00CCBB"} />
      </View>
      <Text className="text-xs px-2 text-gray-500">{description}</Text>
      <ScrollView
        horizontal
        className="px-2 pt-4"
        showsHorizontalScrollIndicator={false}
      >
        {/* Restaurant Cards */}
        {restaurants?.map((item) => (
          <RestaurantCard
            key={item._id}
            id={item._id}
            imgUrl={item.image}
            title={item.name}
            rating={item.rating}
            genre={item.type?.name}
            address={item.address}
            short_description={item.short_description}
            long={item.long}
            lat={item.lat}
            dishes={item.dishes}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
