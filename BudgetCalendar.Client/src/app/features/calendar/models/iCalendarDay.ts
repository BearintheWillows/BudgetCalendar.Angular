
import {Signal} from "@angular/core";
import {IBudget} from "./iBudget";

export interface ICalendarDay {
  date: Date;
  budgets?: IBudget[] | null;
  total: number;
}
