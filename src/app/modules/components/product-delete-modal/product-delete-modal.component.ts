import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { EventBusService } from '../../../core/services/event-bus.service';
import { EmitEvent } from '../../../shared/models/emit-event.model';
import { EventBusActions } from '../../../core/enums/event-bus-actions';
import { map } from 'rxjs/operators';
import { RemoveProductAction } from '../../../store/actions/product.action';

@Component({
  selector: 'app-product-delete-modal',
  templateUrl: './product-delete-modal.component.html',
  styleUrls: ['./product-delete-modal.component.css']
})
export class ProductDeleteModalComponent implements OnInit {
  public productModel: Product;

  constructor(
    private store: Store<AppState>,
    private eventBusService: EventBusService
  ) { }

  private closeModal(): void {
    this.eventBusService.emit(new EmitEvent(EventBusActions.DeleteModalClose));
  }

  private deleteProduct(): void {
    this.store.dispatch(new RemoveProductAction(this.productModel.id));
    this.eventBusService.emit(new EmitEvent(EventBusActions.OnProductDelete));
    this.closeModal();
  }

  public ngOnInit(): void {
    this.store.select(store => store.productState)
      .pipe(map(u => u.selectedProduct))
      .subscribe(payload => this.productModel = payload);
  }

  public onClose(): void {
    this.closeModal();
  }

  public onDelete(): void {
    this.deleteProduct();
  }
}
