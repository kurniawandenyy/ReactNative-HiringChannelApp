const initialState = {
  card: [],
  isLoading: false,
  isError: false,
  name: '',
  photo: null,
  description: '',
  skill: '',
  location: '',
  date_of_birth: '0000-00-00',
  expected_salary: 0,
  email: '',
  phone: '',
  showcase: '',
  message: '',
};

const engineers = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ENGINEERS_PENDING':
    case 'GET_ENGINEER_PENDING':
    case 'DELETE_ENGINEER_PENDING':
    case 'UPDATE_ENGINEER_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case 'FETCH_ENGINEERS_FULFILLED':
      return {
        ...state,
        isError: false,
        isLoading: false,
        card: action.payload.data.result.data,
      };
    case 'GET_ENGINEER_FULFILLED':
      return {
        ...state,
        isError: false,
        isLoading: false,
        id: action.payload.data.result[0].id,
        name: action.payload.data.result[0].name,
        photo: action.payload.data.result[0].photo,
        description: action.payload.data.result[0].description,
        skill: action.payload.data.result[0].skill,
        location: action.payload.data.result[0].location,
        date_of_birth: action.payload.data.result[0].date_of_birth,
        expected_salary: action.payload.data.result[0].expected_salary,
        email: action.payload.data.result[0].email,
        phone: action.payload.data.result[0].phone,
        showcase: action.payload.data.result[0].showcase,
      };
    case 'UPDATE_ENGINEER_FULFILLED':
      return {
        ...state,
        isError: false,
        isLoading: false,
      };
    case 'DELETE_ENGINEER_FULFILLED':
      return {
        ...state,
        isError: false,
        isLoading: false,
        message: 'Deleted',
      };
    case 'FETCH_ENGINEERS_REJECTED':
    case 'GET_ENGINEER_REJECTED':
    case 'DELETE_ENGINEER_REJECTED':
    case 'UPDATE_ENGINEER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default engineers;
