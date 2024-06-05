import axios from "axios";
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from "../constants/productConstants";

// Redux Thunk allows you to write action creators that return a function instead of an action. This function can 
//then perform asynchronous operations and dispatch actions as needed.
// In this case, getProduct is a thunk action creator that dispatches actions before and after making an API call.

export const getProduct = (keyword="",currentPage=1,price=[0,25000]) => async (dispatch) =>{
    try{
        dispatch({type: ALL_PRODUCT_REQUEST});

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
        const {data} = await axios.get(link);
        console.log({data});

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        })
    }catch(error){
            dispatch({
                type: ALL_PRODUCT_FAIL,
                payload: error.response.data.message
        })
    }
}

export const getProductDetails = (id) => async (dispatch) =>{
    try{
        dispatch({type: PRODUCT_DETAILS_REQUEST});

        const {data} = await axios.get(`/api/v1/product/${id}`);

        dispatch({  
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        })
    }catch(error){
            dispatch({
                type: PRODUCT_DETAILS_FAIL,
                payload: error.response.data.message
        })
    }
}

//Clearing errors
export const clearErrors = () => async(dispatch) => {
    dispatch({type: CLEAR_ERRORS})

}