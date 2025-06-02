

import { FETCH_USER_LOGIN_SUCCESS } from "../action/userAction";

const INITIAL_STATE = {
    account: {
        id: "", // <-- Thêm vào đây
        accessToken: "",
        refreshToken: "",
        username: "",
        image: "",
        role: "",
    },
    isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state,
                account: {
                    id: action.payload.id,
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                    username: action.payload.username,
                    image: action.payload.image || "",
                    role: action.payload.role,
                },
                isAuthenticated: true,
            };

        case "USER_LOGOUT":
            return {
                ...INITIAL_STATE, // Reset tất cả về trạng thái ban đầu
            };

        default:
            return state;
    }
};

export default userReducer;
