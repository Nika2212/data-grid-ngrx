import { EventBusActions } from '../../core/enums/event-bus-actions';

export class EmitEvent {
  constructor(public action: EventBusActions, public payload?: any) {}
}
