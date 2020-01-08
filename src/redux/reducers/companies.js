const initialState = {
  card: [],
  isLoading: false,
  isError: false,
  id: '',
  name: '',
  logo: null,
  description: '',
  location: '',
  email: '',
};

const companies = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_COMPANIES_PENDING':
    case 'GET_COMPANY_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case 'FETCH_COMPANIES_FULFILLED':
      return {
        ...state,
        isError: false,
        isLoading: false,
        card: action.payload.data.result.data,
      };
    case 'GET_COMPANY_FULFILLED':
      return {
        ...state,
        id: action.payload.data.result[0].id,
        name: action.payload.data.result[0].name,
        logo: action.payload.data.result[0].logo,
        email: action.payload.data.result[0].email,
        description: action.payload.data.result[0].description,
        location: action.payload.data.result[0].location,
        isError: false,
        isLoading: false,
      };
    case 'FETCH_COMPANIES_REJECTED':
    case 'GET_COMPANY_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default companies;
