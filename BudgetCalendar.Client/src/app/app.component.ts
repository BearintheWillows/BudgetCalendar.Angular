import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import {CalendarTableComponent} from "./features/calendar/components/calendar-table/calendar-table.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
  imports: [NgSwitch, NgSwitchDefault, NgSwitchCase, RouterOutlet, CalendarTableComponent]
})
export class AppComponent {
  title = 'BudgetCalendar.Client';
}
