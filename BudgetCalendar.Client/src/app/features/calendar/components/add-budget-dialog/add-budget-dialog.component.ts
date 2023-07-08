import {Component, computed, effect, inject, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SharedModule} from "primeng/api";
import {ICalendarDay} from "../../models/iCalendarDay";
import {ICategory} from "../../models/iCategory";
import {CalendarModule} from "primeng/calendar";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {SelectButtonModule} from "primeng/selectbutton";
import {InputSwitchModule} from "primeng/inputswitch";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ColorPickerModule} from "primeng/colorpicker";
import {IBudget} from "../../models/iBudget";
import {IBudgetToCreate} from "../../models/iBudgetToCreate";

@Component({
  selector: 'app-add-budget-dialog',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule, InputNumberModule, InputTextModule, PaginatorModule, ReactiveFormsModule, SharedModule, CalendarModule, SelectButtonModule, InputSwitchModule, RadioButtonModule, InputTextareaModule, ColorPickerModule],
  templateUrl: './add-budget-dialog.component.html',
  styleUrls: ['./add-budget-dialog.component.scss']
})

export class AddBudgetDialogComponent implements OnInit{

  categories!: ICategory[] | undefined;

  dialog: DynamicDialogConfig<ICalendarDay> = inject(DynamicDialogConfig);
  transactionTypeOptions = [
    {label: 'Income', value: 'Income'},
    {label: 'Expense', value: 'Expense'}];

  recurringFrequencyOptions = [
    {label: 'Daily', value: 'Daily'},
    {label: 'Weekly', value: 'Weekly'},
    {label: 'biWeekly', value: 'biWeekly'},
    {label: 'Monthly', value: 'Monthly'},
    {label: 'Quarterly', value: 'Quarterly'},
    {label: 'Yearly', value: 'Yearly'}
  ]

  accountOptions = [
    {label: 'Cash', value: 'Cash'},
    {label: 'Credit Card', value: 'Credit Card'},
    {label: 'Checking', value: 'Checking'},
    {label: 'Savings', value: 'Savings'},
    {label: 'Investment', value: 'Investment'},
    {label: 'Other', value: 'Other'}
  ]

  fb = inject(FormBuilder);

  createBudgetForm!: FormGroup;
  ngOnInit() {
    this.createBudgetForm = this.fb.group({
      categoryName: ['', Validators.required],
      amount: ['', Validators.required],
      date: [{value: this.dialog?.data?.date.toLocaleDateString(), disabled: true},
            [Validators.required],],
      transactionType: ['Income', Validators.required],
      isRecurring: [false, Validators.required],
      recurringBudgetForm: this.fb.group({
        frequency: ['Weekly', Validators.required],
        endDate: ['', Validators.required],
      }),
      account: ['', Validators.required],
      note: ['',],
      color: ['#ffffff',]
    }
  );

    this.categories = [
      {id: 1, name: 'Food'},
      {id: 2, name: 'Transportation'},
      {id: 3, name: 'Entertainment'},
      {id: 4, name: 'Utilities'},
      {id: 5, name: 'Rent'},
    ];


    this.createBudgetForm.get('isRecurring')?.valueChanges.subscribe((value) => {
      if (value) {
        this.createBudgetForm.get('recurringBudgetForm')?.enable();
      } else {
        this.createBudgetForm.get('recurringBudgetForm')?.disable();
      }
    })


  }

  onSubmit() {

    const formValues = this.createBudgetForm.value;

    let newBudget: IBudgetToCreate = {
      categoryId: formValues.categoryName.id,
      amount: formValues.amount,
      date: new Date(formValues.date),
      transactionType: formValues.transactionType,
      recurringBudgetSequence: {
        id: 0,
        interval: formValues.recurringBudgetForm.frequency,
        startDate: new Date(formValues.date),
        endDate: new Date(formValues.recurringBudgetForm.endDate),
      },
      accountId: formValues.account,
      note: formValues.note ?? '',
      color: formValues.color,
      isArchived: false,

      }
  }







}
