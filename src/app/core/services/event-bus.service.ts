import { Injectable } from '@angular/core';
import { EmitEvent } from '../../shared/models/emit-event.model';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EventBusActions } from '../enums/event-bus-actions';

@Injectable()
export class EventBusService {
  private subject$: Subject<EmitEvent> = new Subject<EmitEvent>();

  public on(event: EventBusActions, callback: () => {}): Subscription {
    return this.subject$
      .pipe(
        filter(e => e.action === event),
        map(e => e.payload)
      )
      .subscribe(callback);
  }

  public emit(event: EmitEvent): void {
    this.subject$.next(event);
  }
}
