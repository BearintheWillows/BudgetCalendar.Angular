
import {Signal} from "@angular/core";
import {IBudget} from "./iBudget";

export interface ICalendarDay {
  date: Date;
  title: string;
  isToday: boolean;
  monthNumber: number;
  budgets: IBudget[];
  total: Signal<number>;
}
