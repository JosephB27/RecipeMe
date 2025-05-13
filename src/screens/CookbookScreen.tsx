import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import RecipeCard from '../components/RecipeCard';
import RecipeScreen from './RecipeScreen';

type CookbookScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Cookbook'>;
};

// Temporary mock data
const mockRecipes = [
  {
    id: '1',
    name: 'Teriyaki Chicken',
    cuisine: 'Japanese',
    prepTime: 25,
    source: 'Wok & Skillet',
    image: 'https://images.sidechef.com/recipe/teriyaki-chicken.jpg',
    description: 'This super easy Teriyaki Chicken will be your new favorite go-to weeknight meal. The chicken is so flavorful, and the sauce is rich and thick. Nobody can resist!',
  },
  {
    id: '2',
    name: 'Pasta Carbonara',
    cuisine: 'Italian',
    prepTime: 30,
    source: 'Pasta Pro',
    image: 'https://images.sidechef.com/recipe/pasta-carbonara.jpg',
    description: 'Classic Italian comfort food with creamy sauce, crispy pancetta, and perfectly cooked pasta. Ready in just 30 minutes!',
  },
];

// Brand colors
const COLORS = {
  paprika: '#FF6B4A',
  mint: '#3DD6B6',
  eggshell: '#FFF6E9',
  espresso: '#2D2A26',
  mushroom: '#8B8680',
};

export default function CookbookScreen({ navigation }: CookbookScreenProps) {
  const [recipes] = useState(mockRecipes);

  const renderRecipeCard = ({ item }: { item: typeof mockRecipes[0] }) => (
    <RecipeCard
      name={item.name}
      cuisine={item.cuisine}
      prepTime={item.prepTime}
      source={item.source}
      image={item.image}
      description={item.description}
      onPress={() => navigation.navigate('Recipe', { recipe: item })}
    />
  );

  return (
    <View style={styles.container}>
      {recipes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text h4 style={styles.emptyStateText}>
            Your cookbook is empty!
          </Text>
          <Text style={styles.emptyStateSubtext}>
            Add your first viral recipe and start cooking with confidence.
          </Text>
          <Button
            title="Add Your First Recipe"
            onPress={() => navigation.navigate('AddRecipe')}
            buttonStyle={styles.addButton}
            icon={{
              name: 'plus',
              type: 'font-awesome',
              color: 'white',
            }}
          />
        </View>
      ) : (
        <FlatList
          data={recipes}
          renderItem={renderRecipeCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
      {/* TODO: Add confetti burst and haptic feedback on first recipe added */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.eggshell,
  },
  list: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: COLORS.eggshell,
  },
  emptyStateText: {
    color: COLORS.espresso,
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 24,
    maxWidth: 600,
  },
  emptyStateSubtext: {
    color: COLORS.mushroom,
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 16,
    maxWidth: 600,
  },
  addButton: {
    backgroundColor: COLORS.paprika,
    borderRadius: 16,
    padding: 16,
    shadowColor: COLORS.paprika,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
}); 