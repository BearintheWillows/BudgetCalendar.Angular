import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarGridComponent } from './components/calendar-table/calendar-grid.component';
import {GenerateCalendarService} from "../../Data/services/calendar/generate-calendar.service";
import {CalendarHeaderComponent} from "./components/calendar-header/calendar-header.component";
import {CalendarService} from "../../Data/services/calendar.service";

@Component({
  standalone: true,
  imports: [CommonModule, CalendarGridComponent, CalendarHeaderComponent],
  templateUrl: './calendar-home.component.html',
  styleUrls: ['./calendar-home.component.scss']
})
export class CalendarHomeComponent {

  calendarService = inject(CalendarService);

  ngOnInit(): void {
      this.calendarService.resetToTodayMonthIndex();
  }
}
