import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

interface UserData {
  id: number;
  name: string;
  date: string;
  check: boolean; // Assuming check is a boolean
}

const App = () => {
  const [userData, setUserData] = useState<UserData[]>([]);

  const handleGetRequest = async () => {
    try {
      const response = await axios.get<UserData[]>('https://iot-71ac0f336b84.herokuapp.com/api/field/getAll');
      setUserData(response.data);
    } catch (error) {
      console.error('Error making GET request:', error);
    }
  };

  useEffect(() => {
    handleGetRequest();
  }, []);

  const renderItem = ({ item }: { item: UserData }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.id}</Text>
      <Text style={styles.tableCell}>{item.name}</Text>
      <Text style={styles.tableCell}>{item.date}</Text>
      <Text style={styles.tableCell}>{item.check ? 'True' : 'False'}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.marginTop}>User Data:</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderCell}>ID</Text>
        <Text style={styles.tableHeaderCell}>Name</Text>
        <Text style={styles.tableHeaderCell}>Date</Text>
        <Text style={styles.tableHeaderCell}>Check</Text>
      </View>
      <FlatList
        data={userData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <Button title="Get Data" onPress={handleGetRequest} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  marginTop: { marginTop: 20 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f2f2f2', paddingVertical: 8 },
  tableHeaderCell: { flex: 1, textAlign: 'center', fontWeight: 'bold' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 8 },
  tableCell: { flex: 1, textAlign: 'center' },
});

export default App;
