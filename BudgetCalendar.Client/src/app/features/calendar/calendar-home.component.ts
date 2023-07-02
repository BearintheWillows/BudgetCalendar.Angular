import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarTableComponent } from './components/calendar-table/calendar-table.component';
import {GenerateCalendarService} from "../../Data/services/calendar/generate-calendar.service";

@Component({
  standalone: true,
  imports: [CommonModule, CalendarTableComponent],
  templateUrl: './calendar-home.component.html',
  styleUrls: ['./calendar-home.component.scss']
})
export class CalendarHomeComponent {
calendarService = inject(GenerateCalendarService)

  ngOnInit(): void {
    this.calendarService.generateCalendarDays();
  }
}
