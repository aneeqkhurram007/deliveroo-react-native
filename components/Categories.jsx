import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import client, { urlFor } from "../sanity";

const Categories = () => {
  const [categories, setcategories] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `
   *[type=="category"]`
      )
      .then((data) => {
        setcategories(data);
      });
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="p-2 pt-3"
    >
      {/* Category Card */}
      {categories?.map((item) => (
        <CategoryCard
          key={item._id}
          imgUrl={urlFor(item.image).width(200).url()}
          title={item.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
