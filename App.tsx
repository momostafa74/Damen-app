
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView, Animated, Vibration } from 'react-native';
import { Entypo, FontAwesome, Feather } from '@expo/vector-icons';

export default function App() {
  const [selectedTab, setSelectedTab] = useState('Products');
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  //  cart notification
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const handleAddToCart = () => {
    setCartItems(prevItems => [...prevItems, { name: 'Product Name', quantity: cartQuantity }]);
    Vibration.vibrate(); 

    // shake animation
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 1, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -1, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();

    alert(`Added ${cartQuantity} item(s) to the cart!`);
  };

  const handleCartToggle = () => {
    setIsCartVisible(!isCartVisible);
  };

  const totalAmount = cartItems.reduce((total, item) => total + 150 * item.quantity, 0);

  const renderContent = () => {
    switch (selectedTab) {
      case 'Products':
        return (
          <View style={styles.productContainer}>
            <Image
              source={require('./assets/Frame 53.png')}
              style={styles.productImage}
            />
            <Text style={styles.productName}>Product Name</Text>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={20} color="#FFD700" />
              <FontAwesome name="star" size={20} color="#FFD700" />
              <FontAwesome name="star" size={20} color="#FFD700" />
              <FontAwesome name="star" size={20} color="#FFD700" />
              <FontAwesome name="star-half-o" size={20} color="#FFD700" />
            </View>
            <Text style={styles.price}>150 EGP <Text style={styles.discount}>200 EGP</Text></Text>
            <Text style={styles.productInfo}>This is a detailed description of the product.</Text>
            <View style={styles.buyNowContainer}>
              
            <TouchableOpacity onPress={() => setCartQuantity(Math.max(1, cartQuantity - 1))}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{cartQuantity}</Text>
                <TouchableOpacity onPress={() => setCartQuantity(cartQuantity + 1)}>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
                
              <TouchableOpacity style={styles.buyNowButton} onPress={handleAddToCart}>
                <Text style={styles.buttonText}>Buy Now</Text>
              </TouchableOpacity>
              <View style={styles.quantityContainer}>
                
              </View>
            </View>
            <View style={styles.shareContainer}>
              <TouchableOpacity style={styles.iconButton}>
                <Feather name="share" size={20} />
                <Text style={styles.iconText}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <FontAwesome name="heart" size={20} />
                <Text style={styles.iconText}>Add to Wishlist</Text>
              </TouchableOpacity>
            </View>

            
            <View style={styles.additionalProductContainer}>
              <Image
                source={require('./assets/image1.png')}
                style={styles.additionalProductImage}
              />
              <Text style={styles.additionalProductName}>10688</Text>
              <View style={styles.additionalRatingContainer}>
                <FontAwesome name="star" size={20} color="#FFD700" />
                <FontAwesome name="star" size={20} color="#FFD700" />
                <FontAwesome name="star" size={20} color="#FFD700" />
                <FontAwesome name="star" size={20} color="#FFD700" />
                <FontAwesome name="star-half-o" size={20} color="#FFD700" />
              </View>
              <Text style={styles.additionalPrice}>300 EGP <Text style={styles.additionalDiscount}></Text></Text>
              <Text style={styles.additionalProductInfo}>This is a detailed description of the additional product.</Text>
              <View style={styles.additionalBuyNowContainer}>
                <TouchableOpacity style={styles.additionalBuyNowButton}>
                  <Text style={styles.buttonText}>ADD TO CART</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <FontAwesome name="heart" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      case 'BestSeller':
        return <Text style={styles.contentText}>Best Sellers</Text>;
      case 'NewArrival':
        return <Text style={styles.contentText}>New Arrivals</Text>;
      case 'Contact':
        return <Text style={styles.contentText}>Contact Us</Text>;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setIsDrawerVisible(!isDrawerVisible)} style={styles.drawerToggle}>
          <Entypo name="menu" size={24} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image
            source={require('./assets/logo.png')}
            style={styles.logoImage}
          />
        </View>
        <View style={styles.iconsContainer}>
          <Feather name="user" size={24} style={styles.icon} />
          <TouchableOpacity onPress={handleCartToggle}>
            <Animated.View
              style={[
                styles.cartIconContainer,
                {
                  transform: [
                    {
                      translateX: shakeAnimation.interpolate({
                        inputRange: [-1, 1],
                        outputRange: [-5, 5],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Feather name="shopping-cart" size={24} style={styles.icon} />
              {cartItems.length > 0 && (
                <View style={styles.notification}>
                  <Text style={styles.notificationText}>{cartItems.length}</Text>
                </View>
              )}
            </Animated.View>
          </TouchableOpacity>
          <Feather name="search" size={24} style={styles.icon} />
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {renderContent()}
      </ScrollView>

      {isDrawerVisible && (
        <View style={styles.drawer}>
          <TouchableOpacity onPress={() => { setSelectedTab('Products'); setIsDrawerVisible(false); }} style={styles.drawerItem}>
            <FontAwesome name="th-list" size={20} style={styles.drawerIcon} />
            <Text style={styles.drawerText}>Products</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setSelectedTab('BestSeller'); setIsDrawerVisible(false); }} style={styles.drawerItem}>
            <FontAwesome name="star" size={20} style={styles.drawerIcon} />
            <Text style={styles.drawerText}>Best Sellers</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setSelectedTab('NewArrival'); setIsDrawerVisible(false); }} style={styles.drawerItem}>
            <FontAwesome name="clock-o" size={20} style={styles.drawerIcon} />
            <Text style={styles.drawerText}>New Arrivals</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setSelectedTab('Contact'); setIsDrawerVisible(false); }} style={styles.drawerItem}>
            <FontAwesome name="envelope" size={20} style={styles.drawerIcon} />
            <Text style={styles.drawerText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      )}

      {isCartVisible && (
        <View style={styles.cartDropdown}>
          {cartItems.length === 0 ? (
            <Text style={styles.emptyCartText}>Your cart is empty.</Text>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <View key={index} style={styles.cartItem}>
                  <Text>{item.name} (x{item.quantity})</Text>
                </View>
              ))}
              <Text style={styles.totalText}>Total: ${totalAmount}</Text>
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  drawerToggle: {
    padding: 5,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoImage: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 20,
  },
  scrollView: {
    padding: 10,
  },
  productContainer: {
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  discount: {
    textDecorationLine: 'line-through',
    color: '#999',
    marginLeft: 5,
  },
  productInfo: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  buyNowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  buyNowButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginLeft: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row', 
  alignItems: 'center', 
  backgroundColor: '#f0f0f0', 
  borderRadius: 5, 
  padding: 5,
  },
  quantityButton: {
    fontSize: 20,
  marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  shareContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  iconText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#666',
  },
  additionalProductContainer: {
    marginTop: 20,
    padding: 10,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  additionalProductImage: {
    marginTop: 50,
marginRight: 240,
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  additionalProductName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  additionalRatingContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  additionalPrice: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  additionalProductInfo: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  additionalBuyNowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  additionalBuyNowButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  drawer: {
    position: 'absolute',
    top: 80, // تغيير هذا لتخفيض الـ Drawer تحت Navbar
    left: 0,
    width: 200,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    padding: 10,
    zIndex: 999,
    height: 'auto', 
    borderTopRightRadius: 10, 
    borderBottomRightRadius: 10,
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15, 
    paddingHorizontal: 10, 
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  drawerIcon: {
    marginRight: 10,
  },
  drawerText: {
    fontSize: 16,
  },

  cartDropdown: {
    position: 'absolute',
    top: 70,
    right: 10,
    width: 250, 
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10, 
    padding: 15, 
    zIndex: 999,
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginVertical: 10, 
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,  
    paddingHorizontal: 5, 
    borderBottomWidth: 1,
    borderBottomColor: '#eee', 
  },
  totalText: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15, 
  },
  totalLabel: {
    
    color: '#333', 
  },
  totalAmount: {
    
    color: '#000', 
  },
  cartIconContainer: {
    position: 'relative',
  },
  notification: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
