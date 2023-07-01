
import {Signal} from "@angular/core";
import {IBudget} from "./iBudget";

export interface ICalendarDay {
  date: string;
  monthNumber: number;
  budgets: IBudget[];
  total: number;
}
