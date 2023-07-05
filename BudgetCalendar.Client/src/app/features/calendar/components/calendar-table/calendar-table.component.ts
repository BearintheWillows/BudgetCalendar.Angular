import {Component, computed, inject, Inject, OnInit, Signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarChunkPipe} from "../../pipes/calendar-chunk.pipe";
import {DayCardItemComponent} from "../day-card-item/day-card-item.component";
import {DayCardComponent} from "../day-card/day-card.component";
import {CalendarService} from "../../../../Data/services/calendar.service";
import {MonthNames} from "../../../../Data/types/calendar/month-names.constants";
import {DayNames} from "../../../../Data/types/calendar/day-names.constants";
import {ButtonModule} from "primeng/button";



@Component({
  selector: 'app-calendar-table',
  standalone: true,
  imports: [
    CommonModule,
    CalendarChunkPipe,
    DayCardItemComponent,
    DayCardComponent,
    ButtonModule,
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


  protected readonly MonthNames = MonthNames;
  protected readonly DayNames = DayNames;
}
