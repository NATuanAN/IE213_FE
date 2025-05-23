// import { FETCH_USER_LOGIN_SUCCESS } from "../action/userAction";

// const INITIAL_STATE = {
//     account: {
//         access_token: "",
//         refresh_token: "",
//         username: "",
//         image: "",
//         role: "",
//     },
//     isAuthenticated: false,
// };
// const userReducer = (state = INITIAL_STATE, action) => {
//     switch (action.type) {
//         case FETCH_USER_LOGIN_SUCCESS:
//             return {
//                 ...state,
//                 count: {
//                     access_token: action?.payload?.DT?.accessToken,
//                     refresh_token: action?.payload?.DT?.refreshToken,
//                     username: action?.payload?.DT?.username,
//                     image: action?.payload?.DT?.image,
//                     role: action?.payload?.DT?.role,
//                 },
//                 isAuthenticated: true,
//             };

//         default:
//             return state;
//     }
// };

// export default userReducer;

import { FETCH_USER_LOGIN_SUCCESS } from "../action/userAction";

const INITIAL_STATE = {
    account: {
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
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                    username: action.payload.username,
                    image: action.payload.image || "", // nếu không có image
                    role: action.payload.role,
                },
                isAuthenticated: true,
            };

        default:
            return state;
    }
};

export default userReducer;
