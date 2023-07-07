import {Component, computed, inject, effect, Signal, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthNames } from 'src/app/Data/types/calendar/month-names.constants';
import {CalendarService} from "../../../../Data/services/calendar.service";
import {DayNames} from "../../../../Data/types/calendar/day-names.constants";
import {CalendarModule} from "primeng/calendar";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-calendar-header',
  standalone: true,
  imports: [CommonModule, CalendarModule, PaginatorModule, ReactiveFormsModule],
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent {

  protected readonly DayNames = DayNames;

  calendarService = inject(CalendarService);

  date: Date = new Date();
  constructor() {
  }
  ngOnInit(): void {
  }

  public increaseMonth() {
    this.calendarService.increaseMonthIndex();
    this.date = new Date(this.calendarService.currentMonth().getFullYear(), this.calendarService.currentMonth().getMonth() + this.calendarService.monthIndexService.getMonthIndex(), 1)
  }

  public decreaseMonth() {
    this.calendarService.decreaseMonthIndex();
    this.date = new Date(this.calendarService.currentMonth().getFullYear(), this.calendarService.currentMonth().getMonth() + this.calendarService.monthIndexService.getMonthIndex(), 1)

  }

  public onDateSelect(event: Date) {
    this.calendarService.setMonthIndex(event.getMonth() - this.calendarService.currentMonth().getMonth());
  }

  public onToday(){
    this.calendarService.resetToTodayMonthIndex();
    this.date = new Date(this.calendarService.currentMonth().getFullYear(), this.calendarService.currentMonth().getMonth() + this.calendarService.monthIndexService.getMonthIndex(), 1)


  }


}
