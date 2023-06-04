import {Injectable, signal, Signal} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CalendarStateService {

  public selectedMonth = signal(0);

  public increaseMonth(): void {
    this.selectedMonth.update( v => v++);
  }

  public decreaseMonth(): void {
    this.selectedMonth.update( v => v--);
  }

}
