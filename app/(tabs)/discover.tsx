import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase'; // Ensure this path is correct

// Define the Campaign interface
interface Campaign {
  id: string;
  title: string;
  target_amount: number;
  current_amount: number;
  image_url: string;
}

const FundRaisingCard = ({ title, target, raised, left, imageSource }: { title: string, target: number, raised: number, left: number, imageSource: any }) => (
  <View style={styles.fundRaisingCard}>
    <Image source={imageSource} style={styles.cardImage} />
    <Text style={styles.cardTitle}>{title}</Text>
    <View style={styles.progressBar}>
      <View style={[styles.progress, { width: `${(raised / target) * 100}%` }]} />
    </View>
    <View style={styles.cardDetails}>
      <Text style={styles.cardDetailText}>Target: ${target}</Text>
      <Text style={styles.cardDetailText}>Raised: ${raised}</Text>
      <Text style={styles.cardDetailText}>Left: ${left}</Text>
    </View>
  </View>
);

const FeedScreen = () => {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching campaigns:', error);
    } else {
      console.log(data);
      setCampaigns(data || []);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/user01.jpg')}
            style={styles.profilePic}
          />
          <View style={styles.headerText}>
            <Text style={styles.nameText}>John Amara</Text>
            <Text style={styles.roleText}>Patient</Text>
          </View>
          <TouchableOpacity onPress={() => router.replace('/(messages)/chat')}>
            <Ionicons name="chatbubble-outline" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="black" style={styles.icon} />
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search pharmacy, drugs, coach..."
          />
          <Ionicons name="mic-outline" size={20} color="#999" style={styles.micIcon} />
        </View>

        <Text style={styles.sectionTitle}>Fund Raising</Text>
        <Text style={styles.sectionSubtitle}>Help save a life</Text>
        <Text style={styles.urgentCases}>Urgent Cases</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.urgentCasesScroll}>
          {campaigns.slice(0, 2).map((campaign) => (
            <FundRaisingCard
              key={campaign.id}
              title={campaign.title}
              target={campaign.target_amount}
              raised={campaign.current_amount}
              left={campaign.target_amount - campaign.current_amount}
              imageSource={{ uri: campaign.image_url }}
            />
          ))}
        </ScrollView>

        <Text style={styles.otherCases}>Other Cases</Text>

        {campaigns.slice(2).map((campaign) => (
          <FundRaisingCard
            key={campaign.id}
            title={campaign.title}
            target={campaign.target_amount}
            raised={campaign.current_amount}
            left={campaign.target_amount - campaign.current_amount}
            imageSource={{ uri: campaign.image_url }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerText: {
    marginLeft: 15,
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  roleText: {
    fontSize: 14,
    color: '#666',
  },
  icon: {
    marginLeft: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    margin: 20,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  micIcon: {
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    marginLeft: 20,
    marginBottom: 10,
  },
  urgentCases: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6c5ce7',
    marginLeft: 20,
    marginTop: 10,
  },
  urgentCasesScroll: {
    paddingLeft: 20,
  },
  otherCases: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  fundRaisingCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    marginBottom: 15,
    width: 250,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  progressBar: {
    height: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 5,
  },
  progress: {
    height: '100%',
    backgroundColor: '#6c5ce7',
    borderRadius: 5,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardDetailText: {
    fontSize: 12,
    color: '#666',
  },
});

export default FeedScreen;