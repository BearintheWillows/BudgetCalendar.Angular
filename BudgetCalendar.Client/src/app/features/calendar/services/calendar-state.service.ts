import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {CalendarDay} from "../models/calendar-day";
import {ICalendarDay} from "../models/iCalendarDay";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CalendarStateService {

  http = inject(HttpClient);

  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  today: Signal<Date> = signal(new Date());
  monthIndex= signal(0);

  calendarStartDate = computed(() => this.getStartDateForSelectedCalendarMonth(this.firstDayOfSelectedMonth()));
  amountOfDaysInSelectedCalendar: Signal<number> = computed(() => this.getNumberOfFullWeeksToFitInCalendar(this.calendarStartDate()));
  firstDayOfSelectedMonth = computed(() => new Date(this.today().getFullYear(), this.today().getMonth() + this.monthIndex()));
  selectedMonthName = computed(() => this.monthNames[this.today().getMonth() + this.monthIndex()]);
  selectedMonthNumber = computed(() => this.today().getMonth() + this.monthIndex() );
  calendar = signal<ICalendarDay[]>([]);


  /// This method is used to get the number of full weeks that will fit in the calendar.
  /// If the first day of the calendar month is a Monday, then the method will return the number of full weeks in the month.
  /// If the first day of the calendar month is not a Monday, then the method will return the number of full weeks in the month + the number of days in the previous month that are needed to fill the first week of the calendar.
  private getNumberOfFullWeeksToFitInCalendar(selectedDate: Date) {
    if (selectedDate.getDate() === 1) {
      let lastDayOfCurrentMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1 , 0);

      return Math.ceil(lastDayOfCurrentMonth.getDate() / 7 )
    } else {
      let lastDayOfNextMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 2, 0 )
      let daysUntillEndOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0).getDate() - selectedDate.getDate();

      return Math.ceil(Math.ceil((daysUntillEndOfMonth + lastDayOfNextMonth.getDate()) / 7 ));
    }
  }

  /// This method is used to get the first day of the calendar month.
  /// If the first day of the calendar month is not a Monday, then the method will return the last Monday of the previous month.
  /// This is done to ensure that the calendar always starts on a Monday.
  private getStartDateForSelectedCalendarMonth(selectedDate: Date){

    if (this.firstDayOfSelectedMonth().getDay() != 1) {

    let lastMondayOfPreviousMonth;
      do{

        lastMondayOfPreviousMonth = new Date(this.firstDayOfSelectedMonth().setDate(this.firstDayOfSelectedMonth().getDate() - 1));
      } while (this.firstDayOfSelectedMonth().getDay() != 1)

      return lastMondayOfPreviousMonth;
    } else {
      return this.firstDayOfSelectedMonth();
    }
  }

  public generateCalendarDays(): void {

    let dateToAddToCalendar = this.calendarStartDate();
    let loopNumber = this.amountOfDaysInSelectedCalendar();
    let cal: ICalendarDay[] = [];

    for (var i = 0; i < loopNumber * 7; i++) {
      const newDay :ICalendarDay = {
        date: dateToAddToCalendar,
        monthNumber: dateToAddToCalendar.getMonth() + 1,
        budgets: [],
        total: signal(0)
      }
      cal.push(newDay);
      dateToAddToCalendar = new Date(dateToAddToCalendar.setDate(dateToAddToCalendar.getDate() + 1));

    }
    this.calendar.set(cal);

    console.log(this.calendar());
  }

  public getCalendarDays(): void{
    this.http.get<ICalendarDay[]>('https://localhost:44381/api/budget/calendar-budgets?startDate=2023-06-01&endDate=2023-06-30').subscribe(result => {
      console.log(result);
    });
  }






}
