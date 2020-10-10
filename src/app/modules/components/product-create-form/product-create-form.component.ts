import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { Store } from '@ngrx/store';
import { AddProductAction } from '../../../store/actions/product.action';
import * as faker from 'faker';
import { ProductState } from '../../../store/states/product.state';

@Component({
  selector: 'app-product-create-form',
  templateUrl: './product-create-form.component.html',
  styleUrls: ['./product-create-form.component.css']
})
export class ProductCreateFormComponent implements OnInit {
  public createProductModel: Product;

  constructor(
    private store: Store<ProductState>
  ) {}

  private resetCreateProductForm(): void {
    this.createProductModel = new Product();
  }

  private submitForm(): void {
    const newProduct = { ...this.createProductModel };

    this.store.dispatch(new AddProductAction(newProduct));

    this.generateProduct();
  }

  private generateProduct(): void {
    this.createProductModel.id = faker.random.uuid();
    this.createProductModel.name = faker.commerce.productName();
    this.createProductModel.category = faker.commerce.department();
    this.createProductModel.customerName = faker.name.firstName()[0] + '. ' + faker.name.lastName();
    this.createProductModel.customerIBAN = faker.finance.iban();
    this.createProductModel.merchantName = faker.commerce.department();
    this.createProductModel.merchantIBAN = faker.finance.iban();
  }

  private fillProducts(): void {
    for (let i = 0; i < 5; i++) {
      this.submitForm();
    }
  }

  public ngOnInit(): void {
    this.resetCreateProductForm();
    this.generateProduct();
    this.fillProducts();
  }

  public onFormResetClick(): void {
    this.resetCreateProductForm();
  }

  public onProductSubmitClick(): void {
    this.submitForm();
  }
}
