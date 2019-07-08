const initialState = {
  allValues: [],
  values: [],
  quantity: 10,
  value: {
    id: "",
    nome: "",
    cnpj: "",
    inscricaoEstadual: "",
    latitude: "",
    longitude: ""
  },
  indice: 0
};

export default function todos(state = initialState, action) {
  switch (action.type) {
    case "SELECT_ALL":
      return {
        ...state,
        allValues: action.values,
        indice: action.values.length + 1
      };

    case "SELECT_USER":
      return { ...state, values: action.values };

    case "ADD_USER":
      console.log(state.values.length);
      if (state.values.length === state.quantity) {
        let allValues = state.allValues;
        allValues.push(action.values);
        return {
          ...state,
          allValues: allValues,
          indice: state.allValues.length + 1
        };
      } else {
        let user = state.values;
        user.push(action.values);
        let allValues = state.allValues;
        allValues.push(action.values);
        return {
          ...state,
          values: user,
          allValues: allValues,
          indice: state.allValues.length + 1
        };
      }

    case "DELETE_USER":
      let allValues = state.allValues;
      allValues = allValues.filter(user => user.id !== action.values.id);
      console.log(allValues);
      let values = state.values;
      values = values.filter(user => user.id !== action.values.id);
      return {
        ...state,
        values: values,
        allValues: allValues,
        indice: state.allValues.length
      };
    case "INDEX_USER":
      return {
        ...state,
        value: action.values
      };
    default:
      return state;
  }
}
