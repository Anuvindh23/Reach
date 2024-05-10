import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LogoIcon from '../../assets/TopNavIcons/logoIcon.svg';
import SearchIcon from '../../assets/TopNavIcons/searchIcon.svg';
import OptionsIcon from '../../assets/TopNavIcons/optionsIcon.svg';
import LinearGradient from 'react-native-linear-gradient';
import MutedIcon from '../../assets/PrivateChatScreenIcons/mutedIcon.svg';
import PinnedIcon from '../../assets/PrivateChatScreenIcons/pinnedIcon.svg';

const sampleData = [
  {
    profileImg: '../../assets/sampleImages/ryan.png',
    userName: 'Ryan',
    lastMessageProps: {
      message: "How's your day going?",
      sentTime: '12:25 PM',
    },
    unreadMessages: 1,
    chatActions: ['pinned'],
  },
  {
    profileImg: '../../assets/sampleImages/ryan.png',
    userName: 'Ryan',
    lastMessageProps: {
      message: "How's your day going?",
      sentTime: '12:25 PM',
    },
    unreadMessages: 1,
    chatActions: ['muted', 'pinned'],
  },
  {
    profileImg: '../../assets/sampleImages/ryan.png',
    userName: 'Ryan',
    lastMessageProps: {
      message: "How's your day going?",
      sentTime: '12:25 PM',
    },
    unreadMessages: 1,
    chatActions: ['muted', 'pinned'],
  },
  {
    profileImg: '../../assets/sampleImages/ryan.png',
    userName: 'Ryan',
    lastMessageProps: {
      message: "How's your day going?",
      sentTime: '12:25 PM',
    },
    unreadMessages: 1,
    chatActions: ['muted', 'pinned'],
  },
  {
    profileImg: '../../assets/sampleImages/ryan.png',
    userName: 'Ryan',
    lastMessageProps: {
      message: "How's your day going?",
      sentTime: '12:25 PM',
    },
    unreadMessages: 1,
    chatActions: ['muted', 'pinned'],
  },
  {
    profileImg: '../../assets/sampleImages/ryan.png',
    userName: 'Ryan',
    lastMessageProps: {
      message: "How's your day going?",
      sentTime: '12:25 PM',
    },
    unreadMessages: 1,
    chatActions: ['muted', 'pinned'],
  },
  {
    profileImg: '../../assets/sampleImages/ryan.png',
    userName: 'Ryan',
    lastMessageProps: {
      message: "How's your day going?",
      sentTime: '12:25 PM',
    },
    unreadMessages: 0,
    chatActions: ['muted', 'pinned'],
  },
  {
    profileImg: '../../assets/sampleImages/ryan.png',
    userName: 'Ryan',
    lastMessageProps: {
      message: "How's your day going?",
      sentTime: '12:25 PM',
    },
    unreadMessages: 1,
    chatActions: ['muted', 'pinned'],
  },
  {
    profileImg: '../../assets/sampleImages/ryan.png',
    userName: 'Ryan',
    lastMessageProps: {
      message: "How's your day going?",
      sentTime: '12:25 PM',
    },
    unreadMessages: 1,
    chatActions: ['muted', 'pinned'],
  },
  {
    profileImg: '../../assets/sampleImages/ryan.png',
    userName: 'Ryan',
    lastMessageProps: {
      message: "How's your day going?",
      sentTime: '12:25 PM',
    },
    unreadMessages: 1,
    chatActions: [],
  },
  {
    profileImg: '../../assets/sampleImages/ryan.png',
    userName: 'Ryan',
    lastMessageProps: {
      message: "How's your day going?",
      sentTime: '12:25 PM',
    },
    unreadMessages: 1,
    chatActions: ['muted', 'pinned'],
  },
  {
    profileImg: '../../assets/sampleImages/ryan.png',
    userName: 'Ryan',
    lastMessageProps: {
      message: "How's your day going?",
      sentTime: '12:25 PM',
    },
    unreadMessages: 1,
    chatActions: ['muted', 'pinned'],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#330E44',
  },
  text: {
    color: '#fff',
    fontFamily: 'Deserta',
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    bottom: 20,
    width: '100%',
    height: '12%',
    backgroundColor: 'transparent',
  },
  topNavContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 'auto',
    width: '88%',
  },
  logoContainer: {
    width: '50%',
  },
  logoText: {
    fontFamily: 'aptos',
    fontSize: 25,
  },
  searchOptionContainer: {
    flexDirection: 'row',
  },
  optionContainer: {
    marginStart: 30,
  },
  chatsContainer: {
    backgroundColor: '#fff',
    height: '85%',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  chatItem: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
  },
  profileContainer: {
    width: 'auto',
    height: '100%',
    justifyContent: 'center',
  },
  nameMessageContainer: {
    width: '60%',
    height: '100%',
    marginStart: 20,
    justifyContent: 'center',
  },
  nameContainer: {},
  messageContainer: {},
  messageText: {
    color: '#000',
    fontWeight: '400',
  },
  timeActionsContainer: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  timeContainer: {
    marginRight: 10,
  },
  timeText: {
    color: '#000',
    fontWeight: '300',
    fontSize: 12,
  },
  actionsContainer: {
    width: '100%',
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  unreadMessagesContainer: {
    backgroundColor: '#62297F',
    height: 20,
    minWidth: 20,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  unreadMessagesText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '400',
  },
});

const PrivateChatsHomeScreen = () => {
  return (
    <>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={['#000044', '#330E44']}
        style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.topNavContainer}>
            <View style={styles.logoContainer}>
              <LogoIcon />
            </View>
            <View style={styles.searchOptionContainer}>
              <View style={styles.searchContainer}>
                <SearchIcon />
              </View>
              <View style={styles.optionContainer}>
                <OptionsIcon />
              </View>
            </View>
          </View>
        </View>
        <ScrollView style={styles.chatsContainer}>
          {sampleData.map((item, index) => (
            <TouchableOpacity key={index}>
              <View style={styles.chatItem}>
                <View style={styles.profileContainer}>
                  <Image
                    source={require('../../assets/sampleImages/ryan.png')}
                  />
                </View>
                <View style={styles.nameMessageContainer}>
                  <View style={styles.nameContainer}>
                    <Text style={{ ...styles.nameText, color: '#000' }}>
                      {item.userName}
                    </Text>
                  </View>
                  <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>
                      {item.lastMessageProps.message}
                    </Text>
                  </View>
                </View>
                <View style={styles.timeActionsContainer}>
                  <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>
                      {item.lastMessageProps.sentTime}
                    </Text>
                  </View>
                  <View style={styles.actionsContainer}>
                    {item.chatActions.includes('muted') && (
                      <View style={{ marginHorizontal: 5 }}>
                        <MutedIcon />
                      </View>
                    )}
                    {item.unreadMessages !== 0 && (
                      <View style={styles.unreadMessagesContainer}>
                        <Text style={styles.unreadMessagesText}>
                          {item.unreadMessages}
                        </Text>
                      </View>
                    )}
                    {item.chatActions.includes('pinned') && (
                      <View style={{ marginHorizontal: 5 }}>
                        <PinnedIcon />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default PrivateChatsHomeScreen;
