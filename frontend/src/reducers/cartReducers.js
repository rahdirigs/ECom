import { CART_ADD_ITEM, CART_REM_ITEM } from '../constants/cartConsts';

export const cartReducer = (state = { cartItems: [] }, action) => {
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

        default:
            return state;
    }
};