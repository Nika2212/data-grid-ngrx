import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { map } from 'rxjs/operators';
import { SelectProductAction } from '../../../store/actions/product.action';
import { EventBusService } from '../../../core/services/event-bus.service';
import { EmitEvent } from '../../../shared/models/emit-event.model';
import { EventBusActions } from '../../../core/enums/event-bus-actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public productList: Product[];
  public selectedProduct: Product;

  constructor(
    private store: Store<AppState>,
    private eventBusService: EventBusService
  ) {}

  private getProductData(): void {
    this.store.select(store => store.productState)
      .pipe(map(value => value.products))
      .subscribe(payload => this.productList = payload);
  }

  private selectProduct(index: number): void {
    this.selectedProduct = this.productList[index];
    const selectedProduct = { ...this.selectedProduct };

    this.store.dispatch(new SelectProductAction(selectedProduct));
    this.selectedProduct = this.productList[index];
  }

  private editProduct(): void {
    const selectedProduct = { ...this.selectedProduct };

    this.eventBusService.emit(new EmitEvent(EventBusActions.EditModalOpen, null));
    this.store.dispatch(new SelectProductAction(selectedProduct));
  }

  private removeProduct(): void {
    this.eventBusService.emit(new EmitEvent(EventBusActions.DeleteModalOpen));
  }

  public ngOnInit(): void {
    this.getProductData();
    this.eventBusService.on(EventBusActions.OnProductDelete, () => this.selectedProduct = null);
  }

  public onProductClick(index: number): void {
    this.selectProduct(index);
  }

  public onProductEditClick(): void {
    this.editProduct();
  }

  public onProductRemoveClick(): void {
    this.removeProduct();
  }
}
