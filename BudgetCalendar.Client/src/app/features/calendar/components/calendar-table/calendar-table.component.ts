import {Component, computed, inject, Inject, OnInit, Signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarChunkPipe} from "../../pipes/calendar-chunk.pipe";
import {DayCardItemComponent} from "../day-card-item/day-card-item.component";
import {DayCardComponent} from "../day-card/day-card.component";
import {CalendarService} from "../../../../Data/services/calendar.service";



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

  calendarService = inject(CalendarService);

  ngOnInit(): void {
    this.calendarService.createCalendar();
  }

  public increaseMonth() {
    this.calendarService.increaseMonthIndex();
  }

  public decreaseMonth() {
    this.calendarService.decreaseMonthIndex();
  }

  public onToday(){
    this.calendarService.resetToTodayMonthIndex();
  }


}
