const initialState = {
    subscription: null,
    // otros estados de suscripción si los tienes
  };
  
  const subscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PLAN_TYPE':
        return { ...state, subscription: action.payload };
      // otros casos de acciones si los tienes
      default:
        return state;
    }
  };
  
  export default subscriptionReducer;