import {Component, computed, inject, Inject, OnInit, Signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarChunkPipe} from "../../pipes/calendar-chunk.pipe";
import {DayCardItemComponent} from "../day-card-item/day-card-item.component";
import {DayCardComponent} from "../day-card/day-card.component";
import {CalendarDay} from "../../models/calendar-day";
import {CalendarStateService} from "../../services/calendar-state.service";
import {AuthStateService} from "../../../../services/auth-state.service";


@Component({
  selector: 'app-calendar-table',
  standalone: true,
  imports: [
    CommonModule,
    CalendarChunkPipe,
    DayCardItemComponent,
    DayCardComponent
  ],
  templateUrl: './calendar-table.component.html',
  styleUrls: ['./calendar-table.component.scss'],

})
export class CalendarTableComponent implements OnInit{

  calendarService = inject(CalendarStateService);

  public calendar: CalendarDay[] = [];
  public monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  public displayMonth: Signal<string> = computed(() => this.calendarService.selectedMonthName());
  public displayMonthNumber: Signal<number> = computed(() => this.calendarService.selectedMonthNumber());
  public monthIndex: Signal<number> = computed(() => this.calendarService.monthIndex());


  constructor() {

  }

  ngOnInit(): void {
    this.generateCalendarDays(this.calendarService.monthIndex());
  }



  private generateCalendarDays(monthIndex: number): void {
    this.calendar = [];




    let dateToAddToCalendar = this.calendarService.calendarStartDate();
    let loopNumber = this.calendarService.amountOfDaysInSelectedCalendar();


    for (var i = 0; i < loopNumber * 7; i++) {
      this.calendar.push(new CalendarDay(new Date(dateToAddToCalendar)));
      dateToAddToCalendar = new Date(dateToAddToCalendar.setDate(dateToAddToCalendar.getDate() + 1));

    }

    console.log(this.displayMonthNumber())

  }


  public increaseMonth() {
    console.log(`monthIndex: ${this.calendarService.monthIndex()}`)
    this.calendarService.monthIndex.set(this.calendarService.monthIndex() + 1);
    this.generateCalendarDays(this.calendarService.monthIndex());
  }

  public decreaseMonth() {
    console.log(`monthIndex: ${this.calendarService.monthIndex()}`);
    this.calendarService.monthIndex.set(this.calendarService.monthIndex() - 1);

    this.generateCalendarDays(this.calendarService.monthIndex());
  }

}
