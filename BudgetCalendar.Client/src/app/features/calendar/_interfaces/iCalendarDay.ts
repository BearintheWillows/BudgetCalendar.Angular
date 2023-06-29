import {IBudget} from "./iBudget";

export interface ICalendarDay {
  date: Date;
  dayNumber: number;
  dayName: string;
  isToday: boolean;
  budgets: IBudget[];
}
