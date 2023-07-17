import {Component, computed, inject, Input, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {BudgetService} from "../../../../Data/services/budget.service";
import {AutoCompleteCompleteEvent, AutoCompleteModule} from "primeng/autocomplete";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {FieldsetModule} from "primeng/fieldset";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {SelectButtonModule} from "primeng/selectbutton";
import {CategoryService} from "../../../../Data/services/category.service";
import {AccountService} from "../../../../Data/services/calendar/account.service";
import {ICalendarDay} from "../../models/iCalendarDay";
import {ICategory} from "../../models/iCategory";
import {IBudgetToCreate} from "../../models/iBudgetToCreate";
import {IRecurringBudgetSequence} from "../../models/iRecurringBudgetSequence";

@Component({
  selector: 'app-calendar-budgets-mobile',
  standalone: true,
  imports: [CommonModule, AutoCompleteModule, ButtonModule, CalendarModule, DropdownModule, FieldsetModule, FormsModule, InputNumberModule, InputSwitchModule, InputTextModule, InputTextareaModule, ReactiveFormsModule, SelectButtonModule],
  templateUrl: './calendar-day-detail-mobile.component.html',
  styleUrls: ['./calendar-day-detail-mobile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarDayDetailMobileComponent {

  router = inject(Router);
  route = inject(ActivatedRoute);
  categoryService = inject(CategoryService);
  accountService = inject(AccountService);
  budgetService = inject(BudgetService);

  date: Date = new Date();
  budgets = computed(() => this.budgetService.budgets());


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
    this.budgetService.getBudgetsByRange(new Date(2023, 6, 1), new Date(2023, 6, 31));

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





}
