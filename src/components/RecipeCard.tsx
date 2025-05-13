import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';

export type RecipeCardProps = {
  name: string;
  cuisine: string;
  prepTime: number;
  source: string;
  image: string;
  description: string;
  onPress?: () => void;
};

export default function RecipeCard({
  name,
  cuisine,
  prepTime,
  source,
  image,
  description,
  onPress,
}: RecipeCardProps) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      <View style={styles.contentContainer}>
        <Text style={styles.label}>RECIPE</Text>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.author}>by <Text style={styles.authorName}>{source}</Text></Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
  },
  contentContainer: {
    padding: 20,
  },
  label: {
    color: '#8B8680',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D2A26',
    marginBottom: 2,
  },
  author: {
    color: '#8B8680',
    fontSize: 14,
    marginBottom: 12,
  },
  authorName: {
    fontWeight: 'bold',
    color: '#2D2A26',
  },
  description: {
    color: '#2D2A26',
    fontSize: 15,
    marginBottom: 18,
    marginTop: 6,
  },
}); 