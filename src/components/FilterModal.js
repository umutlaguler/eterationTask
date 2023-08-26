import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput} from 'react-native'
import React, { useState, useEffect } from 'react'
import { PhoneHeight, PhoneWidth } from '../constants/config'
import { setModalVisible } from '../actions/productListAction'
import { useDispatch, useSelector } from 'react-redux'
import { RadioButton } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler'
import CheckBox from '@react-native-community/checkbox'
import { fillFilteredArray } from '../actions/productListAction'

export default function FilterModal() {

    const dispatch = useDispatch();
    const { products } = useSelector(state => state.productListReducer);
    const brandArray = products.map((item) => item.brand)
    const modelsArray = products.map((item) => item.model)
    const [brandSearchArr, setBrandSearchArr] = useState([]);
    const [checked, setChecked] = useState("new");
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedModels, setSelectedModels] = useState([]);

    const [tempFilteredArr, setTempFilteredArr] = useState([]);

    const brandsRenderItem = (item) => {
        return(
            <View key={item.item} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBox
                value={selectedBrands.includes(item.item)}
                onValueChange={() => handleBrandCheckChange(item.item)}
              />
              <Text>{item.item}</Text>
            </View>
      )
    }

    const modelsRenderItem = (item) => {
        return(
            <View key={item.item} style={{ flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                value={selectedModels.includes(item.item)}
                onValueChange={() => handleModelCheckChange(item.item)}
              />
              <Text>{item.item}</Text>
            </View>
        )
    }
    const handleBrandCheckChange = itemBrand => {
        if (selectedBrands.includes(itemBrand)) {
          setSelectedBrands(selectedBrands.filter(item => item !== itemBrand)); // Seçimi kaldır
        } else {
          setSelectedBrands([...selectedBrands, itemBrand]); // Seçimi ekle
        }
      };

    const handleModelCheckChange = itemModel => {
    if (selectedModels.includes(itemModel)) {
        setSelectedModels(selectedModels.filter(item => item !== itemModel)); // Seçimi kaldır
    } else {
        setSelectedModels([...selectedModels, itemModel]); // Seçimi ekle
    }
    };
    const searchForBrand = (txt) => {
        setBrandSearchArr(brandArray.filter((item) => item.includes(txt)))
    }

    const orderAndList = async () => {
        const filteredbyBrandProducts = products.filter(item => selectedBrands.includes(item.brand));
        const filteredbyModelProducts = products.filter(item => selectedModels.includes(item.model));
        const mergedFilteredProducts = [...filteredbyBrandProducts, ...filteredbyModelProducts];
        setTempFilteredArr(mergedFilteredProducts);
        setTimeout(() => {
         dispatch(setModalVisible(false))    
        }, 1500);//to fill the array correctly (waiting)
    }

    useEffect(() => {
        if(checked == "new"){
           let newOrder = tempFilteredArr.sort((first, last) => new Date(first.createdAt) - new Date(last.createdAt))
           dispatch(fillFilteredArray(newOrder)) 
        }
        else if(checked == "old"){
            let oldOrder = tempFilteredArr.sort((first, last) => new Date(last.createdAt) - new Date(first.createdAt))
            dispatch(fillFilteredArray(oldOrder)) 
        }
        else if(checked == "expensive"){
            let expensiveOrder = tempFilteredArr.sort((first, last) => parseFloat(last.price) - parseFloat(first.price))
            dispatch(fillFilteredArray(expensiveOrder)) 
        }
        else if(checked == "cheap"){
            let cheapOrder = tempFilteredArr.sort((first, last) => parseFloat(first.price) - parseFloat(last.price))
            dispatch(fillFilteredArray(cheapOrder)) 
        }
    }, [tempFilteredArr]);

  return (
    <SafeAreaView style = {styles.container}>
        <ScrollView style = {{flex: 1}}>
        <View style = {styles.topContainer}>
        <TouchableOpacity
            onPress={() => dispatch(setModalVisible(false))}>
            <Image
                style={styles.icons}
                source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828778.png',
                }}
            />
        </TouchableOpacity>
        <Text style = {styles.title}>Filter</Text>
        </View>
        <View style = {styles.orderBox}>
            <Text style = {styles.subTitle}>Sort by</Text>
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                    value="new"
                    status={ checked === 'new' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('new')}
                />
                <Text>Old to New</Text>
            </View>
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                    value="old"
                    status={ checked === 'old' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('old')}
                />
                <Text>New to Old</Text>
            </View>
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                    value="expensive"
                    status={ checked === 'expensive' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('expensive')}
                />
                <Text>Price Hight to Low</Text>
            </View>
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                    value="cheap"
                    status={ checked === 'cheap' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('cheap')}
                />
                <Text>Price Low to Hight</Text>
            </View>
        </View>
        <View style = {styles.brandBox}>
            <Text style = {styles.subTitle}>Brand</Text>
            <TextInput
                style = {styles.searchBox}
                placeholder='Search'
                onChangeText={(text) => searchForBrand(text)}
            />
            <FlatList
                renderItem={brandsRenderItem}
                data={brandSearchArr.length > 0 ? brandSearchArr : brandArray}
            />
        </View>
        <View style = {styles.modelBox}>
            <Text style = {styles.subTitle}>Model</Text>
            <FlatList
                renderItem={modelsRenderItem}
                data={modelsArray}
            />
        </View>
        <TouchableOpacity
            onPress={() => orderAndList()}
            style = {styles.saveBtn}
        >
            <Text style = {styles.saveTxt}>Primary</Text>
        </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        position: 'absolute',
        zIndex: 2,
        backgroundColor: 'white',
        height: PhoneHeight,
        width: PhoneWidth
    },
    topContainer:{
        width: PhoneWidth,
        height: PhoneHeight * 0.1,
        alignItems: 'center',
        flexDirection:'row',
        justifyContent: 'space-between',
        padding: 20
    },
    icons:{
        width: 30,
        height: 30
    },
    title:{
        fontSize: 20,
        color:'black',
        fontWeight:'300',
        paddingRight: PhoneWidth * 0.35
    },
    orderBox: {
        alignSelf:'center',
        width: PhoneWidth * 0.95,
        height: PhoneHeight * 0.3,
        padding: 15 
    },
    brandBox: {
        alignSelf:'center',
        width: PhoneWidth * 0.95,
        height: PhoneHeight * 0.3,
        borderTopWidth: 1,
        padding: 15 

    },
    modelBox:{
        alignSelf:'center',
        width: PhoneWidth * 0.95,
        height: PhoneHeight * 0.3,
        borderTopWidth: 1,
        padding: 15 
    },
    saveBtn:{
        width: PhoneWidth * 0.9,
        height: PhoneHeight * 0.075,
        borderRadius: 10,
        backgroundColor: '#1d57fe',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: PhoneHeight * 0.1
    },
    saveTxt:{
        color: 'white'
    },
    subTitle: {
        marginBottom: 10
    },
    searchBox:{
        width: PhoneWidth * 0.9,
        alignSelf:'center', 
        backgroundColor:'#fafafb', 
        borderRadius: 10, 
        height: PhoneHeight * 0.06, 
        marginTop: 5
    },
})