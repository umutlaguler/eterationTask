import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Bottom from '../../components/Bottom'
import FilterModal from '../../components/FilterModal'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { PhoneHeight, PhoneWidth } from '../../constants/config'
import { useDispatch, useSelector} from 'react-redux'
import { addItemToCart, fetchAllProducts, setModalVisible } from '../../actions/productListAction'
import { useNavigation } from '@react-navigation/native';

export default function ProductList() {

const dispatch = useDispatch()
const navigation = useNavigation()
const { products, currentPage, perPage, isModalVisible, allFilteredData} = useSelector(state => state.productListReducer);
const [searchWord, setSearchWord] = useState("");
const [searchResult, setSearchResult] = useState([]);

useEffect(() => {
    dispatch(fetchAllProducts(currentPage, perPage)); // sayfaya girildiğinde yapılan ilk load işlemi
  }, []);

const nextLoad = () => {
    dispatch(fetchAllProducts(currentPage + 1, perPage)); // Daha fazla yükleme
};
const changeDataToList = (input) => {
    if(allFilteredData.length > 0){
        setSearchResult(allFilteredData.filter(item => item.name==input))
    }
    else{
        setSearchResult(products.filter(item => item.name==input))
    }
}
const renderProducts = ({item}) => {
    return(
        <TouchableOpacity 
            onPress={() => navigation.navigate('specificProduct', {item: item})}
            style = {styles.productBtn}>
            <Image
                style = {styles.productImage}
                source={{
                    uri: item.image
                }}
            />
            <Text style = {styles.productPrice}>{item.price} ₺</Text>
            <Text style = {styles.productName}>{item.name}</Text>
            <TouchableOpacity
                style = {styles.addCartBtn}
                onPress={() => dispatch(addItemToCart(item))}
            >
                <Text style = {styles.addCartTxt}>Add to Cart</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
  return (
    <SafeAreaView style = {styles.container}>
        {
            isModalVisible == true?
            <FilterModal/>:null
        }
        <Header
            headerTitle = 'E-Market'
        />
        <TextInput
            style = {styles.searchBox}
            placeholder='Search'
            onChangeText={ async(text) => setSearchWord(text) & changeDataToList(text)}
        />
        <View style = {styles.filterTxtBox}>
            <Text style = {{fontSize: 22}}>Filters: </Text>
            <TouchableOpacity
                onPress={() => dispatch(setModalVisible(true))}
                style = {styles.setModalBtn}
            >
                <Text>Select Filter</Text>
            </TouchableOpacity>
        </View>
        {
            searchWord.length > 0?
            <FlatList
                numColumns={2}
                keyExtractor={item => item.id}
                data = {searchResult}
                renderItem = {renderProducts}
                onEndReached={nextLoad}
                onEndReachedThreshold={0.1}
            />
        :
            <FlatList
                numColumns={2}
                keyExtractor={item => item.id}
                data = {allFilteredData.length > 0?  allFilteredData : products}
                renderItem = {renderProducts}
                onEndReached={nextLoad}
                onEndReachedThreshold={0.1}
            />
        }
        <Bottom/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    productBtn: {
        width: PhoneWidth * 0.45,
        marginHorizontal: 10,
        marginVertical: 10,
        height: PhoneHeight * 0.42,
        backgroundColor:'white', 
        borderWidth: 0.5
    },
    productImage:{
        width: '90%',
        height: '60%',
        marginTop:10,
        alignSelf:'center'
    },
    productPrice:{
        color: '#1d57fe',
        paddingHorizontal: 10,
        marginBottom: PhoneHeight * 0.01
    },
    productName:{
        color: 'black',
        paddingHorizontal: 10,
        marginBottom: PhoneHeight * 0.01
    },
    addCartBtn:{
        backgroundColor: '#1d57fe',
        width: '90%',
        height: '30%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: PhoneHeight * 0.02
    },
    setModalBtn:{
        backgroundColor:'#fafafb', 
        width: 130, 
        height:40, 
        alignItems:'center', 
        justifyContent:'center'
    },
    searchBox:{
        width: PhoneWidth * 0.9,
        alignSelf:'center', 
        backgroundColor:'#fafafb', 
        borderRadius: 10, 
        height: PhoneHeight * 0.06, 
        marginTop: 5
    },
    addCartTxt:{
        color: 'white', 
    },
    filterTxtBox:{
        flexDirection:'row', 
        width: PhoneWidth * 0.9, 
        height: PhoneHeight * 0.1, 
        alignItems:'center', 
        alignSelf: 'center', 
        justifyContent:'space-between' 
    }
})