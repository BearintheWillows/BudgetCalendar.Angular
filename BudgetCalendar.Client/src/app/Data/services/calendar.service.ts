import {computed, inject, Injectable, signal} from '@angular/core';
import {ICalendarDay} from "../../features/calendar/models/iCalendarDay";
import {GenerateCalendarService} from "./calendar/generate-calendar.service";
import {MonthIndexService} from "./calendar/month-index.service";
import {MonthNames} from "../types/calendar/month-names.constants";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  generateCalendarService = inject(GenerateCalendarService)
  monthIndexService = inject(MonthIndexService)

  calendar = signal<ICalendarDay[]>([])
  displayMonth = signal<Date>(new Date())
  currentMonth = signal<Date>(new Date())
  displayMonthName = computed(() => MonthNames[this.displayMonth().getMonth()])


   public createCalendar = async () => {
     this.calendar.set(await this.generateCalendarService.generateCalendarDays());
      this.displayMonth.set(new Date(this.currentMonth().getFullYear(), this.currentMonth().getMonth() + this.monthIndexService.getMonthIndex(), 1));

   }

   public increaseMonthIndex = () => {
     this.monthIndexService.incrementMonthIndex();
     this.createCalendar();
   }

    public decreaseMonthIndex = () => {
      this.monthIndexService.decrementMonthIndex();
      this.createCalendar();
    }

    public resetToTodayMonthIndex = () => {
      this.monthIndexService.resetMonthIndex();
      this.createCalendar();
    }


  public setMonthIndex(month: number) {
    this.monthIndexService.setMonthIndex(month);
    this.createCalendar();
  }

  getWeeksInCalendar() {
    return this.generateCalendarService.weeksInCalendar()
  }
}

