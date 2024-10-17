import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import PushNotification from 'react-native-push-notification';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    PushNotification.configure({
      onNotification: function(notification) {
        setNotifications(prev => [...prev, {
          id: notification.id || Math.random().toString(),
          valor: notification.valor,
          data: notification.data,
          hora: notification.hora,
          tipo: notification.tipo,
          destinatario: notification.destinatario // Incluindo destinatário
        }]);
      },
    });

    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://seu-backend.com/notificacoes');
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.notification}>
          <Text style={styles.notificationText}>Valor: {item.valor}</Text>
          <Text style={styles.notificationText}>Data: {item.data}</Text>
          <Text style={styles.notificationText}>Hora: {item.hora}</Text>
          <Text style={styles.notificationText}>Tipo: {item.tipo}</Text>
          {item.tipo === 'enviada' && item.destinatario && (
            <Text style={styles.notificationText}>Destinatário: {item.destinatario}</Text>
          )}
        </View>
      )}
      ListEmptyComponent={<Text style={styles.notificationText}>Nenhuma notificação disponível</Text>}
    />
  );
};

const styles = StyleSheet.create({
  notification: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  notificationText: {
    color: 'white',
  },
});

export default NotificationList;
