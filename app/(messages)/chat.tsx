import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StreamChat, Channel, Message } from 'stream-chat';
import { supabase } from '../../lib/supabase';

const client = StreamChat.getInstance('YOUR_STREAM_API_KEY');

const ChatScreen = () => {
  const { channelId } = useLocalSearchParams();
  const router = useRouter();
  const [channel, setChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const setupChannel = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await client.connectUser(
          {
            id: user.id,
            name: user.user_metadata.full_name,
            image: user.user_metadata.avatar_url,
          },
          user.id // Use this as the Stream token for simplicity. In production, generate a proper token.
        );
        const channel = client.channel('messaging', channelId);
        await channel.watch();
        setChannel(channel);
        const messages = await channel.query({ messages: { limit: 30 } });
        setMessages(messages.messages.reverse());
      }
    };

    setupChannel();

    return () => {
      client.disconnectUser();
    };
  }, [channelId]);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;
    await channel.sendMessage({ text: newMessage });
    setNewMessage('');
  };

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageSender}>{item.user.name}</Text>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  messageContainer: {
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  messageSender: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#6c5ce7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatScreen;