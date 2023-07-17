import {Component, computed, effect, inject, signal, Signal, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalendarService} from "../../../../Data/services/calendar.service";
import {DayNames} from "../../../../Data/types/calendar/day-names.constants";
import {CalendarModule} from "primeng/calendar";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../../../Data/services/auth.service";
import {MessageService} from "primeng/api";
import {MenuModule} from "primeng/menu";
import {SidebarModule} from "primeng/sidebar";
import {DeviceService, DeviceType} from "../../../../Data/services/device.service";

@Component({
  selector: 'app-calendar-header',
  standalone: true,
  imports: [CommonModule, CalendarModule, PaginatorModule, ReactiveFormsModule, MenuModule, SidebarModule],
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class CalendarHeaderComponent {

  protected readonly DayNames = DayNames;
  calendarService = inject(CalendarService);
  deviceService = inject(DeviceService)

  device = computed(() => this.deviceService.deviceType());
  date: Date = new Date();


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


  protected readonly DeviceType = DeviceType;
}
