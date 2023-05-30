import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarStateService {

  private _currentMonth = new BehaviorSubject<number>(new Date().getMonth());
  public currentMonth = this._currentMonth.asObservable();

  constructor() { }
}
