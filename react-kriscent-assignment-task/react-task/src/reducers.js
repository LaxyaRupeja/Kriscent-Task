// reducers.js
const initialState = {
    isLogin: false,
    cart: [],
    orders: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isLogin: true };
        case 'LOGOUT':
            return { ...state, isLogin: false };
        case 'ADD_TO_CART':
            return { ...state, cart: [...state.cart, action.payload] };
        case 'REMOVE_FROM_CART':
            return { ...state, cart: state.cart.filter(item => item.id !== action.payload.id) };
        case 'CHECKOUT':
            return { ...state, cart: [], orders: [...state.orders, ...state.cart] };
        default:
            return state;
    }
};

export default rootReducer;
