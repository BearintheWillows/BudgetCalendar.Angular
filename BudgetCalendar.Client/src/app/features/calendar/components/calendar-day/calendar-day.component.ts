import {Component, computed, inject, Input, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DayCardItemComponent} from "../day-card-item/day-card-item.component";
import {ICalendarDay} from "../../models/iCalendarDay";
import {CardModule} from "primeng/card";
import {AddAccountComponent} from "../../../account/components/add-account/add-account.component";
import {DialogService, DynamicDialogModule, DynamicDialogRef} from "primeng/dynamicdialog";
import {DeviceService, DeviceType} from "../../../../Data/services/device.service";
import {BudgetDialogComponent} from "../budgets/budget-dialog/budget-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-calendar-day',
  standalone: true,
  imports: [CommonModule, DynamicDialogModule, DayCardItemComponent, CardModule, AddAccountComponent],
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
  providers: [DialogService],
  encapsulation: ViewEncapsulation.None,

})
export class CalendarDayComponent {

  dialogService = inject(DialogService);
  transactionTypeTotals = {incomeTotal: 0, expensesTotal: 0};
  ref: DynamicDialogRef | undefined;

  @Input() device: DeviceType = DeviceType.mobile;

  router = inject(Router);
  @Input() day!: ICalendarDay;


  ngOnInit() {
    this.getIncomeAndExpensesTotals();
  }
  showAddBudgetDialog() {
    this.ref = this.dialogService.open(BudgetDialogComponent, {
      header: `Add budget for ${this.day.date.toLocaleDateString()}`,
      width: '90%',
      height: '90%',
      data: this.day,
      maximizable: true,
      styleClass: 'budget-dialog'
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
    this.transactionTypeTotals = {incomeTotal, expensesTotal};
  }

  onClick = () => {

    this.router.navigate([`calendar/day/${this.day.date.toISOString().slice(0, 10)}/detail`], {state: {day: this.day}});
  }

  protected readonly DeviceType = DeviceType;
}
