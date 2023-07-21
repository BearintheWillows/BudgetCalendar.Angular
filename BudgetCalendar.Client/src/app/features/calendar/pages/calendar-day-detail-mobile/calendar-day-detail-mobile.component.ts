import {Component, computed, inject, Input, signal, Signal, ViewEncapsulation} from '@angular/core';
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
import {IBudget} from "../../models/iBudget";
import {PanelModule} from "primeng/panel";

@Component({
  selector: 'app-calendar-budgets-mobile',
  standalone: true,
  imports: [CommonModule, AutoCompleteModule, ButtonModule, CalendarModule, DropdownModule, FieldsetModule, FormsModule, InputNumberModule, InputSwitchModule, InputTextModule, InputTextareaModule, ReactiveFormsModule, SelectButtonModule, PanelModule],
  templateUrl: './calendar-day-detail-mobile.component.html',
  styleUrls: ['./calendar-day-detail-mobile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarDayDetailMobileComponent {

  acivatedRoute = inject(ActivatedRoute);
  budgetService = inject(BudgetService)
  router = inject(Router);
  date: Date = new Date();
  budgets = signal<IBudget[]>([])



  ngOnInit(): void {
    this.acivatedRoute.paramMap.subscribe(params => {
      let date = params.get('date');
      if (date) {
        this.date = new Date(date);
      }

      this.budgets.set(this.budgetService.budgets().filter(b => b.date.getFullYear() === this.date.getFullYear() && b.date.getMonth() === this.date.getMonth() && b.date.getDate() === this.date.getDate()));

      console.log(this.budgets());

    });
  }





}
