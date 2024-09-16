import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '@/lib/supabase'; // Adjust this import path as needed

// Define the Campaign interface
interface Campaign {
  id: string;
  campaign_cover?: string;
  title: string;
  current_amount: number;
  target_amount: number;
  description: string;
}

const CampaignPreviewDetailsScreen = () => {
  const { campaignId } = useLocalSearchParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', campaignId)
        .single();

      if (error) {
        console.error('Error fetching campaign:', error);
      } else {
        setCampaign(data);
      }
    };

    if (campaignId) {
      fetchCampaign();
    }
  }, [campaignId]);

  if (!campaign) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {campaign.campaign_cover && (
        <Image
          source={{ uri: campaign.campaign_cover }}
          style={styles.image}
        />
      )}
      
      <View style={styles.content}>
        <Text style={styles.title}>{campaign.title}</Text>
        
        <Text style={styles.amount}>$ {campaign.current_amount} raised out of $ {campaign.target_amount}</Text>

        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${(campaign.current_amount / campaign.target_amount) * 100}%` }]}></View>
        </View>

        <TouchableOpacity style={styles.donateButton}>
          <Text style={styles.donateButtonText}>Donate now</Text>
        </TouchableOpacity>

        <Text style={styles.description}>{campaign.description}</Text>

        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  amount: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    width: '75%', // Adjust based on the raised percentage
    backgroundColor: '#7b40e7',
    borderRadius: 3,
  },
  donateButton: {
    backgroundColor: '#00C48C',
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 16,
    alignItems: 'center',
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  shareButton: {
    backgroundColor: '#00C48C',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CampaignPreviewDetailsScreen;