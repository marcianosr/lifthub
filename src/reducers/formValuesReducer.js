export const formValuesReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_EXCERSISE":
      return {
        ...state,
        excersise: action.value,
      };

    default:
      return state;
  }
};

export default formValuesReducer;
