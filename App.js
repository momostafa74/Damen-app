// App.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Entypo, FontAwesome, Feather } from '@expo/vector-icons'; // Expo icons

export default function App() {
  const [selectedTab, setSelectedTab] = useState('Products'); // للتحكم في العنصر المعروض من القائمة الجانبية
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // للتحكم في فتح/غلق القائمة الجانبية

  // لتغيير المحتوى المعروض بناءً على الاختيار من القائمة الجانبية
  const renderContent = () => {
    switch (selectedTab) {
      case 'Products':
        return <Text style={styles.contentText}>Products List</Text>;
      case 'BestSeller':
        return <Text style={styles.contentText}>Best Sellers</Text>;
      case 'NewArrival':
        return <Text style={styles.contentText}>New Arrivals</Text>;
      case 'ContactUs':
        return <Text style={styles.contentText}>Contact Us</Text>;
      default:
        return <Text style={styles.contentText}>Products List</Text>;
    }
  };

  // الجزء العلوي (Navbar) مع الأيقونات واللوجو
  const Navbar = () => (
    <View style={styles.navbar}>
      <TouchableOpacity>
        <Text style={styles.logo}>Logo</Text>
      </TouchableOpacity>
      <View style={styles.icons}>
        <TouchableOpacity>
          <FontAwesome name="search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="shopping-cart" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="user" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // القائمة الجانبية (Drawer)
  const Drawer = () => (
    <View style={styles.drawer}>
      <TouchableOpacity onPress={() => setSelectedTab('Products')}>
        <Text style={styles.drawerItem}>Products</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelectedTab('BestSeller')}>
        <Text style={styles.drawerItem}>Best Sellers</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelectedTab('NewArrival')}>
        <Text style={styles.drawerItem}>New Arrivals</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelectedTab('ContactUs')}>
        <Text style={styles.drawerItem}>Contact Us</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <View style={styles.mainContent}>
        <TouchableOpacity onPress={() => setIsDrawerOpen(!isDrawerOpen)} style={styles.drawerToggle}>
          <Entypo name="menu" size={32} color="black" />
        </TouchableOpacity>
        {isDrawerOpen ? <Drawer /> : renderContent()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    height: 60,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'space-between',
  },
  mainContent: {
    flex: 1,
    padding: 20,
  },
  contentText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  drawerToggle: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  drawer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  drawerItem: {
    fontSize: 18,
    marginVertical: 10,
    paddingLeft: 10,
    color: 'black',
  },
});

