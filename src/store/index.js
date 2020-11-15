export const initialState = {
  isAuth: JSON.parse(localStorage.getItem('isAuth')) || false,
  accessToken: JSON.parse(localStorage.getItem('accessToken')) || null,
  clientID: process.env.REACT_APP_CLIENT_ID,
  redirectURI: process.env.REACT_APP_REDIRECT_URI,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  proxyURL: process.env.REACT_APP_PROXY_URL
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'login': {
      localStorage
      .setItem('accessToken', JSON.stringify(action.payload.accessToken))
      localStorage
      .setItem('isAuth', JSON.stringify(true))
      return {
        ...state,
        isAuth: true,
        accessToken: action.payload.accessToken
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