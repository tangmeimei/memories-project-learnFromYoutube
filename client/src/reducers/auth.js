import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (state = { profile: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, profile: action.data };
        case LOGOUT:
            localStorage.clear();
            return { ...state, profile: null };
        default:
            return state;
    }
};

export default authReducer;