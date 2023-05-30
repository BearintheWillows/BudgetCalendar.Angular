import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import { DayCardComponent } from './Features/Calendar/Components/day-card/day-card.component';
import { CalendarDay } from './CalendarDay';
import { CalendarTableComponent } from './Features/Calendar/Components/calendar-table/calendar-table.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [NgSwitch, 
      NgSwitchDefault, 
      NgSwitchCase, 
      RouterOutlet, 
      DayCardComponent,
      CalendarTableComponent]
})
export class AppComponent {
  title = 'BudgetCalendar.Client';
}
