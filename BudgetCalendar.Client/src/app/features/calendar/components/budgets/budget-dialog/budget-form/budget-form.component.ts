import {Component, computed, EventEmitter, inject, Input, Output, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FieldsetModule} from "primeng/fieldset";
import {AutoCompleteCompleteEvent, AutoCompleteModule} from "primeng/autocomplete";
import {DropdownModule} from "primeng/dropdown";
import {ColorPickerModule} from "primeng/colorpicker";
import {InputSwitchModule} from "primeng/inputswitch";
import {SelectButtonModule} from "primeng/selectbutton";
import {InputNumberModule} from "primeng/inputnumber";
import {CalendarModule} from "primeng/calendar";
import {InputTextareaModule} from "primeng/inputtextarea";
import {AccountService} from "../../../../../../Data/services/calendar/account.service";
import {CategoryService} from "../../../../../../Data/services/category.service";
import {BudgetService} from "../../../../../../Data/services/budget.service";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {ICalendarDay} from "../../../../models/iCalendarDay";
import {ICategory} from "../../../../models/iCategory";
import {IBudgetToCreate} from "../../../../models/iBudgetToCreate";
import {IRecurringBudgetSequence} from "../../../../models/iRecurringBudgetSequence";
import {ChipsModule} from "primeng/chips";

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [CommonModule, ButtonModule, ReactiveFormsModule, FieldsetModule, AutoCompleteModule, DropdownModule, ColorPickerModule, InputSwitchModule, SelectButtonModule, InputNumberModule, CalendarModule, InputTextareaModule, ChipsModule],
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BudgetFormComponent {
  categoryService = inject(CategoryService);
  accountService = inject(AccountService);
  budgetService = inject(BudgetService);

  @Input() day!: ICalendarDay;
  categories = computed(() => this.categoryService.categories());
  filteredCategories: ICategory[] = [];

  accounts = computed(() => this.accountService.accounts());

  selectedCategory!: ICategory;
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



  fb = inject(FormBuilder);

  createBudgetForm!: FormGroup;
  ngOnInit() {
    this.createBudgetForm = this.fb.group({
          categoryName: ['', Validators.required],
          amount: ['', Validators.required],
          date: [{value: this.day?.date.toLocaleDateString(), disabled: true},
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
    console.log(this.createBudgetForm.get('date')?.valueChanges)



    this.createBudgetForm.get('isRecurring')?.valueChanges.subscribe((value) => {
      if (value) {
        this.createBudgetForm.get('recurringBudgetForm')?.enable();
      } else {
        this.createBudgetForm.get('recurringBudgetForm')?.disable();
      }
    })

    this.categoryService.getCategories();
    this.accountService.getAccounts();




    this.filteredCategories = this.categories();
    console.log(this.filteredCategories)
  }

  onSubmit() {

    const formValues = this.createBudgetForm.value;
    let newCategory = this.categories().find(c => c.name == formValues.categoryName) ?? {id: -1, name: formValues.categoryName.name};

    let newBudget: IBudgetToCreate = {
      categoryId: formValues.categoryName.id == -1 ? -1 : formValues.categoryName.id,
      amount: formValues.amount,
      date: this.day.date.toISOString(),
      transactionType: formValues.transactionType,
      recurringBudgetSequence: formValues.isRecurring ?   {
        id: 0,
        interval: formValues.recurringBudgetForm.frequency,
        startDate: new Date(formValues.date),
        endDate: new Date(formValues.recurringBudgetForm.endDate),
      } as IRecurringBudgetSequence : null,
      accountId: formValues.account.id,
      note: formValues.note,
      color: formValues.color,
      isArchived: false,
    }

    this.budgetService.postBudget(newBudget);


  }

  searchCategory(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.categories() as any[]).length; i++) {
      let country = (this.categories() as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCategories = filtered;
  }

  onToggleRecurring(event: any) {
    console.log(event)
  }


}
