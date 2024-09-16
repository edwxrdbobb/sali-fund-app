import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../../../lib/supabase'; // Adjust the import path as needed
import { decode } from 'base64-arraybuffer';

const CampaignPreviewScreen = () => {
  const { title, amount, coverImage, description, fundraisingFor, category, subCategory } = useLocalSearchParams();
  const [organizerName, setOrganizerName] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchOrganizerName();
  }, []);

  const fetchOrganizerName = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();
      
      if (data && !error) {
        setOrganizerName(data.full_name);
      }
    }
  };

  const uploadCampaign = async (isActive: boolean) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      // Upload image to storage
      // const imageName = `campaign_cover_${Date.now()}.jpg`;
      // const { data: imageData, error: imageError } = await supabase.storage
      //   .from('campaige_cover')
      //   .upload(imageName, decode((coverImage as string).split(',')[1]), {
      //     contentType: 'image/jpeg'
      //   });

      // if (imageError) throw imageError;

      // Get public URL of the uploaded image
      // const { data: { publicUrl } } = supabase.storage
      //   .from('campaige_cover')
      //   .getPublicUrl(imageName);

      // Insert campaign data with the image URL
      const { data, error } = await supabase
        .from('campaigns')
        .insert({
          title: title as string,
          description: description as string,
          fundraising_for: fundraisingFor as string,
          // campaign_cover: publicUrl,
          category: category as string,
          sub_category: subCategory as string,
          target_amount: parseFloat(amount as string),
          current_amount: 0,
          owner_id: user.id,
          active_status: isActive
        })
        .select();
        if (error) throw error;
        if (!data || data.length === 0) throw new Error('No data returned after insert');
    
        console.log('Campaign uploaded successfully', data[0]);
        router.push({
          pathname: '/(campaign)/create/campaignPreviewDetails',
          params: { campaignId: data[0].id }
        });
      } catch (error) {
        console.error('Error uploading campaign:', error);
      }
  };

  const saveDraft = () => uploadCampaign(false);
  const publishCampaign = () => uploadCampaign(true);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: coverImage as string }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.header}>Fundraiser preview</Text>
        <Text style={styles.title}>{title as string}</Text>
        <Text style={styles.subtext}><Text style={styles.subtextBold}>Fundraising for: </Text>{fundraisingFor as string}</Text>
        <Text style={styles.goal}>${amount as string} Target</Text>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}></View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{description as string}</Text>
        </View>
        <TouchableOpacity style={styles.actionButton} onPress={saveDraft}>
          <Text style={styles.actionButtonText}>Save Draft</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={publishCampaign}>
          <Text style={styles.actionButtonText}>Upload</Text>
        </TouchableOpacity>

        <View style={styles.organizerContainer}>
          <Text style={styles.organizerLabel}>Organizer: </Text>
          <Text style={styles.organizerName}>{organizerName || 'Organizer'}</Text>
        </View>
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
    height: 200,
  },
  content: {
    padding: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  goal: {
    fontSize: 18,
    color: '#555',
    marginBottom: 16,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    width: '25%', // Adjust based on the raised percentage
    backgroundColor: '#7b40e7',
    borderRadius: 3,
  },
  actionButton: {
    backgroundColor: '#00C48C',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 16,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  organizerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  organizerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  organizerLabel: {
    fontSize: 14,
    color: '#888',
  },
  subtext: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  subtextBold: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#888',
  },
});

export default CampaignPreviewScreen;