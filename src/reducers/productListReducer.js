import persistReducer from 'redux-persist/es/persistReducer';
import { FETCH_ALL_PRODUCTS,
         ADD_ITEM_TO_CART,
         UPDATE_CART,
         MODAL_VISIBLE,
         FILL_FILTERED_ARRAY
} from '../actions/productListAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIAL_STATE = {
    products:[],
    currentPage: 1, // kaçıncı sayfada oldugumuz bilgisi
    perPage: 12, // Her sayfalama işlemi için 12 ürün istediğimizden dolayı 12
    cartItems: [],
    currentPageProducts:[],
    isModalVisible: false,
    allFilteredData: []
}
const persistConfig = {
    key: 'products',
    storage: AsyncStorage,
     whitelist: ['cartItems'],
    // blacklist: []
}
const productListReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_ALL_PRODUCTS:
            return{
                ...state,
                products: state.products.concat(action.payload),
                currentPage: action.page
            }
        case ADD_ITEM_TO_CART:
            return{
                ...state,
                cartItems: state.cartItems.concat(action.payload),
            }
        case UPDATE_CART:
            return {
                ...state,
                cartItems: action.payload
              };
        case MODAL_VISIBLE:
            return {
                ...state,
                isModalVisible: action.payload
              };
        case FILL_FILTERED_ARRAY:
            return {
                ...state,
                allFilteredData: action.payload
              };
        default:
            return state;
    }
}
export default persistReducer(persistConfig, productListReducer);