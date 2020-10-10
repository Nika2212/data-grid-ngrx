import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { EventBusService } from '../../../core/services/event-bus.service';
import { EmitEvent } from '../../../shared/models/emit-event.model';
import { EventBusActions } from '../../../core/enums/event-bus-actions';
import { Product } from '../../../shared/models/product.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-edit-form',
  templateUrl: './product-edit-form.component.html',
  styleUrls: ['./product-edit-form.component.css']
})
export class ProductEditFormComponent implements OnInit {
  public productModel: Product;

  constructor(
    private store: Store<AppState>,
    private eventBusService: EventBusService
  ) { }

  private closeModal(): void {
    this.eventBusService.emit(new EmitEvent(EventBusActions.EditModalClose));
  }

  private saveChanges(): void {}

  public ngOnInit(): void {
    this.store.select(store => store.productState)
      .pipe(map(s => s.selectedProduct))
      .subscribe(payload => console.log(payload));
  }

  public onClose(): void {
    this.closeModal();
  }

  public onSave(): void {
    this.saveChanges();
  }
}
