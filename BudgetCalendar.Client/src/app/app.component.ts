import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import {CalendarTableComponent} from "./features/calendar/components/calendar-table/calendar-table.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { PrimeNGConfig } from 'primeng/api';
import {SideMenuComponent} from "./core/side-menu/side-menu.component";
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
  imports: [NgSwitch,
    NgSwitchDefault,
    NgSwitchCase,
    RouterOutlet,
    CalendarTableComponent, SideMenuComponent]
})
export class AppComponent {
  title = 'BudgetCalendar.Client';

  constructor(private PrimeNGConfigrime: PrimeNGConfig) {}

  ngOnInit() {
    this.PrimeNGConfigrime.ripple = true;
  }
}


