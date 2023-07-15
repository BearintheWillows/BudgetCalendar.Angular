import {Component, EventEmitter, inject, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BudgetFormComponent} from "./budget-form/budget-form.component";
import {DialogService, DynamicDialogConfig} from "primeng/dynamicdialog";
import {ICalendarDay} from "../../../models/iCalendarDay";

@Component({
  selector: 'app-budget-dialog',
  standalone: true,
  imports: [CommonModule, BudgetFormComponent],
  templateUrl: './budget-dialog.component.html',
  styleUrls: ['./budget-dialog.component.scss']
})
export class BudgetDialogComponent {


  dialog: DynamicDialogConfig<ICalendarDay> = inject(DynamicDialogConfig);


  calDay: ICalendarDay = this.dialog!.data!;



}
