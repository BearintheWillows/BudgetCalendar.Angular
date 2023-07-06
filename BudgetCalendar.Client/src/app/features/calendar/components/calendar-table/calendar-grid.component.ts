import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarChunkPipe} from "../../pipes/calendar-chunk.pipe";
import {DayCardItemComponent} from "../day-card-item/day-card-item.component";
import {DayCardComponent} from "../day-card/day-card.component";
import {CalendarService} from "../../../../Data/services/calendar.service";
import {DayNames} from "../../../../Data/types/calendar/day-names.constants";
import {ButtonModule} from "primeng/button";



@Component({
  selector: 'app-calendar-grid',
  standalone: true,
  imports: [
    CommonModule,
    CalendarChunkPipe,
    DayCardItemComponent,
    DayCardComponent,
    ButtonModule,
  ],
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss'],

})
export class CalendarGridComponent implements OnInit{

  calendarService = inject(CalendarService);

  protected readonly DayNames = DayNames;

  ngOnInit(): void {
    this.calendarService.createCalendar();
  }
}
