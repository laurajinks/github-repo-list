export const initialState = {
  isAuth = JSON.parse(localStorage.getItem('isAuth')) || false,
  user = JSON.parse(localStorage.getItem('user')) || null,
  clientID: process.env.REACT_APP_CLIENT_ID,
  redirectURI: process.env.REACT_APP_REDIRECT_URI,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'login': {
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      localStorage.setItem('isAuth', JSON.stringify(action.payload.isLoggedIn))
      return {
        ...state,
        isAuth: action.payload.isLoggedIn,
        user: action.payload.user
      };
    }
    case 'logout': {
      localStorage.clear()
      return {
        ...state,
        isAuth: false,
        user: null
      };
    }
    default:
      return state;
  }
}