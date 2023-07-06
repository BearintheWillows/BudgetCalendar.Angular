import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthNames } from 'src/app/Data/types/calendar/month-names.constants';
import {CalendarService} from "../../../../Data/services/calendar.service";

@Component({
  selector: 'app-calendar-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent {

  calendarService = inject(CalendarService);

  protected readonly MonthNames = MonthNames;


  public increaseMonth() {
    this.calendarService.increaseMonthIndex();
  }

  public decreaseMonth() {
    this.calendarService.decreaseMonthIndex();
  }

  public onToday(){
    this.calendarService.resetToTodayMonthIndex();
  }

}
