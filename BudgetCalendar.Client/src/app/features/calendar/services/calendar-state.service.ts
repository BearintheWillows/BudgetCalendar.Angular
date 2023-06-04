import {Injectable, signal, Signal} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CalendarStateService {

  public selectedMonth: Signal<number> = signal(0);

  private _currentMonth = new BehaviorSubject<number>(0);
  public currentMonth$ = this._currentMonth.asObservable();


  public increaseMonth(): void {
    this._currentMonth.next(this._currentMonth.getValue() + 1);
  }

  public decreaseMonth(): void {
    this._currentMonth.next(this._currentMonth.getValue() - 1);
  }

  public resetMonth(): void {
    this._currentMonth.next(new Date().getMonth());
  }

}
