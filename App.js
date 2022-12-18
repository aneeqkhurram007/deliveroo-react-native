import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import BasketScreen from './screens/BasketScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import HomeScreen from './screens/HomeScreen';
import PreOrderScreen from './screens/PreOrderScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import store from './store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          {/* Screens */}
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Restaurant' component={RestaurantScreen} />
          <Stack.Screen name='Basket' component={BasketScreen} options={{
            presentation: "modal", headerShown: false
          }} />
          <Stack.Screen name='PreOrder' component={PreOrderScreen} options={{
            presentation: "fullScreenModal", headerShown: false
          }} />
          <Stack.Screen name='Delivery' component={DeliveryScreen} options={{
            presentation: "fullScreenModal", headerShown: false
          }} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
