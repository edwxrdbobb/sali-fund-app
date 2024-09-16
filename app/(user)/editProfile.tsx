import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';

const EditProfileScreen = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [isCurrentPasswordCorrect, setIsCurrentPasswordCorrect] = useState(false);
  const [isCheckingPassword, setIsCheckingPassword] = useState(false);

  useEffect(() => {
    getProfile();
    fetchCountries();
  }, []);

  async function fetchCountries() {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      setCountries(data.map((country: any) => country.name.common).sort());
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  }

  async function getProfile() {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, phone, website, age, sex, country, avatar_url`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullName(data.full_name || '');
        setPhone(data.phone || '');
        setWebsite(data.website || '');
        setAge(data.age ? data.age.toString() : '');
        setSex(data.sex || '');
        setCountry(data.country || '');
        setAvatarUrl(data.avatar_url || '');
      }
    } catch (error) {
      Alert.alert('Error', 'Error loading user data!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(newAvatarUrl?: string) {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error('No user on the session!');

      const updates = {
        id: user.id,
        full_name: fullName,
        phone,
        website,
        age: age ? parseInt(age) : null,
        sex,
        country,
        avatar_url: newAvatarUrl || avatarUrl,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) throw error;
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Error updating the data!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function changePassword() {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });

      if (error) throw error;
      Alert.alert('Success', 'Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      Alert.alert('Error', 'Error changing password!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function checkCurrentPassword() {
    if (!currentPassword) return;
    setIsCheckingPassword(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !user.email) throw new Error('No user or email found');

      const { error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });
      if (error) throw error;
      setIsCurrentPasswordCorrect(true);
      Toast.show({ type: 'success', text1: 'Current password is correct' });
    } catch (error) {
      setIsCurrentPasswordCorrect(false);
      Toast.show({ type: 'error', text1: 'Incorrect current password' });
    } finally {
      setIsCheckingPassword(false);
    }
  }

  async function pickImage() {
    try {
      setLoading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        allowsEditing: true,
        quality: 1,
        exif: false,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log('User cancelled image picker.');
        return;
      }

      const image = result.assets[0];
      console.log('Got image', image);

      if (!image.uri) {
        throw new Error('No image uri!');
      }

      const fileExt = image.uri.split('.').pop()?.toLowerCase() ?? 'png';
      const fileName = `${Date.now()}.${fileExt}`;

      // Convert the image to a Blob
      const response = await fetch(image.uri);
      const blob = await response.blob();

      // Upload the image
      try {
        const { data, error } = await supabase.storage
          .from('avatars')
          .upload(fileName, blob, {
            contentType: image.mimeType ?? 'image/png',
          });

        if (error) throw error;

        // Get the public URL of the uploaded image
        const { data: publicUrlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);

        if (publicUrlData && publicUrlData.publicUrl) {
          console.log('Public URL:', publicUrlData.publicUrl);
          setAvatarUrl(publicUrlData.publicUrl);
          
          // Update the profile with the new avatar URL
          await updateProfile(publicUrlData.publicUrl);
        } else {
          throw new Error('Failed to get public URL');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        Alert.alert('Error', 'An unknown error occurred');
      }

    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        console.error('Unknown error:', error);
        Alert.alert('Error', 'An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Edit Profile</Text>

        <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarPlaceholderText}>Add Photo</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Website"
          value={website}
          onChangeText={setWebsite}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Sex"
          value={sex}
          onChangeText={setSex}
        />
        <Picker
          selectedValue={country}
          onValueChange={(itemValue) => setCountry(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Select a country" value="" />
          {countries.map((country, index) => (
            <Picker.Item key={index} label={country} value={country} />
          ))}
        </Picker>

        <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={() => updateProfile()}
            disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Saving...' : 'Save Profile'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Change Password</Text>

        <View style={styles.passwordInputContainer}>
          <TextInput
            style={[
              styles.input,
              styles.passwordInput,
              isCurrentPasswordCorrect && styles.correctPasswordInput,
              !isCurrentPasswordCorrect && currentPassword && styles.incorrectPasswordInput,
            ]}
            placeholder="Current Password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
          />
          {currentPassword && !isCurrentPasswordCorrect && (
            <TouchableOpacity style={styles.checkButton} onPress={checkCurrentPassword} disabled={isCheckingPassword}>
              {isCheckingPassword ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.checkButtonText}>Check</Text>
              )}
            </TouchableOpacity>
          )}
        </View>

        <TextInput
          style={styles.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          editable={isCurrentPasswordCorrect}
        />
        <TextInput
          style={[
            styles.input,
            confirmPassword && (confirmPassword === newPassword ? styles.correctPasswordInput : styles.incorrectPasswordInput)
          ]}
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          editable={isCurrentPasswordCorrect}
        />

        <TouchableOpacity
          style={[styles.button, styles.changePasswordButton]}
          onPress={changePassword}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Changing...' : 'Change Password'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 10,
  },
  button: {
    padding: 15,
    borderRadius: 6,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#6c5ce7',
  },
  changePasswordButton: {
    backgroundColor: '#00b894',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholderText: {
    color: '#888',
    fontSize: 16,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  checkButton: {
    backgroundColor: '#6c5ce7',
    padding: 10,
    borderRadius: 6,
    marginLeft: 10,
  },
  checkButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  correctPasswordInput: {
    borderColor: 'green',
  },
  incorrectPasswordInput: {
    borderColor: 'red',
  },
});

export default EditProfileScreen;