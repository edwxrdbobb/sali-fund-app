import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase'; // Make sure this path is correct
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [fullName, setFullname] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) getProfile();
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, website, avatar_url`)
        .eq('id', session?.user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const randomColor = useMemo(() => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }, []);

  const ProfileImage = () => {
    if (avatarUrl) {
      return <Image source={{ uri: avatarUrl }} style={styles.profilePic} />;
    } else {
      const initials = getInitials(fullName);
      return (
        <View style={[styles.profilePic, { backgroundColor: randomColor }]}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
      );
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'An error occurred while signing out.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <ProfileImage />
          <View><Text style={styles.name}>{fullName}</Text></View>
          {session?.user?.email && <Text style={styles.email}>{session.user.email}</Text>}
          {website && <Text style={styles.website}>{website}</Text>}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={() => {
            router.push('/(user)/editProfile');
          }}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton} onPress={() => {/* Implement share functionality */}}>
            <Text style={styles.shareButtonText}>Share Profile</Text>
          </TouchableOpacity>
        </View>

        {['My Saved', 'My Campaigns', 'Payment Method', 'FAQs', 'Logout'].map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.menuItem}
            onPress={() => {
              if (item === 'Logout') {
                handleSignOut();
              } else {
                // Handle other menu items
              }
            }}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.menuItemIcon}>
                <Ionicons 
                  name={
                    index === 0 ? 'heart-outline' :
                    index === 1 ? 'list-outline' :
                    index === 2 ? 'wallet-outline' :
                    index === 3 ? 'help-circle-outline' :
                    'log-out-outline'
                  } 
                  size={24} 
                  color="#6c5ce7" 
                />
              </View>
              <Text style={styles.menuItemText}>{item}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollViewContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6c5ce7',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  moreDetails: {
    alignItems: 'flex-end',
    marginRight: 20,
    marginTop: 10,
  },
  moreDetailsText: {
    color: '#00b894',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 10,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    backgroundColor: '#e0e0ff',
    borderRadius: 20,
    padding: 10,
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderColor: '#6c5ce7',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#6c5ce7',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#6c5ce7',
    borderRadius: 8,
    paddingVertical: 12,
    marginLeft: 10,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  website: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  signOutButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  signOutButtonText: {
    color: '#333',
    fontSize: 16,
  },
});

export default ProfileScreen;