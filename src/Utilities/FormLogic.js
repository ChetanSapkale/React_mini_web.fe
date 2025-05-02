export const initialState = {
  title: "",
  imageUrl: "",
  price: 0,
  category: "",
  description: "",
};

export function reducer(state, action) {
  if (action.type === "TITLE") {
    return { ...state, title: action.payload };
  } else if (action.type === "IMAGE") {
    return { ...state, imageUrl: action.payload };
  } else if (action.type === "PRICE") {
    return { ...state, price: action.payload };
  } else if (action.type === "CATEGORY") {
    return { ...state, category: action.payload };
  } else if (action.type === "DESCRIPTION") {
    return { ...state, description: action.payload };
  }
}
