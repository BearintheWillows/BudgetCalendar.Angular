import {Component, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DayCardItemComponent} from "../day-card-item/day-card-item.component";
import {CalendarStateService} from "../../services/calendar-state.service";

@Component({
  selector: 'app-day-card',
  standalone: true,
  imports: [CommonModule, DayCardItemComponent],
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss']
})
export class DayCardComponent {

  calendarService = inject(CalendarStateService);

  constructor() {

  }

  @Input() date!: Date;
  today = new Date();
  ngOnInit(): void {

  }
}
