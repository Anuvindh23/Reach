// App.js
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native';
import {TextInput} from 'react-native';
import {Text, View} from 'react-native';
import {io} from 'socket.io-client';

const styles = {
  pageView: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
  },
  fontColor: {
    color: '#000',
  },
  inputStyles: {
    width: '70%',
    height: 40,
    color: '#000',
    borderWidth: 2,
    borderColor: '#000',
    shadowOffset: {width: 10, height: 10},
  },
  inputAndButtonContainer: {
    flexDirection: 'row',
  },
  sendButton: {
    height: 'auto',
  },
};

const App = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (!socket) {
      console.error('socket not connected');
      return;
    }
    socket.emit('chat message', {sender: socket.id, message: inputMessage});
    const newMessage = {userId: socket.id, message: inputMessage};
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputMessage('');
  };
  const handleInputChange = text => {
    setInputMessage(text);
  };

  useEffect(() => {
    const socketio = io('http://192.168.0.102:3000');
    socketio.on('connect', () => {
      setSocket(socketio);
    });

    socketio.on('chat message', ({sender, message}) => {
      if (sender !== socket.id) {
        const newIncomingMessage = {userId: sender, message: message};
        setMessages(prevMessages => [...prevMessages, newIncomingMessage]);
      }
    });

    return () => {
      socketio.disconnect();
    };
  }, []);

  return (
    <>
      {socket && (
        <View style={styles.pageView}>
          <Text style={styles.fontColor}>
            You are connected with the socket id: {socket.id}
          </Text>
          <Text>Messages: </Text>
          {messages.map((item, index) => (
            <Text key={index} style={styles.fontColor}>
              {item.userId}: {item.message}
            </Text>
          ))}
          <View style={styles.inputAndButtonContainer}>
            <TextInput
              style={styles.inputStyles}
              value={inputMessage}
              onChangeText={handleInputChange}
            />
            <Button
              title="Send Message"
              style={styles.sendButton}
              onPress={sendMessage}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default App;
