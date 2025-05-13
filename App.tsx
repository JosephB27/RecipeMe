import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { BlurView } from 'expo-blur';

// Import screens (to be created)
import HomeScreen from './src/screens/HomeScreen';
import AddRecipeScreen from './src/screens/AddRecipeScreen';
import CookbookScreen from './src/screens/CookbookScreen';
import RecipeScreen from './src/screens/RecipeScreen';

export type RootStackParamList = {
  Home: undefined;
  AddRecipe: undefined;
  Cookbook: undefined;
  Recipe: { recipe: { name: string } };
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

// Simple avatar icon (replace with user image if available)
const Avatar = () => (
  <TouchableOpacity style={{ marginRight: 16 }} onPress={() => {}}>
    <Image
      source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
      style={{ width: 32, height: 32, borderRadius: 16 }}
    />
  </TouchableOpacity>
);

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'RecipeMe',
          headerTitleAlign: 'center',
          headerRight: () => <Avatar />,
        }}
      />
    </Stack.Navigator>
  );
}

function AddRecipeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddRecipe"
        component={AddRecipeScreen}
        options={{
          headerTitle: 'Add Recipe',
          headerTitleAlign: 'center',
          headerRight: () => <Avatar />,
        }}
      />
    </Stack.Navigator>
  );
}

function CookbookStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cookbook"
        component={CookbookScreen}
        options={{
          headerTitle: 'My Cookbook',
          headerTitleAlign: 'center',
          headerRight: () => <Avatar />,
        }}
      />
      <Stack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{
          headerTitle: 'Recipe',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              if (route.name === 'Home') {
                return <Icon name="home" type="feather" color={color} size={size} />;
              } else if (route.name === 'AddRecipe') {
                return <Icon name="plus-circle" type="feather" color={color} size={size} />;
              } else if (route.name === 'Cookbook') {
                return <Icon name="book" type="feather" color={color} size={size} />;
              }
              return null;
            },
            tabBarActiveTintColor: '#FF6B4A',
            tabBarInactiveTintColor: '#8B8680',
            tabBarStyle: {
              height: 64,
              paddingBottom: 8,
              paddingTop: 8,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 246, 233, 0.7)', // eggshell with opacity
              borderTopWidth: 0,
              overflow: 'hidden',
            },
            headerShown: false,
            tabBarBackground: () => (
              // @ts-ignore
              <BlurView
                intensity={40}
                tint="light"
                style={{ flex: 1, backgroundColor: 'rgba(255, 246, 233, 0.7)', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
              />
            ),
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} options={{ tabBarLabel: 'Home' }} />
          <Tab.Screen name="AddRecipe" component={AddRecipeStack} options={{ tabBarLabel: 'Add' }} />
          <Tab.Screen name="Cookbook" component={CookbookStack} options={{ tabBarLabel: 'Cookbook' }} />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
} 