import axios from "axios";
import { BASE_API } from "../constants/config";

export const FETCH_ALL_PRODUCTS  = "fetch_all_products";
export const ADD_ITEM_TO_CART = "add_item_to_cart";
export const UPDATE_CART = "update_cart";
export const MODAL_VISIBLE = "modal_visible"
export const FILL_FILTERED_ARRAY = "fill_filtered_array"

export const fetchAllProducts= (page, perPage) => {
    return dispatch => {
        axios({
            url: `${BASE_API}?limit=${perPage}&page=${page}`,
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((result) => {
            dispatch({
                type: FETCH_ALL_PRODUCTS,
                payload: result.data,
                page: page
            })
        }).catch((err) => {
            // console.log("err", err)
        })
    }
}
//sepete item ekleme
export const addItemToCart = (item) => {
    return{
        type: ADD_ITEM_TO_CART,
        payload: item
    }
}
//silme ekleme işlemleri sonrası sepeti güncelleme
export const updateCartItems = (item) => {
    return{
        type: UPDATE_CART,
        payload: item
    }
}
//filtreler componentini global olarak aç/kapat
export const setModalVisible = (visible) => {
    return{
        type: MODAL_VISIBLE,
        payload: visible
    }
}
//filtre uyguladıktan sonra yeni bir array doldurma
export const fillFilteredArray = (array) => {
    return{
        type: FILL_FILTERED_ARRAY,
        payload: array
    }
}