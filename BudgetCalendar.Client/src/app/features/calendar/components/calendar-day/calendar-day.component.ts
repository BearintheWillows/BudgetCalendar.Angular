import {Component, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DayCardItemComponent} from "../day-card-item/day-card-item.component";
import {ICalendarDay} from "../../models/iCalendarDay";
import {CardModule} from "primeng/card";
import {AddAccountComponent} from "../../../account/components/add-account/add-account.component";
import {AddBudgetDialogComponent} from "../add-budget-dialog/add-budget-dialog.component";
import {DialogService, DynamicDialogModule, DynamicDialogRef} from "primeng/dynamicdialog";
import {find} from "rxjs";

@Component({
  selector: 'app-calendar-day',
  standalone: true,
  imports: [CommonModule, DynamicDialogModule, DayCardItemComponent, CardModule, AddAccountComponent, AddBudgetDialogComponent],
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
  providers: [DialogService]

})
export class CalendarDayComponent {

  dialogService = inject(DialogService);
  transactionTypeTotals = {incomeTotal: 0, expensesTotal: 0};
  ref: DynamicDialogRef | undefined;
  @Input() day!: ICalendarDay;

  ngOnInit() {
    this.getIncomeAndExpensesTotals();
  }
  showAddBudgetDialog() {
    this.ref = this.dialogService.open(AddBudgetDialogComponent, {
      header: `Add budget for ${this.day.date.toDateString()}`,
      width: '50%',
      height: '65%',
      data: this.day,
      styleClass: 'add-budget-dialog',
      resizable: true,
    });

    this.ref.onClose.subscribe((budget) => {
      console.log(budget);
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  getIncomeAndExpensesTotals = () => {
    let incomeTotal = 0;
    let expensesTotal = 0
    this.day.budgets?.forEach(budget => {
      if (budget.transactionType === "Income") {
        incomeTotal++;
      } else {
        expensesTotal++;
      }
  });
    return {incomeTotal, expensesTotal};
}
}
