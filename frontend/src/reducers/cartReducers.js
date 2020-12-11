import {
    CART_ADD_ITEM,
    CART_CLEAR,
    CART_REM_ITEM,
    CART_SAVE_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConsts';

export const cartReducer = (
    state = { cartItems: [], shippingAddress: {} },
    action
) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;

            const itemExists = state.cartItems.find(
                (x) => x.product === item.product
            );

            if (itemExists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === itemExists.product ? item : x
                    ),
                };
            } else {
                return { ...state, cartItems: [...state.cartItems, item] };
            }

        case CART_REM_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (x) => x.product !== action.payload
                ),
            };

        case CART_SAVE_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            };

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            };

        case CART_CLEAR: {
            return { ...state, cartItems: [] };
        }

        default:
            return state;
    }
};
