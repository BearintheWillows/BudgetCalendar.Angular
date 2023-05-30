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

    let day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));

    this.displayMonth = this.monthNames[day.getMonth()];
    this.displayMonthNumber = day.getMonth();

    let startingDateOfCalendar = this.getStartDateForCalendar(day);
    let dateToAdd = startingDateOfCalendar;
    let loopNumber = this.getNumberOfFullWeeksToFitInCalendar(startingDateOfCalendar);

    for (var i = 0; i < loopNumber * 7; i++) {
      this.calendar.push(new CalendarDay(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }

  private getStartDateForCalendar(selectedDate: Date){
    let firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);

    if (firstDayOfMonth.getDay() != 1) {
    
      let lastMondayOfPreviousMonth;
      do{
        lastMondayOfPreviousMonth = new Date(firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 1));
        console.log(lastMondayOfPreviousMonth)
      } while (firstDayOfMonth.getDay() != 1)
      
      return lastMondayOfPreviousMonth;
    } else {
      return firstDayOfMonth;
    }
  }


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
