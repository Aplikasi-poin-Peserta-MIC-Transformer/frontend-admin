import jwt_decode from "jwt-decode";

export const intialState = {
  isAuthenticated: !!localStorage.getItem("accessToken") || false,
  user: !!localStorage.getItem("accessToken") ? jwt_decode(localStorage.getItem("accessToken")) : null,
  token: localStorage.getItem("accessToken") || null,
};


export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("accessToken", action.payload);
      return {
        ...state,
        isAuthenticated: true,
        user: jwt_decode(action.payload),
        token: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("accessToken");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
}
