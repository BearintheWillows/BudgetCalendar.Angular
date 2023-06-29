import {computed, Injectable, Signal, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarStateService {

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




  private getCurrentMonthIndex(): number {
    let today = new Date();
    return today.getMonth();
  }


  public setSelectedMonth(today: Date, monthIndex: number): Date {
    return new Date(today.getFullYear(), today.getMonth() + monthIndex);
  }



}
