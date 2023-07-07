import {computed, inject, Injectable, signal} from '@angular/core';
import {ICalendarDay} from "../../../features/calendar/models/iCalendarDay";
import {MonthIndexService} from "./month-index.service";
import {GenerateDaysService} from "./generate-days.service";

@Injectable({
  providedIn: 'root'
})
export class GenerateCalendarService {


  generateDaysService = inject(GenerateDaysService);
  monthIndexService = inject(MonthIndexService);

  weeksInCalendar = signal<number>(0);


  /// This method is used to get the number of full weeks that will fit in the calendar.
  /// If the first day of the calendar month is a Monday, then the method will return the number of full weeks in the month.
  /// If the first day of the calendar month is not a Monday, then the method will return the number of full weeks in the month + the number of days in the previous month that are needed to fill the first week of the calendar.
  private getNumberOfDaysToGenerate(selectedDate: Date) : number{
    if (selectedDate.getDate() === 1) {
      let lastDayOfCurrentMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1 , 0);
      return lastDayOfCurrentMonth.getDate();
    } else {

      let lastDayOfNextMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 2, 0 )
      let daysUntilEndOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0).getDate() - selectedDate.getDate();
     return daysUntilEndOfMonth + lastDayOfNextMonth.getDate();
    }
  }


  /// This method is used to get the first day of the calendar month.
  /// If the first day of the calendar month is not a Monday, then the method will return the last Monday of the previous month.
  /// This is done to ensure that the calendar always starts on a Monday.
  private getStartDateForSelectedCalendarMonth(): Date {

    const today = new Date();
    const monthIndex = this.monthIndexService.getMonthIndex();
    let firstDayOfSelectedMonth = new Date(today.getFullYear(), today.getMonth() + monthIndex, 1);

    if (firstDayOfSelectedMonth.getDay() != 1) {

      let lastMondayOfPreviousMonth;

      do{
        lastMondayOfPreviousMonth = new Date(firstDayOfSelectedMonth.setDate(firstDayOfSelectedMonth.getDate() - 1));

      } while (firstDayOfSelectedMonth.getDay() != 1)

      return lastMondayOfPreviousMonth;
    } else {

      return firstDayOfSelectedMonth;
    }
  }


  public async generateCalendarDays(): Promise<ICalendarDay[]> {

    let startDate = this.getStartDateForSelectedCalendarMonth();

    let endDate: Date = new Date(new Date().setDate(startDate.getDate() + this.getNumberOfDaysToGenerate(startDate)));
    let loopNumber = Math.ceil(this.getNumberOfDaysToGenerate(startDate) / 7);
    this.weeksInCalendar.set(loopNumber);

    let cal: ICalendarDay[] = await this.generateDaysService.generateDays(startDate, new Date(Date.UTC(endDate.getUTCFullYear(),endDate.getUTCDate(), endDate.getUTCDay())), loopNumber * 7);


    return cal;
  }
}
