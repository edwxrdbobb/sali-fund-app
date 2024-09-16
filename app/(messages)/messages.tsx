import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {useRouter} from 'expo-router';

const ContactItem = ({ name, message, time, unread, imageSource }: { name: string, message: string, time: string, unread: number, imageSource: any }) => (
  <TouchableOpacity style={styles.contactItem}>
    <Image source={imageSource} style={styles.contactImage} />
    <View style={styles.contactInfo}>
      <Text style={styles.contactName}>{name}</Text>
      <Text style={styles.contactMessage}>{message}</Text>
    </View>
    <View style={styles.contactMeta}>
      <Text style={styles.contactTime}>{time}</Text>
      {unread > 0 && <View style={styles.unreadBadge}><Text style={styles.unreadText}>{unread}</Text></View>}
    </View>
  </TouchableOpacity>
);

const MessagesScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Message</Text>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search a Contacts"
        />
        <Ionicons name="mic-outline" size={20} color="#999" style={styles.micIcon} />
      </View>

      <Text style={styles.sectionTitle}>Active Now</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.activeNowScroll}>
        {['user1', 'user2', 'user3'].map((user, index) => (
          <View key={index} style={styles.activeUser}>
            <Image source={user === 'user1' ? require('../../assets/images/user01.jpg') :
                           user === 'user2' ? require('../../assets/images/user02.jpg') :
                           require('../../assets/images/user03.png')} 
                   style={styles.activeUserImage} />
            <View style={styles.activeIndicator} />
          </View>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Messages</Text>

      <ScrollView>
        <ContactItem
          name="David Alen"
          message="I will speak to him about it"
          time="10 min"
          unread={2}
          imageSource={require('../../assets/images/user01.jpg')}
        />
        <ContactItem
          name="Dr. Dalil"
          message="Okay sir"
          time="2h 5min"
          unread={0}
          imageSource={require('../../assets/images/user02.jpg')}
        />
        <ContactItem
          name="Big sis"
          message="Yes sis, thanks a lot"
          time="2h 34min"
          unread={0}
          imageSource={require('../../assets/images/user03.png')}
        />
        <ContactItem
          name="Edward"
          message="Okay man thanks for the visit"
          time="3h 4min"
          unread={0}
          imageSource={require('../../assets/images/user02.jpg')}
        />
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  activeNowScroll: {
    paddingLeft: 20,
  },
  activeUser: {
    marginRight: 15,
  },
  activeUserImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  activeIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#6c5ce7',
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: '#fff',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactTime: {
    fontSize: 14,
    color: '#999',
  },
  contactMessage: {
    fontSize: 14,
    color: '#999',
  },
  unreadBadge: {
    backgroundColor: '#6c5ce7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default MessagesScreen;