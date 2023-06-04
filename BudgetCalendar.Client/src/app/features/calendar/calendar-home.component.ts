import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarTableComponent } from './components/calendar-table/calendar-table.component';

@Component({
  standalone: true,
  imports: [CommonModule, CalendarTableComponent],
  templateUrl: './calendar-home.component.html',
  styleUrls: ['./calendar-home.component.scss']
})
export class CalendarHomeComponent {

}
