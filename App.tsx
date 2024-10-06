// App.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import { Entypo, FontAwesome, Feather } from '@expo/vector-icons';

export default function App() {
  const [selectedTab, setSelectedTab] = useState('Products');
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]); // To manage the cart items
  const [isCartVisible, setIsCartVisible] = useState(false); // To control cart visibility

  const handleAddToCart = () => {
    // Add the product with its quantity to the cartItems
    setCartItems(prevItems => [...prevItems, { name: 'Product Name', quantity: cartQuantity }]);
    alert(`Added ${cartQuantity} item(s) to the cart!`);
  };

  const handleCartToggle = () => {
    setIsCartVisible(!isCartVisible);
  };

  const totalAmount = cartItems.reduce((total, item) => total + 150 * item.quantity, 0); // Assuming each item costs $150

  const renderContent = () => {
    switch (selectedTab) {
      case 'Products':
        return (
          <View style={styles.productContainer}>
            <Image
              source={require('./assets/Frame 53.png')} // Replace with your actual image link
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
            <Text style={styles.price}>$150 <Text style={styles.discount}>$200</Text></Text>
            <Text style={styles.productInfo}>This is a detailed description of the product.</Text>
            <View style={styles.buyNowContainer}>
              <TouchableOpacity style={styles.buyNowButton} onPress={handleAddToCart}>
                <Text style={styles.buttonText}>Buy Now</Text>
              </TouchableOpacity>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => setCartQuantity(Math.max(1, cartQuantity - 1))}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{cartQuantity}</Text>
                <TouchableOpacity onPress={() => setCartQuantity(cartQuantity + 1)}>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
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

            {/* Additional Product */}
            <View style={styles.additionalProductContainer}>
              <Image
                source={require('./assets/image1.png')} // Replace with your actual image link
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
            source={require('./assets/logo.png')} // Replace with your actual logo link
            style={styles.logoImage}
          />
        </View>
        <View style={styles.iconsContainer}>
          <Feather name="user" size={24} style={styles.icon} />
          <TouchableOpacity onPress={handleCartToggle}>
            <View style={styles.cartIconContainer}>
              <Feather name="shopping-cart" size={24} style={styles.icon} />
              {cartItems.length > 0 && (
                <View style={styles.notification}>
                  <Text style={styles.notificationText}>{cartItems.length}</Text>
                </View>
              )}
            </View>
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
    padding: 15,
    backgroundColor: '#f8f8f8',
    elevation: 2,
  },
  drawerToggle: {
    position: 'absolute',
    left: 0,
    padding: 10,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoImage: {
    width: 100,
    height: 50,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
  },
  scrollView: {
    flex: 1,
  },
  productContainer: {
    padding: 20,
    alignItems: 'center',
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  discount: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  productInfo: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  buyNowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  buyNowButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 16,
  },
  shareContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  iconText: {
    marginLeft: 5,
  },
  additionalProductContainer: {
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
    borderColor: '#ccc',
  },
  additionalProductImage: {
    width: 150,
    height: 150,
    borderWidth: 1,

    borderRadius: 10,
    marginBottom: 15,
  },
  additionalProductName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  additionalRatingContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  additionalPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  additionalDiscount: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  additionalProductInfo: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
  additionalBuyNowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  additionalBuyNowButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    backgroundColor: '#fff',
    elevation: 4,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  drawerIcon: {
    marginRight: 10,
  },
  drawerText: {
    fontSize: 16,
  },
  cartDropdown: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    elevation: 4,
  },
  cartItem: {
    padding: 5,
  },
  emptyCartText: {
    textAlign: 'center',
    color: 'gray',
  },
  totalText: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  notification: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 20,
    
    padding: 5,
    minWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
