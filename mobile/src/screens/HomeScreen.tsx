import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

// Brand colors
const COLORS = {
  paprika: '#FF6B4A',
  mint: '#3DD6B6',
  eggshell: '#FFF6E9',
  espresso: '#2D2A26',
  mushroom: '#8B8680',
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text h1 style={styles.title}>From Clip → Kitchen</Text>
      <Text style={styles.subtitle}>
        Effortlessly turn viral videos into kitchen-ready recipes. You've got this—let's whisk it up!
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Add Recipe"
          onPress={() => navigation.navigate('AddRecipe')}
          buttonStyle={styles.button}
          icon={{
            name: 'plus',
            type: 'font-awesome',
            color: 'white'
          }}
        />
        
        <Button
          title="My Cookbook"
          onPress={() => navigation.navigate('Cookbook')}
          buttonStyle={[styles.button, styles.cookbookButton]}
          icon={{
            name: 'book',
            type: 'font-awesome',
            color: 'white'
          }}
        />
      </View>
      {/* TODO: Add confetti burst on first recipe import */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.eggshell,
  },
  title: {
    marginBottom: 12,
    textAlign: 'center',
    color: COLORS.espresso,
    fontWeight: '600',
    fontSize: 32,
    letterSpacing: 0.5,
    maxWidth: 600,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 40,
    color: COLORS.mushroom,
    fontSize: 18,
    maxWidth: 600,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
    gap: 20,
  },
  button: {
    backgroundColor: COLORS.paprika,
    borderRadius: 16,
    padding: 16,
    shadowColor: COLORS.paprika,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  cookbookButton: {
    backgroundColor: COLORS.mint,
  },
}); 