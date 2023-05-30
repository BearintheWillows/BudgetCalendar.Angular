import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarDay } from 'src/app/CalendarDay';
import { CalendarChunkPipe } from '../calendar-chunk.pipe';
import { DayCardItemComponent } from '../day-card-item/day-card-item.component';
import { DayCardComponent } from '../day-card/day-card.component';

@Component({
  selector: 'app-calendar-table',
  standalone: true,
  imports: [CommonModule, CalendarChunkPipe, DayCardItemComponent, DayCardComponent],
  templateUrl: './calendar-table.component.html',
  styleUrls: ['./calendar-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTableComponent {
  public calendar: CalendarDay[] = [];
  public monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  public displayMonth: string = '';
  public displayMonthNumber: number = 0;
  public monthIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.generateCalendarDays(this.monthIndex);
  }

  private generateCalendarDays(monthIndex: number): void {
    this.calendar = [];

    // Sets the day to last day of specified month
    let day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));
    
    // set the dispaly month for UI.
    // getMonth() returns a number between 0 and 11, so we need to use it as an index for the monthNames array
    this.displayMonth = this.monthNames[day.getMonth()];
    this.displayMonthNumber = day.getMonth();

    let startingDateOfCalendar = this.getStartDateForCalendar(day);
  
    let dateToAdd = startingDateOfCalendar;

    let loopNumber = this.getNumberOfFullWeeksToFitInCalendar(startingDateOfCalendar);

    console.log(`loopnumber: ${loopNumber}`);

    for (var i = 0; i < loopNumber * 7; i++) {
      this.calendar.push(new CalendarDay(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }

  private getStartDateForCalendar(selectedDate: Date){
    // for the day we selected let's get the previous month last day
    // we need to set the day to 0 to get the last day of the previous month.
//check if first day of month is monday, if not, then get the last monday of previous month
    let firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);

    if (firstDayOfMonth.getDay() != 1) {
      // get the last monday of previous month
      let lastMondayOfPreviousMonth = new Date(firstDayOfMonth.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay() + 1));
      return lastMondayOfPreviousMonth;
    } else {
      return firstDayOfMonth;
    }
  }

  private getNumberOfFullWeeksToFitInCalendar(selectedDate: Date) {
    // for the day we selected, work out how many day untill the end of the next month if the selected date is not the 1st of the month
    // if the selected date is the 1st of the month, then we need to work out how many days untill the end of the current month
    
    // Get the date of the last day of the next month.

    console.log(`selectedDate: ${selectedDate}`);

    if (selectedDate.getDate() === 1) {
      let lastDayOfCurrentMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1 , 0);
      console.log(`lastDayOfCurrentMonth: ${lastDayOfCurrentMonth}`);
      return Math.ceil(lastDayOfCurrentMonth.getDate() / 7 )
    } else {
      let lastDayOfNextMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 2, 0 )
      let daysUntillEndOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0).getDate() - selectedDate.getDate();
      console.log(`daysUntillEndOfNextMonth: ${daysUntillEndOfMonth + lastDayOfNextMonth.getDate()}`);
      console.log(Math.ceil((daysUntillEndOfMonth + lastDayOfNextMonth.getDate()) / 7 ));
     
      return Math.ceil(Math.ceil((daysUntillEndOfMonth + lastDayOfNextMonth.getDate()) / 7 ));
    }
    

    return 0;
  

  
  }


  public increaseMonth() {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);
  }

  public decreaseMonth() {
    this.monthIndex--
    this.generateCalendarDays(this.monthIndex);
  }

  public setCurrentMonth() {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }
}
