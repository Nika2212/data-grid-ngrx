import { Component, OnInit } from '@angular/core';
import { EventBusService } from './core/services/event-bus.service';
import { EventBusActions } from './core/enums/event-bus-actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public editModalState: boolean;
  public deleteModalState: boolean;

  constructor(
    private eventBusService: EventBusService
  ) {
  }

  public ngOnInit(): void {
    this.eventBusService.on(EventBusActions.EditModalOpen, () => this.editModalState = true);
    this.eventBusService.on(EventBusActions.EditModalClose, () => this.editModalState = false);
    this.eventBusService.on(EventBusActions.DeleteModalOpen, () => this.deleteModalState = true);
    this.eventBusService.on(EventBusActions.DeleteModalClose, () => this.deleteModalState = false);
  }
}
