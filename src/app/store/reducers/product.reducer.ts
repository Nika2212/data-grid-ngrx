import { ProductState } from '../states/product.state';
import {
  AddProductAction,
  EditProductAction,
  ProductAction,
  ProductActionTypes,
  RemoveProductAction,
  SelectProductAction
} from '../actions/product.action';

const initialState: ProductState = {
  products: [],
  selectedProduct: null
};

export function ProductReducer(state: ProductState = initialState, action: ProductAction): ProductState {
  switch (action.type) {
    default:
      return state;

    case ProductActionTypes.ADD_PRODUCT:
      if (action instanceof AddProductAction) return {...state, products: [...state.products, action.payload]};
      break;

    case ProductActionTypes.SELECT_PRODUCT:
      if (action instanceof SelectProductAction) return {...state, selectedProduct: action.payload};
      break;

    case ProductActionTypes.EDIT_PRODUCT:
      if (action instanceof EditProductAction) return { ...state, products: state.products.map(p => p.id === action.payload.id ? action.payload : p) }; break;

    case ProductActionTypes.REMOVE_PRODUCT:
      if (action instanceof RemoveProductAction) return { ...state, products: state.products.filter(p => p.id !== action.payload) }; break;
  }
}
