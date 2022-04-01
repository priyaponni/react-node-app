const initialState = {
    data: [],
  };
  
  const actions = {
    'ADD_USER': addUser,
  };
  
  function addUser(state, action) {
    return {
      list: [...state.data, action.payload],
    }
  }
  
  export default {
    initialState,
    actions
  }