import { Action } from '@ngrx/store';
import { Product } from '../../shared/models/product.model';

export enum ProductActionTypes {
  ADD_PRODUCT = '[PRODUCTS] Add Product',
  SELECT_PRODUCT = '[PRODUCTS] Select Product',
  EDIT_PRODUCT = '[PRODUCTS] Edit Product',
  REMOVE_PRODUCT = '[PRODUCTS] Remove Product'
}

export class AddProductAction implements Action {
  public readonly type: ProductActionTypes = ProductActionTypes.ADD_PRODUCT;

  constructor(public payload: Product) {}
}

export class SelectProductAction implements Action {
  public readonly type: ProductActionTypes = ProductActionTypes.SELECT_PRODUCT;

  constructor(public payload: Product) {}
}

export class EditProductAction implements Action {
  public readonly type: ProductActionTypes = ProductActionTypes.EDIT_PRODUCT;

  constructor(public payload: Product) {}
}

export class RemoveProductAction implements Action {
  public readonly type: ProductActionTypes = ProductActionTypes.REMOVE_PRODUCT;

  constructor(public payload: string) {}
}

export type ProductAction = AddProductAction | SelectProductAction | EditProductAction | RemoveProductAction;
