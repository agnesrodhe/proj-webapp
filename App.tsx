import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import Home from "./components/Home";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Base } from './styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrainDelays from "./components/TrainDelays";
import { useState, useEffect } from "react";
import FlashMessage from 'react-native-flash-message';
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();
const routeIcons = {
  "Start": "home",
  "Förseningar": "map-outline",
};

export default function App() {
  const [delays, setDelays] = useState([]);

  return (
    <SafeAreaView style={Base.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = routeIcons[route.name] || "alert";

              return <Ionicons name={iconName} size ={size} color={color} />;
            },
            tabBarActiveTintColor: '#EBC219',
            tabBarInactiveTintColor: 'black',
            headerShown: false,
            tabBarStyle:{
              backgroundColor:'#EBC219',
            },
            tabBarActiveBackgroundColor: 'black',
          })}
        >
          <Tab.Screen name="Start" component={Home} />
          <Tab.Screen name="Förseningar">
          {() => <TrainDelays delays={delays} setDelays={setDelays} />}
          </Tab.Screen>          
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
      <FlashMessage position="top" />
    </SafeAreaView>
  );
}

