import {Component, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DayCardItemComponent} from "../day-card-item/day-card-item.component";
import {ICalendarDay} from "../../models/iCalendarDay";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-calendar-day',
  standalone: true,
  imports: [CommonModule, DayCardItemComponent, CardModule],
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent {

  @Input() day!: ICalendarDay;
}
