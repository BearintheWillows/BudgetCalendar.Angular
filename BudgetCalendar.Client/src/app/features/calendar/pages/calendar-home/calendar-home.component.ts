import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarGridComponent} from "../../components/calendar-table/calendar-grid.component";
import {CalendarService} from "../../../../Data/services/calendar.service";
import {CalendarHeaderComponent} from "../../components/calendar-header/calendar-header.component";
import {BudgetService} from "../../../../Data/services/budget.service";

@Component({
  standalone: true,
  imports: [CommonModule, CalendarGridComponent, CalendarHeaderComponent],
  templateUrl: './calendar-home.component.html',
  styleUrls: ['./calendar-home.component.scss']
})
export class CalendarHomeComponent {

  calendarService = inject(CalendarService);
  budgetService = inject(BudgetService);
  ngOnInit(): void {
      this.calendarService.resetToTodayMonthIndex();
      this.budgetService.getBudgetsByRange(new Date(2023, 6, 1), new Date(2023, 6, 31));

  }
}
