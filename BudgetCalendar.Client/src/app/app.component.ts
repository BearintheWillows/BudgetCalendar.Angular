import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NgSwitch, NgSwitchDefault, NgSwitchCase, NgIf} from '@angular/common';
import {CalendarGridComponent} from "./features/calendar/components/calendar-table/calendar-grid.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { PrimeNGConfig } from 'primeng/api';
import {SideMenuComponent} from "./core/side-menu/side-menu.component";
import {GenerateCalendarService} from "./Data/services/calendar/generate-calendar.service";
import {CategoryService} from "./Data/services/category.service";
import {DeviceService, DeviceType} from "./Data/services/device.service";
import {HeaderComponent} from "./core/header/header.component";
import {CalendarHeaderComponent} from "./features/calendar/components/calendar-header/calendar-header.component";
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
  imports: [NgSwitch,
    NgSwitchDefault,
    NgSwitchCase,
    RouterOutlet,
    CalendarGridComponent, SideMenuComponent, HeaderComponent, NgIf, CalendarHeaderComponent]
})
export class AppComponent {

 title = 'BudgetCalendar.Client';

 categoryService = inject(CategoryService);
 deviceService = inject(DeviceService);
 router= inject(Router);

 isCalendarPage = false;
  constructor(private PrimeNGConfigrime: PrimeNGConfig) {}

  ngOnInit() {
    this.PrimeNGConfigrime.ripple = true;
    this.categoryService.getCategories();

    this.router.events.subscribe((val) => {
      this.isCalendarPage = this.router.url.includes('calendar');
    });

  }

  protected readonly DeviceType = DeviceType;
}


