import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILED,
} from '../constants/productConsts';
import axios from 'axios';

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });

        const { data } = await axios.get('/api/products');

        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
