import {Component, computed, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarChunkPipe} from "../../pipes/calendar-chunk.pipe";
import {DayCardItemComponent} from "../day-card-item/day-card-item.component";
import {CalendarService} from "../../../../Data/services/calendar.service";
import {DayNames} from "../../../../Data/types/calendar/day-names.constants";
import {ButtonModule} from "primeng/button";
import {CalendarDayComponent} from "../calendar-day/calendar-day.component";
import {DeviceService, DeviceType} from "../../../../Data/services/device.service";



@Component({
  selector: 'app-calendar-grid',
  standalone: true,
  imports: [
    CommonModule,
    CalendarChunkPipe,
    DayCardItemComponent,
    CalendarDayComponent,
    ButtonModule,
  ],
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss'],

})
export class CalendarGridComponent implements OnInit{

  calendarService = inject(CalendarService);
  deviceService = inject(DeviceService)

  device = computed(() => this.deviceService.deviceType());

  gridSize = computed(() => this.calendarService.getWeeksInCalendar());
  ngOnInit(): void {
    this.calendarService.createCalendar();
    console.log(this.device())
  }
}
