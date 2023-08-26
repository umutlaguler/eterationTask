import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import React, {useState} from 'react';
import { PhoneHeight, PhoneWidth } from '../../constants/config';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import { updateCartItems, addItemToCart } from '../../actions/productListAction';

export default function Cart() {
  const [totalAmount, setTotalAmount] = useState(0);
  const { cartItems } = useSelector(state => state.productListReducer);
  const dispatch = useDispatch()

  //datadaki her bir elemana quantity propu eklemek için 
  const itemQuantities = {};

  cartItems.forEach(cartItem => {
    const itemId = cartItem?.id;
    if (itemQuantities[itemId]) {
      itemQuantities[itemId].quantity += 1;
    } else {
      itemQuantities[itemId] = { ...cartItem, quantity: 1 };
    }
  });

  //sepetteki aynı olan itemları tutmak için 
  const groupedCartItems = Object.values(itemQuantities);

  //sepetten eleman eksiltme ve 1 eleman kaldıysa silme
  const deleteItemFromCart = ({item}) => {
    try {
        const updatedCart = [...cartItems];
        const itemIndex = updatedCart.findIndex(cartItem => cartItem.id === item.id); 
        if (itemIndex !== -1) {
            updatedCart.splice(itemIndex, 1);
           dispatch(updateCartItems(updatedCart));
        }
    } catch (error) {
        console.error('Hata:', error);
    }
  }

  //to calculate total price in cart
  const calculateTotalAmount = () => {
    let prc = 0;
    groupedCartItems.map((item) =>  prc += item.quantity * item.price)
    setTotalAmount(prc)
  }

  const renderCartsItem = ({ item }) => {
    calculateTotalAmount()
    return (
      <ScrollView>
        <View style={styles.cartItemsBox}>
          <View style = {{flexDirection:'column'}}>
            <Text style = {{color: 'black'}}>{item.name}</Text>
            <Text style = {{color: '#1d57fe'}}>{item.price * item.quantity}₺</Text>
          </View>
          <View style = {{flexDirection: 'row' , alignItems: 'center'}}>
            <TouchableOpacity
              testID="removeButton"
              style = {styles.removeBtn}
              onPress={() => deleteItemFromCart({item})}
            ><Text style = {{fontSize: 20, fontWeight: 'bold'}}>-</Text>
            </TouchableOpacity>
            <View style = {styles.quantityBox}>
            <Text style = {{color:'white'}}>{item.quantity}</Text>
            </View>
            <TouchableOpacity
              style = {{borderWidth: 0, width:30, height:30, alignItems: 'center', justifyContent: 'center', backgroundColor:'grey'}}
              onPress={() => dispatch(addItemToCart(item))}
            ><Text style = {{fontSize: 20, fontWeight: 'bold'}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        headerTitle='Cart'
      />
      <FlatList
        data={groupedCartItems}
        renderItem={renderCartsItem}
      />
        <View style = {styles.bottomBox}>
        <View style = {styles.priceBox}>
            <Text style = {{color: 'blue', fontSize: 20}}>Total: </Text>
            <Text style = {styles.priceTxt}>{totalAmount} ₺</Text>
        </View>
        <View style = {styles.addToCartBox}>
          <TouchableOpacity
            style = {styles.addCartBtn}
          >
            <Text style = {styles.addCartTxt}>Complete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bottomBox:{
    width: PhoneWidth,
    height: PhoneHeight * 0.1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  priceBox: {
    paddingHorizontal: 20,
    width:'30%',
    borderWidth: 0,
  },
  priceTxt: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold'
  },
  addToCartBox:{
    width:'70%',
  },
  addCartBtn:{
    backgroundColor: '#1d57fe',
    width: '70%',
    height: PhoneHeight * 0.05,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: PhoneHeight * 0.02
  },
  addCartTxt:{
    color: 'white', 
  },
  cartItemsBox:{
    width: PhoneWidth * 0.9, 
    height: PhoneHeight * 0.1, 
    borderWidth: 0, 
    alignSelf: 'center',
    alignItems:'center', 
    flexDirection:'row', 
    justifyContent:'space-between', 
    padding: PhoneHeight * 0.02 
  },
  removeBtn:{
    borderWidth: 0, 
    width:30, 
    height:30, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor:'grey'
  },
  quantityBox:{
    borderWidth: 0, 
    width:40, 
    height:34, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor:'#1d57fe'
  }

});
