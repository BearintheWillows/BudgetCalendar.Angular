
import {Signal} from "@angular/core";
import {IBudget} from "./iBudget";

export interface ICalendarDay {
  date: Date;
  isToday: boolean;
  monthNumber: number;
  budgets: IBudget[];
  total: Signal<number>;
}
