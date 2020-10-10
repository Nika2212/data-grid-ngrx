import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './modules/components/product-list/product-list.component';
import { ProductCreateFormComponent } from './modules/components/product-create-form/product-create-form.component';
import { ProductEditFormComponent } from './modules/components/product-edit-form/product-edit-form.component';
import { StoreModule } from '@ngrx/store';
import { ProductReducer } from './store/reducers/product.reducer';
import { FormsModule } from '@angular/forms';
import { EventBusService } from './core/services/event-bus.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCreateFormComponent,
    ProductEditFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({
      productState: ProductReducer
    })
  ],
  providers: [EventBusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
