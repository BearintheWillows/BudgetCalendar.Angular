
import {Signal} from "@angular/core";
import {IBudget} from "./iBudget";

export interface ICalendarDay {
  date: Date;
  monthNumber: number;
  budgets: IBudget[];
  total: number;
}
