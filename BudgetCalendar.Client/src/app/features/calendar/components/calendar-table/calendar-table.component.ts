import {Component, computed, inject, Inject, OnInit, Signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarChunkPipe} from "../../pipes/calendar-chunk.pipe";
import {DayCardItemComponent} from "../day-card-item/day-card-item.component";
import {DayCardComponent} from "../day-card/day-card.component";
import {CalendarStateService} from "../../services/calendar-state.service";



@Component({
  selector: 'app-calendar-table',
  standalone: true,
  imports: [
    CommonModule,
    CalendarChunkPipe,
    DayCardItemComponent,
    DayCardComponent,
  ],
  templateUrl: './calendar-table.component.html',
  styleUrls: ['./calendar-table.component.scss'],

})
export class CalendarTableComponent implements OnInit{

  calendarService = inject(CalendarStateService);

  ngOnInit(): void {
    this.calendarService.generateCalendarDays();
    this.calendarService.getCalendarDays();
  }

  public increaseMonth() {
    this.calendarService.monthIndex.set(this.calendarService.monthIndex() + 1);
    this.calendarService.generateCalendarDays();
  }

  public decreaseMonth() {
    this.calendarService.monthIndex.set(this.calendarService.monthIndex() - 1);
    this.calendarService.generateCalendarDays();
  }


}
