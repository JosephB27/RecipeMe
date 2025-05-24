import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { ProgressBar } from 'react-native-paper';

type AddRecipeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddRecipe'>;
};

// Brand colors
const COLORS = {
  paprika: '#FF6B4A',
  mint: '#3DD6B6',
  eggshell: '#FFF6E9',
  espresso: '#2D2A26',
  mushroom: '#8B8680',
};

export default function AddRecipeScreen({ navigation }: AddRecipeScreenProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Dummy processing queue data
  const [processingQueue, setProcessingQueue] = useState([
    {
      id: '1',
      active: true,
      title: 'Teriyaki Chicken',
      description: 'Extracting ingredients from TikTok...',
      progress: 0.6,
      thumbnail: 'https://images.sidechef.com/recipe/teriyaki-chicken.jpg',
    },
    {
      id: '2',
      active: false,
      title: 'Pasta Carbonara',
      description: 'Waiting for available slot...',
      progress: 0.0,
      thumbnail: 'https://images.sidechef.com/recipe/pasta-carbonara.jpg',
    },
  ]);

  const handleCancel = (id: string) => {
    setProcessingQueue((queue) => queue.filter((job) => job.id !== id));
  };

  const handleSubmit = async () => {
    if (!url) {
      // TODO: Show error message
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement recipe processing logic
      // This will be connected to the backend service
      console.log('Processing URL:', url);
      
      // Navigate to Cookbook after successful processing
      navigation.navigate('Cookbook');
    } catch (error) {
      console.error('Error processing recipe:', error);
      // TODO: Show error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text h2 style={styles.title}>Add a Viral Recipe</Text>
      <Text style={styles.subtitle}>
        Paste a link from TikTok, Instagram, or YouTube Shorts and watch the magic happen. Boom! Ingredients sorted.
      </Text>
      <View style={styles.form}>
        <Input
          placeholder="Paste recipe URL here"
          value={url}
          onChangeText={setUrl}
          autoCapitalize="none"
          autoCorrect={false}
          leftIcon={{
            type: 'font-awesome',
            name: 'link',
            color: COLORS.paprika,
          }}
          inputStyle={{ color: COLORS.espresso }}
        />
        <Button
          title="Process Recipe"
          onPress={handleSubmit}
          loading={isLoading}
          disabled={isLoading || !url}
          buttonStyle={styles.button}
          icon={{
            name: 'magic',
            type: 'font-awesome',
            color: 'white',
          }}
        />
      </View>

      {/* Processing Queue Section */}
      {processingQueue.length > 0 && (
        <View style={styles.queueSection}>
          <Text style={styles.queueTitle}>Processing Queue</Text>
          {processingQueue.map((job) => (
            <View key={job.id} style={styles.queueCard}>
              <View style={styles.queueHeader}>
                <View style={[styles.queueStatusDot, { backgroundColor: job.active ? COLORS.paprika : COLORS.mushroom }]} />
                <Text style={styles.queueStatusText}>{job.active ? 'Active' : 'Inactive'}</Text>
                <Button
                  title="Cancel"
                  type="clear"
                  titleStyle={styles.cancelButtonTitle}
                  buttonStyle={styles.cancelButton}
                  onPress={() => handleCancel(job.id)}
                />
              </View>
              <View style={styles.queueInfoRow}>
                <View style={styles.queueThumbnailWrapper}>
                  <View style={styles.queueThumbnailBorder}>
                    <View style={styles.queueThumbnailShadow}>
                      <View style={styles.queueThumbnailBg}>
                        <img src={job.thumbnail} alt="thumb" style={{ width: 48, height: 48, borderRadius: 8 }} />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.queueJobTitle}>{job.title}</Text>
                  <Text style={styles.queueJobDesc}>{job.description}</Text>
                </View>
              </View>
              <ProgressBar progress={job.progress} color={COLORS.paprika} style={styles.progressBar} />
            </View>
          ))}
        </View>
      )}

      <View style={styles.supportedPlatforms}>
        <Text style={styles.platformsTitle}>Supported Platforms:</Text>
        <Text style={styles.platform}>• TikTok</Text>
        <Text style={styles.platform}>• Instagram Reels</Text>
        <Text style={styles.platform}>• YouTube Shorts</Text>
      </View>
      {/* TODO: Add confetti burst and haptic feedback on successful import */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: COLORS.eggshell,
    alignItems: 'center',
  },
  title: {
    marginBottom: 12,
    textAlign: 'center',
    color: COLORS.espresso,
    fontWeight: '600',
    fontSize: 28,
    letterSpacing: 0.5,
    maxWidth: 600,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    color: COLORS.mushroom,
    fontSize: 17,
    maxWidth: 600,
  },
  form: {
    marginBottom: 40,
    width: '100%',
    maxWidth: 400,
  },
  button: {
    backgroundColor: COLORS.paprika,
    borderRadius: 16,
    padding: 16,
    shadowColor: COLORS.paprika,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    marginTop: 20,
  },
  supportedPlatforms: {
    padding: 20,
    backgroundColor: COLORS.mint,
    borderRadius: 12,
    marginTop: 10,
    width: '100%',
    maxWidth: 400,
  },
  platformsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.espresso,
  },
  platform: {
    fontSize: 16,
    marginBottom: 5,
    color: COLORS.espresso,
  },
  queueSection: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 32,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: COLORS.paprika,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  queueTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.espresso,
    marginBottom: 12,
  },
  queueCard: {
    backgroundColor: '#FFF6E9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: COLORS.paprika,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  queueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  queueStatusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  queueStatusText: {
    color: COLORS.espresso,
    fontWeight: 'bold',
    marginRight: 12,
  },
  cancelButton: {
    marginLeft: 'auto',
    padding: 0,
  },
  cancelButtonTitle: {
    color: COLORS.paprika,
    fontWeight: 'bold',
    fontSize: 14,
  },
  queueInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  queueThumbnailWrapper: {
    marginRight: 12,
  },
  queueThumbnailBorder: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  queueThumbnailShadow: {
    shadowColor: COLORS.paprika,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  queueThumbnailBg: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  queueJobTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.espresso,
    marginBottom: 2,
  },
  queueJobDesc: {
    color: COLORS.mushroom,
    fontSize: 14,
    marginBottom: 2,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.mushroom,
  },
}); 