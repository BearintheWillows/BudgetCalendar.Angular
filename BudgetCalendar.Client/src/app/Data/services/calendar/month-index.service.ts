import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonthIndexService {

  private monthIndex = signal(0);

  incrementMonthIndex = () => {
    this.monthIndex.set(this.monthIndex() + 1);
  }

  decrementMonthIndex = () => {
    this.monthIndex.set(this.monthIndex() - 1);
  }

  setMonthIndex = (monthIndex: number) => {
    this.monthIndex.set(monthIndex);
  }

  getMonthIndex = () => {
    return this.monthIndex();
  }

  resetMonthIndex = () => {
    this.monthIndex.set(0);
  }


}
