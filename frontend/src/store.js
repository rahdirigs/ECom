import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    productCreateReducer,
    productDetailsReducer,
    productListReducer,
    productUpdateReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
    userAdminReducer,
    userDetailsReducer,
    userListReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateReducer,
} from './reducers/userReducers';
import {
    orderCreateReducer,
    orderDeliverReducer,
    orderDetailsReducer,
    orderListAllReducer,
    orderListReducer,
    orderPayReducer,
} from './reducers/orderReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    userList: userListReducer,
    userAdmin: userAdminReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
    orderListAll: orderListAllReducer,
    orderDeliver: orderDeliverReducer,
});

const cartItemsLocal = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

const userInfoLocal = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const shippingAddressLocal = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};

const paymentMethodLocal = localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : null;

const initialState = {
    cart: {
        cartItems: cartItemsLocal,
        shippingAddress: shippingAddressLocal,
        paymentMethod: paymentMethodLocal,
    },
    userLogin: { userInfo: userInfoLocal },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
