export const elementsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ELEMENT":
      return {
        ...state,
        [action.id]: [
          {
            id: action.id,
            element: "label",
            value: "Excersise",
            htmlFor: null,
          },
          {
            id: action.id,
            element: "input",
            name: "excersise",
            type: "text",
            value: "",
          },
        ],
      };
    case "DELETE_ELEMENT":
    default:
      return state;
  }
};

export const subElementsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_SUB_ELEMENT":
      return {
        ...state,
        [action.id]: [
          {
            id: action.id,
            element: "label",
            value: "Weight",
            htmlFor: null,
          },
          {
            id: action.id,
            element: "input",
            name: "weight",
            type: "number",
            value: "",
          },
          {
            id: action.id,
            element: "label",
            value: "Reps",
            htmlFor: null,
          },
          {
            id: action.id,
            element: "input",
            name: "reps",
            type: "number",
            value: "",
          },
        ],
      };
    case "DELETE_SUB_ELEMENT":
    default:
      return state;
  }
};

export default elementsReducer;
