import {Component, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DayCardItemComponent} from "../day-card-item/day-card-item.component";
import {CalendarStateService} from "../../services/calendar-state.service";
import {ICalendarDay} from "../../models/iCalendarDay";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-day-card',
  standalone: true,
  imports: [CommonModule, DayCardItemComponent, CardModule],
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss']
})
export class DayCardComponent {

  calendarService = inject(CalendarStateService);

  dayNumber: number = 0;

  constructor() {

  }

  @Input() day!: ICalendarDay;
  today = new Date();
  ngOnInit(): void {
    console.log(this.day.date.getDate());
  }
}
