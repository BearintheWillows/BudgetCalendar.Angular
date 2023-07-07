import {Component, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SharedModule} from "primeng/api";
import {IAccount} from "../../../account/_interfaces/iAccount";
import {ICalendarDay} from "../../models/iCalendarDay";
import {DynamicDialogConfig} from "primeng/dynamicdialog";

@Component({
  selector: 'app-add-budget-dialog',
  standalone: true,
    imports: [CommonModule, ButtonModule, DialogModule, InputNumberModule, InputTextModule, PaginatorModule, ReactiveFormsModule, SharedModule],
  templateUrl: './add-budget-dialog.component.html',
  styleUrls: ['./add-budget-dialog.component.scss']
})
export class AddBudgetDialogComponent {

  dialog: DynamicDialogConfig<ICalendarDay> = inject(DynamicDialogConfig);

  fb = inject(FormBuilder);

  visible: boolean = true;
  loading: boolean = false;

  @Input() calendarDay!: ICalendarDay;

  form: FormGroup = this.fb.group({
    name: ['',
      {
        validators: [Validators.required],
      }],
    balance: ['',
      {
        validators: [Validators.required],
      }],
  });


  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 2000);
  }

  onSubmit() {
    console.log('submit')
  }
}
