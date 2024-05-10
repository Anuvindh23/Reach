import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgXml } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import PrivateChatsHomeScreen from '../screens/PrivateChatsHomeScreen';
import GroupChatsHomeScreen from '../screens/GroupChatsHomeScreen';
import CallsHomeScreen from '../screens/CallsHomeScreen';

const styles = StyleSheet.create({
  tabBarBackground: {
    height: '110%',
  },
  activeTabContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    padding: 5,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabText: {
    color: '#000044',
    width: '50%',
    textAlign: 'center',
  },
});

const GroupsIcon = ({ focused }) => {
  const svgXml = `<svg width="38" height="38" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#330e44" />
        <stop offset="100%" stop-color="#000044" />
      </linearGradient>
    </defs>
    <path d="M28.6694 16.497H26.3493C26.5858 17.1331 26.715 17.8195 26.715 18.5349V27.149C26.715 27.4473 26.6621 27.7336 26.566 27.9999H30.4016C31.8344 27.9999 33 26.8548 33 25.4473V20.7513C33.0001 18.4055 31.0573 16.497 28.6694 16.497ZM9.28507 18.535C9.28507 17.8195 9.41427 17.1331 9.65075 16.4971H7.33067C4.94274 16.4971 3 18.4056 3 20.7515V25.4474C3 26.8549 4.16561 28 5.5984 28H9.43407C9.33536 27.7268 9.28496 27.439 9.28507 27.1491V18.535ZM20.652 14.2806H15.348C12.9601 14.2806 11.0173 16.1891 11.0173 18.535V27.1491C11.0173 27.6189 11.4051 27.9999 11.8835 27.9999H24.1166C24.5949 27.9999 24.9827 27.619 24.9827 27.1491V18.535C24.9827 16.1891 23.04 14.2806 20.652 14.2806ZM18 3C15.1282 3 12.7919 5.29521 12.7919 8.11647C12.7919 10.0301 13.867 11.7014 15.4548 12.5789C16.2079 12.995 17.0761 13.2329 18 13.2329C18.9239 13.2329 19.7922 12.995 20.5453 12.5789C22.1331 11.7014 23.2082 10.03 23.2082 8.11647C23.2082 5.29526 20.8718 3 18 3ZM8.85458 7.76891C6.70682 7.76891 4.95955 9.4854 4.95955 11.5953C4.95955 13.7052 6.70682 15.4217 8.85458 15.4217C9.38237 15.4222 9.90468 15.3166 10.3894 15.1116C11.2043 14.767 11.8761 14.1569 12.2918 13.3928C12.593 12.8399 12.7502 12.2224 12.7496 11.5953C12.7496 9.48546 11.0023 7.76891 8.85458 7.76891ZM27.1455 7.76891C24.9977 7.76891 23.2505 9.4854 23.2505 11.5953C23.2498 12.2224 23.4071 12.8399 23.7082 13.3928C24.124 14.157 24.7958 14.767 25.6106 15.1116C26.0954 15.3166 26.6177 15.4222 27.1455 15.4217C29.2932 15.4217 31.0405 13.7052 31.0405 11.5953C31.0405 9.4854 29.2932 7.76891 27.1455 7.76891Z" fill="${
      focused ? 'url(#gradient)' : '#fff'
    }"/>
    </svg>`;

  if (focused) {
    return (
      <>
        <View style={styles.activeTabContainer}>
          <SvgXml style={styles.activeTabSvg} xml={svgXml} />
          <Text style={styles.activeTabText}>Groups</Text>
        </View>
      </>
    );
  }

  return <SvgXml xml={svgXml} />;
};

const ChatsIcon = ({ focused }) => {
  const svgXml = `<svg width="25" height="25" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#330e44" />
        <stop offset="100%" stop-color="#000044" />
      </linearGradient>
    </defs>
    <path d="M19.7188 0H3.28123C1.47191 0 0 1.59317 0 3.55144V15.5589C0 17.5171 1.47191 19.1103 3.28123 19.1103H4.56882L4.59403 22.2455C4.59558 22.4462 4.67033 22.6381 4.802 22.7794C4.93366 22.9207 5.11158 23 5.29701 23C5.4497 23 5.60126 22.9462 5.72669 22.8414L10.193 19.1104H19.7188C21.528 19.1104 23 17.5172 23 15.559V3.55144C23 1.59317 21.528 0 19.7188 0Z" fill="${
      focused ? 'url(#gradient)' : '#fff'
    }"/>
    </svg>`;

  if (focused) {
    return (
      <>
        <View style={styles.activeTabContainer}>
          <SvgXml style={styles.activeTabSvg} xml={svgXml} />
          <Text style={styles.activeTabText}>Chats</Text>
        </View>
      </>
    );
  }

  return <SvgXml xml={svgXml} />;
};

const CallsIcon = ({ focused }) => {
  const svgXml = `<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#330e44" />
        <stop offset="100%" stop-color="#000044" />
      </linearGradient>
    </defs>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.4085 18.5967C24.4474 23.6341 25.5905 17.8064 28.7987 21.0124C31.8917 24.1045 33.6694 24.724 29.7506 28.6418C29.2597 29.0362 26.141 33.7822 15.1806 22.8248C4.21876 11.8661 8.962 8.74414 9.35659 8.25341C13.2849 4.32486 13.8937 6.1129 16.9867 9.20505C20.195 12.4124 14.3697 13.5593 19.4085 18.5967Z" fill="${
      focused ? 'url(#gradient)' : '#fff'
    }"/>
    </svg>`;

  if (focused) {
    return (
      <>
        <View style={styles.activeTabContainer}>
          <SvgXml style={styles.activeTabSvg} xml={svgXml} />
          <Text style={styles.activeTabText}>Calls</Text>
        </View>
      </>
    );
  }

  return <SvgXml xml={svgXml} />;
};

const Tab = createBottomTabNavigator();

const HomeScreenTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="PrivateChatsHomeScreen"
      screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          left: 10,
          right: 10,
          height: 65,
          paddingHorizontal: 10,
          paddingVertical: 10,
          paddingBottom: 10,
          borderWidth: 0,
          borderColor: 'transparent',
          borderRadius: 40,
          overflow: 'hidden',
        },
        tabBarBackground: () => (
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={['#000044', '#330E44']}
            style={styles.tabBarBackground}
          />
        ),
      })}>
      <Tab.Screen
        name="PrivateChatsHomeScreen"
        component={PrivateChatsHomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <ChatsIcon focused={focused} />,
        }}
      />
      <Tab.Screen
        name="GroupChatsHomeScreen"
        component={GroupChatsHomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <GroupsIcon focused={focused} />,
        }}
      />
      <Tab.Screen
        name="CallsHomeScreen"
        component={CallsHomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <CallsIcon focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreenTabNavigation;
