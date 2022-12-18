import { View, Text } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreOrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);

  return (
    <View className="bg-[#00CCBB] flex-1 justify-center items-center">
      <Animatable.Image
        source={{ uri: "https://links.papareact.com/wru" }}
        animation="slideInUp"
        iterationCount={1}
        className="h-80 w-80"
      />
      <Animatable.Text
        animation={"slideInUp"}
        iterationCount={1}
        className="text-lg my-10 text-white font-bold text-center"
      >
        Waiting for Restaurant to accept your delivery
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color="white" />
    </View>
  );
};

export default PreOrderScreen;
