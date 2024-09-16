import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const AddFundraiserPhotoScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // Request permission to access media
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access media library is required!');
      return;
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePreview = () => {
    router.push({
      pathname: '/create/campaignPreview',
      params: { ...params, coverImage: image }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.step}>Step 3 of 3</Text>
      <Text style={styles.header}>Almost done. Add a fundraiser photo</Text>

      <Text style={styles.subtext}>
        A high-quality photo or video will help tell your story and build trust with donors
      </Text>

      <View style={styles.uploadContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
            <Ionicons name="camera-outline" size={48} color="#7b40e7" />
            <Text style={styles.uploadText}>Add photo or video</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.previewButton} onPress={handlePreview}>
        <Text style={styles.previewButtonText}>Preview fundraiser</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  step: {
    color: '#888',
    fontSize: 14,
    marginBottom: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtext: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  uploadContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: 10,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  uploadButton: {
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 16,
    color: '#7b40e7',
    marginTop: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  previewButton: {
    backgroundColor: '#7b40e7',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  previewButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddFundraiserPhotoScreen;