import {Component, inject, ViewEncapsulation} from '@angular/core';
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

  sidebarVisible = false;
  calendarService = inject(CalendarService);
  authService = inject(AuthService);
  messageService = inject(MessageService);


  items: any[] = []

  date: Date = new Date();
  constructor() {
  }
  ngOnInit() {
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Logout',
            icon: 'pi pi-refresh',
            command: () => {
              this.authService.logout();
              this.messageService.add({severity:'success', summary: 'Success', detail: 'Logged out successfully'});
            }
          }
        ]
      }]
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
