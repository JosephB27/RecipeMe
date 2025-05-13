import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Add type for RECIPE_DATA
interface RecipeDetailData {
  ingredients: string[];
  steps: string[];
  time: number;
  cuisine: string;
  creator: string;
}
const RECIPE_DATA: Record<string, RecipeDetailData> = {
  'Teriyaki Chicken': {
    ingredients: [
      '500g boneless chicken thighs',
      '1/4 cup soy sauce',
      '2 tbsp mirin',
      '2 tbsp sake',
      '1 tbsp sugar',
      '1 tbsp vegetable oil',
      '2 green onions, sliced',
      'Sesame seeds (for garnish)',
    ],
    steps: [
      'Mix soy sauce, mirin, sake, and sugar in a bowl to make the teriyaki sauce.',
      'Heat oil in a skillet over medium heat. Add chicken and cook until browned.',
      'Pour sauce over chicken and simmer until thickened and chicken is cooked through.',
      'Slice chicken, garnish with green onions and sesame seeds, and serve with sauce.',
    ],
    time: 25,
    cuisine: 'Japanese',
    creator: 'Wok & Skillet',
  },
  'Pasta Carbonara': {
    ingredients: [
      '200g spaghetti',
      '100g pancetta',
      '2 large eggs',
      '50g pecorino cheese',
      '50g parmesan',
      '2 cloves garlic',
      'Salt & black pepper',
    ],
    steps: [
      'Cook spaghetti in salted boiling water until al dente.',
      'Fry pancetta with garlic until crisp. Remove garlic.',
      'Beat eggs and mix with cheeses in a bowl.',
      'Drain pasta and combine quickly with pancetta and egg mixture off the heat.',
      'Season with salt and pepper, and serve immediately.',
    ],
    time: 30,
    cuisine: 'Italian',
    creator: 'Pasta Pro',
  },
};

type RecipeScreenProps = NativeStackScreenProps<RootStackParamList, 'Recipe'>;

export default function RecipeScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'Recipe'>>();
  const { recipe } = route.params as { recipe: { name: keyof typeof RECIPE_DATA } };
  const data = RECIPE_DATA[recipe.name];
  const [checked, setChecked] = useState<boolean[]>(Array(data.ingredients.length).fill(false));

  const handleCheck = (idx: number) => {
    setChecked((prev) => prev.map((c, i) => (i === idx ? !c : c)));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      {/* High-level info */}
      <Text style={styles.title}>{recipe.name}</Text>
      <Text style={styles.meta}>{data.cuisine} • {data.time} min • by {data.creator}</Text>
      {/* Ingredients */}
      <Text style={styles.sectionTitle}>Ingredients</Text>
      <View style={styles.ingredientList}>
        {data.ingredients.map((item: string, idx: number) => (
          <TouchableOpacity key={idx} onPress={() => handleCheck(idx)} style={styles.ingredientRow}>
            <CheckBox
              checked={checked[idx]}
              onPress={() => handleCheck(idx)}
              containerStyle={styles.checkbox}
            />
            <Text style={[styles.ingredientText, checked[idx] && styles.ingredientChecked]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Steps */}
      <Text style={styles.sectionTitle}>Steps</Text>
      <View style={styles.stepList}>
        {data.steps.map((step: string, idx: number) => (
          <View key={idx} style={styles.stepRow}>
            <View style={styles.stepNumber}><Text style={styles.stepNumberText}>{idx + 1}</Text></View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6E9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D2A26',
    marginBottom: 4,
  },
  meta: {
    color: '#8B8680',
    fontSize: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D2A26',
    marginTop: 24,
    marginBottom: 12,
  },
  ingredientList: {
    marginBottom: 16,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    padding: 0,
    marginRight: 12,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  ingredientText: {
    fontSize: 16,
    color: '#2D2A26',
  },
  ingredientChecked: {
    textDecorationLine: 'line-through',
    color: '#8B8680',
  },
  stepList: {
    marginBottom: 32,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF6B4A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#2D2A26',
  },
}); 