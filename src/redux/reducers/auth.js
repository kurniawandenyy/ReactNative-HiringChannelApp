const initialState = {
  id: '',
  email: '',
  role: '',
  isLoading: false,
  isError: false,
  message: '',
  token: '',
  SessionName: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_PENDING':
    case 'LOGIN_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case 'REGISTER_FULFILLED':
      return {
        ...state,
        isError: false,
        isLoading: false,
        message: 'Register Success!',
      };
    case 'LOGIN_FULFILLED':
      return {
        ...state,
        isError: false,
        isLoading: false,
        id: action.payload.data.data.id,
        email: action.payload.data.data.email,
        role: action.payload.data.data.role,
        token: action.payload.data.token,
        message: action.payload.data.message,
      };
    case 'GET_SESSION_FULFILLED':
      return {
        ...state,
        isError: false,
        isLoading: false,
        SessionName: action.payload.data.result[0].name,
      };
    case 'REGISTER_REJECTED':
    case 'LOGIN_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default auth;
